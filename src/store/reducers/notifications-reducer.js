const initialState = {
    notificationCount: 0,
    notificationToast: []
};

const notificationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_NOTIFICATIONS_COUNT":
            return {
                ...state,
                notificationCount: action.value
            }
        case "NOTIFICATION_RECIEVED":
            {
                switch(action.data.type) {
                    case "ListShared":
                        console.log("******NOTIFICATION*****", action.data.notificationTitle)
                }
            }
        default: return state
    }
}

export default notificationsReducer;