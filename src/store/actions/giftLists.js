import * as actionTypes from './actionTypes';

export const setGiftLists = (giftLists) => {
    return {
        type: actionTypes.SET_GIFTLISTS,
        giftLists: giftLists
    }
}

export const setGiftListActive = (key) => {
    return {
        type: actionTypes.SET_GLIST_ACTIVE,
        key: key
    }
}

export const setGiftListInactive = (key) => {
    return {
        type: actionTypes.SET_GLIST_INACTIVE,
        key: key
    }
}

export const setGiftListItems = (key) => {
    return {
        type: actionTypes.SET_GLIST_ITEMS,
        key: key
    }
}

export const addNewGiftlist = (glist_Name) => {
    return {
        type: actionTypes.ADD_NEW_GIFT_LIST,
        data: {
            name: glist_Name
        }
    }
}

export const moveGiftListItems = (itemData) => {
    return {
        type: actionTypes.MOVE_GLIST_ITEMS,
        data: itemData
    }
}

export const editGiftList = (listData) => {
    return {
        type: actionTypes.EDIT_GIFT_LIST,
        data: listData
    }
}

export const shareGiftList = (shareData) => {
    return {
        type: actionTypes.SHARE_GIFT_LIST,
        data: shareData
    }
}

export const deleteGiftLists = (listData) => {
    return {
        type: actionTypes.DELETE_GIFT_LISTS,
        data: listData
    }
}
