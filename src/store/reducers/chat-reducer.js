import * as actionTypes from '../actions/actionTypes';

initialState = {
    currentChatConnection: null,
    connectionId: null
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CHAT_CONNECTION_ID:
            return {
                ...state,
                connectionId: action.data
            }
        case actionTypes.SET_CHAT_CONNECTION:
            return {
                ...state,
                currentChatConnection: action.data
            }
    }
    return state;
}

export default chatReducer;