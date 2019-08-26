import * as actionTypes from './actionTypes';

export const searchPublicLists = (search) => {
    return {
        type: actionTypes.SEARCH_PUBLIC_LISTS,
        data: search
    }
}

export const searchPrivateLists = (search) => {
    return {
        type: actionTypes.SEARCH_PRIVATE_LISTS,
        data: search
    }
}

export const clearSearchState = () => {
    return {
        type: actionTypes.CLEAR_SEARCH_STATE
    }
}

export const setListActive = (key) => {
    return {
        type: actionTypes.SET_LIST_ACTIVE,
        key: key
    }
}

export const setListInactive = (key) => {
    return {
        type: actionTypes.SET_LIST_INACTIVE,
        key: key
    }
}

export const setPublicListItems = (key) => {
    return {
        type: actionTypes.SET_PUBLIC_LIST_ITEMS,
        key: key
    }
}