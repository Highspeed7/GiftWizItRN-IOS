import * as actionTypes from './actionTypes';

export const setNotificationsCount = () => {
    return {
        type: actionTypes.SET_NOTIFICATIONS_COUNT
    }
}

export const beginNotifications = () => {
    return {
        type: actionTypes.BEGIN_NOTIFICATIONS
    }
}

export const notificationRecieved = (notification) => {
    return {
        type: actionTypes.NOTIFICATION_RECIEVED,
        data: notification
    }
}