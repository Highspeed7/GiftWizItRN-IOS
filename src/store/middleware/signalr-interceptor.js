import * as actionTypes from "../actions/actionTypes";
import { JsonHubProtocol, HttpTransportType, HubConnectionBuilder } from "@aspnet/signalr";
import { Alert } from 'react-native';

const onNotification = res => {
    Alert.alert("******NOTIFICATION*******");
    console.log('******NOTIFICATION********', res);
}

const startSignalRConnection = connection => connection.start()
    .then(() => {
        console.info('SignalR Connected')
    })
    .catch((err) => {
        console.error('SignalR Connection Error: ', err)
    });

const signalRInterceptor = store => next => async (action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS:
            {
                const connectionHub = "http://giftwizitapi.azurewebsites.net/notifHub";
                const protocol = new JsonHubProtocol();
                // const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;

                // const options = {
                //     transport
                // }

                const connection = new HubConnectionBuilder()
                    .withUrl(connectionHub)
                    .withHubProtocol(protocol)
                    .build();

                // connection.on('Notification', store.dispatch({type: "POP_NOTIFICATION", message: res}));
                connection.on('Notification', onNotification);

                connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
                
                startSignalRConnection(connection);
                break;
            }
    }
    return next(action);
};

export default signalRInterceptor;
