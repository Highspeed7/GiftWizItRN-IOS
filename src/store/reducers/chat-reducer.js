initialState = {
    connectionId: null
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHAT_CONNECTION_ID":
            return {
                ...state,
                connectionId: action.data
            }
    }
    return state;
}

export default chatReducer;