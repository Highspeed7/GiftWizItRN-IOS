import { UI_START_LOADING, UI_STOP_LOADING, POP_NOTIF_TOAST } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const popToastNotification = (messageData) => {
    return {
        type: POP_NOTIF_TOAST,
        payload: messageData
    };
};