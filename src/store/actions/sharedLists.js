import * as actionTypes from './actionTypes';

export const getSharedLists = () => {
    return {
        type: actionTypes.GET_SHARED_LISTS
    }
}

export const getUserSharedByLists = () => {
    return {
        type: actionTypes.GET_USER_SHARED_FROM_LISTS
    }
}

export const setUserSharedListActive = (key) => {
    return {
        type: actionTypes.SET_USER_SHARED_LIST_ACTIVE,
        key: key
    }
}

export const setUserSharedListInactive = (key) => {
    return {
        type: actionTypes.SET_USER_SHARED_LIST_INACTIVE,
        key: key
    }
}

export const setUserSharedListItems = (key) => {
    return {
        type: actionTypes.SET_USER_SHARED_LIST_ITEMS,
        key: key
    }
}

export const setUserSharedListItemActive = (key, itemId) => {
    return {
        type: actionTypes.SET_USER_SHARED_ITEM_ACTIVE,
        key: key,
        itemId: itemId
    }
}

export const setUserSharedListItemInactive = (key, itemId) => {
    return {
        type: actionTypes.SET_USER_SHARED_ITEM_INACTIVE,
        key: key,
        itemId: itemId
    }
}