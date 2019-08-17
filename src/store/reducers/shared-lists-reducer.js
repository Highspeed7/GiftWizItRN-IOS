import * as actionTypes from '../actions/actionTypes';

const initialState = {
    sharedLists: []
}

const sharedListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SHARED_LISTS:
            return {
                ...state,
                sharedLists: action.sharedLists
            }
    }
    return state;
}

export default sharedListsReducer;
