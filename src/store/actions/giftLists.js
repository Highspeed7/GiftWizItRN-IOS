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
