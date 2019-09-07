import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    sharedLists: [],
    sharedByLists: []
}

const sharedListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SHARED_LISTS:
            return {
                ...state,
                sharedLists: action.sharedLists
            }
        case actionTypes.GET_USER_SHARED_FROM_LISTS:
            return {
                ...state,
                sharedByLists: action.data
            }
        case actionTypes.SET_USER_SHARED_LIST_ACTIVE:
            return {
                ...state,
                sharedByLists: utils.updateObjectInArray(state.sharedByLists, {item: {active: true}, key: action.key}, "giftListId")
            }
        case actionTypes.SET_USER_SHARED_LIST_INACTIVE:
            return {
                ...state,
                sharedByLists: utils.updateObjectInArray(state.sharedByLists, {item: {active: null}, key: action.key}, "giftListId")
            }
    }
    return state;
}

export default sharedListsReducer;
