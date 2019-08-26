import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    searchedPublicLists: [],
    searchedPrivateLists: []
}

const searchListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_PUBLIC_LISTS:
            return {
                ...state,
                searchedPublicLists: action.data.results
            }
        case actionTypes.SEARCH_PRIVATE_LISTS:
            break;
        case actionTypes.CLEAR_SEARCH_STATE:
            return {
                searchedPublicLists: [],
                searchedPrivateLists: []
            }
        case actionTypes.SET_LIST_ACTIVE:
            return {
                ...state,
                searchedPublicLists: utils.updateObjectInArray(state.searchedPublicLists, {item: {active: true}, key: action.key}, "id")
            }
        case actionTypes.SET_LIST_INACTIVE:
            return {
                ...state,
                searchedPublicLists: utils.updateObjectInArray(state.searchedPublicLists, {item: {active: null}, key: action.key}, "id")
            }
        case actionTypes.SET_PUBLIC_LIST_ITEMS:
            return {
                ...state,
                searchedPublicLists: utils.updateObjectInArray(state.searchedPublicLists, {item: {itemsData: action.payload.giftItems}, key: action.key}, "id")
            }
        default:
            return state;
    }
}

export default searchListsReducer;

