import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import { JsonHubProtocol, HttpTransportType, HubConnectionBuilder } from "@aspnet/signalr";
import axios from 'axios';
import { Alert } from 'react-native';

// const startSignalRConnection = (connection) => {
//     connection.start()
//     .then(() => {
//         console.info('SignalR Connected')
//     })
//     .catch((err) => {
//         console.error('SignalR Connection Error: ', err)
//     });
// }
// gw: {app: {timer: null}};
const startSignalRConnection = async (connection) => {
    let promise = new Promise((resolve, reject) => {
        connection.start().then(() => {
            // Once we have the connection we need to get the connection id
            connection.invoke("getConnectionId").then(async(id) => {
                connectionId = id;
                resolve(connectionId);
            })
        }).catch((err) => {
            console.error("SignalR Connection Error: ", + err);
            reject();
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

const signalRInterceptor = store => next => async (action) => {
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
                    // store.dispatch(actions.setNotificationsCount());
                    store.dispatch(actions.notificationRecieved(res));
                });

                connection.onclose(() => {
                    let timer = setTimeout(startSignalRConnection(connection).then(async (connId) => {
                        clearTimeout(timer);
                        await makeChannelConnection(store, connId);
                    }), 5000)
                });
                
                startSignalRConnection(connection).then(async (connId) => {
                    await makeChannelConnection(store, connId);
                })
                break;
            }
        case actionTypes.CONNECT_TO_LIST_CHAT:
            {

                break;
            }
    }
    return next(action);
};

export default signalRInterceptor;
