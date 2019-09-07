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