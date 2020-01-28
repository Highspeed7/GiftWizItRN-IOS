import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import { JsonHubProtocol, HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel } from "@aspnet/signalr";
import axios from 'axios';
import { Alert } from 'react-native';

const startNotificationsConnection = async (connection, store, maxRetries = 3) => {
    let promise = new Promise((resolve, reject) => {
        connection.start().then(() => {
            // Once we have the connection we need to get the connection id
            connection.invoke("getConnectionId").then(async(id) => {
                store.dispatch(actions.setNotificationsConnectionId(id));
                resolve(id);
            })
        }).catch((err) => {
            if(maxRetries > 0) {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    startNotificationsConnection(connection, store, --maxRetries);
                }, 5000);
            }else {
                console.error("SignalR Connection Error: ", + err);
                reject();
            }
        })
    })
    return promise;
}

const startChatConnection = async (connection, store, maxRetries = 3) => {
    if(connection.state == HubConnectionState.Connected) {
        await store.dispatch(actions.disconnectFromListChat(action.data));
    }
    let promise = new Promise((resolve, reject) => {
        connection.start().then(() => {
            // Once we have the connection we need to get the connection id
            connection.invoke("getConnectionId").then(async(id) => {
                store.dispatch(actions.setChatConnectionId(id));
                resolve(id);
            })
        }).catch((err) => {
            if(maxRetries > 0) {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    startChatConnection(connection, store, --maxRetries);
                }, 5000);
            }else {
                console.error("SignalR Connection Error: ", + err);
                reject();
            }
        })
    })
    return promise;
}

const getChatHubConnection = () => {
    const connectionHub = "http://giftwizitapi.azurewebsites.net/chatHub";
    const protocol = new JsonHubProtocol();
    const connection = new HubConnectionBuilder()
        .withUrl(connectionHub)
        .withHubProtocol(protocol)
        .configureLogging(LogLevel.Trace)
        .build();
    return connection;
}


const getNotifHubConnection = () => {
    try {
        const connectionHub = "http://giftwizitapi.azurewebsites.net/notifHub";
        const protocol = new JsonHubProtocol();

        const connection = new HubConnectionBuilder()
            .withUrl(connectionHub)
            .withHubProtocol(protocol)
            .configureLogging(LogLevel.Trace)
            .build();
        return connection;
    }catch(err) {
        console.error(err);
    }
}

const makeChannelConnection = async (store, connectionId) => {
    let token = await store.dispatch(actions.getAuthToken());

    let headersObj = {
        'Authorization': `bearer ${token}`
    };

    config = {
        headers: headersObj
    };

    await axios.post(`https://giftwizitapi.azurewebsites.net/api/NotificationsChannel?connectionId=${connectionId}`, null, config)
    .then(() => {
    //    Alert.alert("Connected to Channel"); 
       console.log("Connected to Channel");
    })
    .catch((err) => {
        console.error("Connecting to notifications channel failed: ", err);
    })
}

makeListChatConnection = async (store, connectionId, listId) => {
    console.log(`Connection to chat channel with ${connectionId}`);
    let token = await store.dispatch(actions.getAuthToken());

    let headersObj = {
        'Authorization': `bearer ${token}`
    };

    config = {
        headers: headersObj
    };
    body = {
        connectionId,
        giftListId: listId
    }

    await axios.post(`https://giftwizitapi.azurewebsites.net/api/ListChatChannel`, body, config)
        .then(() => {
            console.log("Connected to list chat channel");
        })
        .catch((err) => {
            console.error("Connecting to list chat channel failed: ", err);
        });
}
const signalRInterceptor = store => next => async (action) => {
    const retryTimes = 3;
    const state = store.getState();
    switch(action.type) {
        case actionTypes.BEGIN_NOTIFICATIONS:
            {
                var connection = state.notificationsReducer.notificationsConnection;

                if(connection && connection.state == HubConnectionState.Connected) {
                    console.log("Already connected");
                    break;
                }else {
                    if(connection == null) {
                        connection = getNotifHubConnection();
                        store.dispatch(actions.setNotificationsConnection(connection));
                    }

                    connection.on('Notification', (res) => {
                        store.dispatch(actions.notificationRecieved(res));
                    });
    
                    connection.onclose(async () => {
                        await startNotificationsConnection(connection, store).then(async (connId) => {
                            await makeChannelConnection(store, connId);
                        });
                    });
                    
                    startNotificationsConnection(connection, store).then(async (connId) => {
                        await makeChannelConnection(store, connId);
                    });
                }
                break;
            }
        case actionTypes.CONNECT_TO_LIST_CHAT:
            {
                try {
                    store.dispatch(actions.uiStartLoading());
                    var connection = getChatHubConnection();
                    store.dispatch(actions.setChatConnection(connection));

                    connection.on('ListMessage', (res) => {
                        store.dispatch(actions.appendChatMessage(res));
                    });
                    connection.onclose(async () => {
                        // If the connection stored in state has been cleared, don't reconnect.
                        var stateConnection = state.chatReducer.currentChatConnection;
                        if(stateConnection == null) {
                            return;
                        }
                        // Force a disconnect from channel; silently catch the error.
                        try {
                            await dispatch(actions.disconnectFromListChat(action.data));
                        }
                        catch(err) {
                            // Do nothing
                        }
                        finally {
                            await startChatConnection(connection, store).then(async (connId) => {
                                await makeListChatConnection(store, connId, action.data);
                            });
                        }
                    });

                    startChatConnection(connection, store).then(async (connId) => {
                        await makeListChatConnection(store, connId, action.data);
                        store.dispatch(actions.uiStopLoading());
                    });
                }catch(err) {
                    console.error(err);
                    store.dispatch(actions.uiStopLoading());
                }
                break;
            }
        case actionTypes.DISCONNECT_FROM_LIST_CHAT:
            {
                store.dispatch(actions.uiStartLoading());
                var connection = state.chatReducer.currentChatConnection;
                let connectionId = state.chatReducer.connectionId
                let token = await store.dispatch(actions.getAuthToken());

                let headersObj = {
                    'Authorization': `bearer ${token}`
                };

                config = {
                    headers: headersObj
                };

                body = {
                    connectionId,
                    giftListId: action.data
                };

                await axios.post(`https://giftwizitapi.azurewebsites.net/api/LeaveListChat`, body, config)
                    .then(() => {
                        console.log("Disconnected from list channel");
                        connection.stop().then(() => {
                            console.log("Connection stopped");
                            store.dispatch(actions.setChatConnection(null));
                            store.dispatch(actions.clearChatMessages());
                            store.dispatch(actions.uiStopLoading());
                        });
                    })
                    .catch((err) => {
                        console.error("Disconnecting from list chat channel failed: ", err);
                        store.dispatch(actions.clearChatMessages());
                        store.dispatch(actions.uiStopLoading());
                    });
                break;
            }
        case actionTypes.SEND_MESSAGE_TO_LIST:
            {
                let token = await store.dispatch(actions.getAuthToken());
                
                let headersObj = {
                    'Authorization': `bearer ${token}`
                };

                config = {
                    headers: headersObj
                };

                await axios.post(`https://giftwizitapi.azurewebsites.net/api/SendMessageToList?message=${action.data.message}&giftListId=${action.data.giftListId}`, null, config)
                    .then(() => {
                        console.log("Message sent");
                    })
                    .catch((err) => {
                        console.error("Error: ", err);
                    });
                break;
            }

    }
    return next(action);
};

export default signalRInterceptor;
