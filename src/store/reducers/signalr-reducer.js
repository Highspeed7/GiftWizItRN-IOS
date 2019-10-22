import * as signalR from '@aspnet/signalr';

const initialState = {
    connection: new signalR.HubConnectionBuilder().withUrl("https://localhost:44327/notifHub").build(),
    connectionId: null
}

const signalRReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CONNECTION_ID":
            return {
                ...state,
                connectionId: action.data
            }
    }
    
    return state;
}

export default signalRReducer;