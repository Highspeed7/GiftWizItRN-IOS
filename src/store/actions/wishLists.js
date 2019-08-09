import * as actionTypes from './actionTypes';

export const setWishList = () => {
    return {
        type: actionTypes.SET_WISH_LIST
    }
}

export const setWishListActive = (key) => {
    return {
        type: actionTypes.SET_WISH_LIST_ACTIVE,
        key: key
    }
}

export const setWishListInactive = (key) => {
    return {
        type: actionTypes.SET_WISH_LIST_INACTIVE,
        key: key
    }
}

export const moveWishListItems = (itemData) => {
    return {
        type: actionTypes.MOVE_WISH_LIST_ITEMS,
        data: itemData
    }
}