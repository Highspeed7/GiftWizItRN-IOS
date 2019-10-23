const initialState = {
    notificationsConnectionId: null,
    notificationCount: 0,
    notifications: null,
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
            break;
        case "GET_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload
            }
        case "FETCH_NEXT_NOTIF_PAGE":
            return {
                ...state,
                notifications: {
                    ...action.payload,
                    results: state.notifications.results.concat(action.payload.results)
                }
            }
        case "SET_NOTIFICATIONS_CONNECTION_ID":
            return {
                ...state,
                notificationsConnectionId: action.data
            }
    }
    return state;
}

export default notificationsReducer;