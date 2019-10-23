import * as signalR from '@aspnet/signalr';

const initialState = {
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