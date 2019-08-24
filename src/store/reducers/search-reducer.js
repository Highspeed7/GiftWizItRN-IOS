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
            break;
        case actionTypes.SEARCH_PRIVATE_LISTS:
            break;
        default:
            return state;
    }
}

export default searchListsReducer;

