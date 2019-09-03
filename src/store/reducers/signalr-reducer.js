import * as signalR from '@aspnet/signalr';

const initialState = {
    connection: new signalR.HubConnectionBuilder().withUrl("https://localhost:44327/notifHub").build()
}

const signalRReducer = (state = initialState, action) => {
    return state;
}

export default signalRReducer;