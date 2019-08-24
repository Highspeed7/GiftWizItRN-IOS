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