import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import { JsonHubProtocol, HttpTransportType, HubConnectionBuilder, HubConnectionState } from "@aspnet/signalr";
import axios from 'axios';
import { Alert } from 'react-native';

const startSignalRConnection = async (connection, store) => {
    let retryTimes = 3;
    let promise = new Promise((resolve, reject) => {
        connection.start().then(() => {
            // Once we have the connection we need to get the connection id
            connection.invoke("getConnectionId").then(async(id) => {
                store.dispatch(actions.setConnectionId(id));
                resolve(id);
            })
        }).catch((err) => {
            if(retryTimes > 0) {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    retryTimes--;
                    startSignalRConnection(connection);
                }, 5000);
            }else {
                console.error("SignalR Connection Error: ", + err);
                reject();
            }
        })
    })
    return promise;
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

const testChat = (message) => {
    console.log(message);
}

const signalRInterceptor = store => next => async (action) => {
    const state = store.getState();
    const connectionId = state.signalRReducer.connectionId;
    const connectionHub = "http://giftwizitapi.azurewebsites.net/notifHub";
    const protocol = new JsonHubProtocol();

    const connection = new HubConnectionBuilder()
        .withUrl(connectionHub)
        .withHubProtocol(protocol)
        .build();

    switch(action.type) {
        case actionTypes.BEGIN_NOTIFICATIONS:
            {
                // connection.on('Notification', store.dispatch({type: "POP_NOTIFICATION", message: res}));
                connection.on('Notification', (res) => {
                    store.dispatch(actions.notificationRecieved(res));
                });

                connection.onclose(async () => {
                    await startSignalRConnection(connection, store).then(async (connId) => {
                        await makeChannelConnection(store, connId);
                    });
                });
                
                startSignalRConnection(connection, store).then(async (connId) => {
                    await makeChannelConnection(store, connId);
                });
                
                break;
            }
        case actionTypes.CONNECT_TO_LIST_CHAT:
            {
                connection.on('ListMessage', (res) => {
                    testChat(res);
                });

                connection.onclose(async () => {
                    await startSignalRConnection(connection, store).then(async (connId) => {
                        await makeListChatConnection(store, connId, action.data);
                    });
                });

                startSignalRConnection(connection, store).then(async (connId) => {
                    await makeListChatConnection(store, connId, action.data);
                });

                break;
            }
        case actionTypes.DISCONNECT_FROM_LIST_CHAT:
            {
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
                    })
                    .catch((err) => {
                        console.error("Disconnecting from list chat channel failed: ", err);
                    });
                break;
            }
        case "TEST_CHAT":
            {
                let token = await store.dispatch(actions.getAuthToken());
                
                let headersObj = {
                    'Authorization': `bearer ${token}`
                };

                config = {
                    headers: headersObj
                };

                body = {
                    message: action.data.message,
                    giftListId: action.data.listId
                };

                await axios.post(`https://giftwizitapi.azurewebsites.net/api/SendMessageToList?message=${action.data.message}&giftListId=${action.data.listId}`, null, config)
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
