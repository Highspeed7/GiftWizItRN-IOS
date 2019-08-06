import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';
import update from 'immutability-helper';

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
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {active: true}, key: action.key}, "id")
            }
        case actionTypes.SET_GLIST_INACTIVE:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {active: null}, key: action.key}, "id")
            }
        case actionTypes.SET_GLIST_ITEMS:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {itemsData: action.payload.giftItems}, key: action.key}, "id")
            }
        default: return state;
    }
}



export default giftListsReducer;