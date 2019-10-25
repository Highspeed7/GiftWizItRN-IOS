import * as actionTypes from './actionTypes';

export const setGiftLists = (giftLists) => {
    return {
        type: actionTypes.SET_GIFTLISTS,
        giftLists: giftLists
    };
};

export const setGiftListActive = (key) => {
    return {
        type: actionTypes.SET_GLIST_ACTIVE,
        key: key
    };
};

export const setGiftListInactive = (key) => {
    return {
        type: actionTypes.SET_GLIST_INACTIVE,
        key: key
    };
};

export const setGiftListItems = (key) => {
    return {
        type: actionTypes.SET_GLIST_ITEMS,
        key: key
    };
};

export const addNewGiftlist = (newGiftList) => {
    return {
        type: actionTypes.ADD_NEW_GIFT_LIST,
        data: newGiftList
    };
};

export const moveGiftListItems = (itemData) => {
    return {
        type: actionTypes.MOVE_GLIST_ITEMS,
        data: itemData
    };
};

export const editGiftList = (listData) => {
    return {
        type: actionTypes.EDIT_GIFT_LIST,
        data: listData
    };
};

export const shareGiftList = (shareData) => {
    return {
        type: actionTypes.SHARE_GIFT_LIST,
        data: shareData
    };
};

export const deleteGiftLists = (listData) => {
    return {
        type: actionTypes.DELETE_GIFT_LISTS,
        data: listData
    };
};

export const connectToListChat = (list_id) => {
    return {
        type: actionTypes.CONNECT_TO_LIST_CHAT,
        data: list_id
    };
};

export const disconnectFromListChat = (list_id) => {
    return {
        type: actionTypes.DISCONNECT_FROM_LIST_CHAT,
        data: list_id
    };
};

export const sendMessageToList = (messageData) => {
    return {
        type: actionTypes.SEND_MESSAGE_TO_LIST,
        data: messageData
    };
};

export const appendChatMessage = (messageData) => {
    return {
        type: actionTypes.APPEND_CHAT_MESSAGE,
        data: messageData
    };
};

export const clearChatMessages = () => {
    return {
        type: actionTypes.CLEAR_MESSAGES
    };
};

export const deleteGiftItems = (itemsData) => {
    return {
        type: actionTypes.DELETE_GIFT_ITEMS,
        data: itemsData
    };
};
