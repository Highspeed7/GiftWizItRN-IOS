import * as actionTypes from '../actions/actionTypes';

const initialState = {
    giftLists: null
}

const giftListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            return {
                ...state,
                giftLists: action.giftLists
            }
        default: return state;
    }
}

export default giftListsReducer;