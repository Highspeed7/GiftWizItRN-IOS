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

export const getNotifications = () => {
    return {
        type: actionTypes.GET_NOTIFICATIONS
    }
}

export const fetchNextNotificationsPage = () => {
    return {
        type: actionTypes.FETCH_NEXT_NOTIF_PAGE
    };
};