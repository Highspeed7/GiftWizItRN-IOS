const initialState = {
    notificationCount: 0
};

const notificationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_NOTIF_COUNT":
            return {
                ...state,
                notificationCount: action.value
            }
        default: return state
    }
}

export default notificationsReducer;