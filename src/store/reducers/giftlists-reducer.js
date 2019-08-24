import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    giftLists: []
}

const giftListsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            let glists = {
                ...state,
                giftLists: action.giftLists
            }
            return glists;
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
        case actionTypes.EDIT_GIFT_LIST:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: action.data, key: action.data.id}, "id")
            }
        default: return state;
    }
}

export default giftListsReducer;