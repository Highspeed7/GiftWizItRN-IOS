import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    giftLists: []
}

const giftListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            return {
                ...state,
                giftLists: action.giftLists
            }
        case actionTypes.SET_GLIST_ACTIVE:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {active: true}, key: action.key})
            }
        case actionTypes.SET_GLIST_INACTIVE:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {active: null}, key: action.key})
            }
        default: return state;
    }
    return state;
}



export default giftListsReducer;