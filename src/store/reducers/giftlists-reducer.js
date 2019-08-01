import * as actionTypes from '../actions/actionTypes';
import { arrayExpression } from '@babel/types';

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
            break;
        case actionTypes.SET_GLIST_ACTIVE:
            return {
                ...state,
                giftLists: updateObjectInArray(state.giftLists, {item: {active: true}, key: action.key})
            }
        case actionTypes.SET_GLIST_INACTIVE:
            return {
                ...state,
                giftLists: updateObjectInArray(state.giftLists, {item: {active: null}, key: action.key})
            }
        default: return state;
    }
    return state;
}

updateObjectInArray = (lists, action) => {
    var result = lists.map((item) => {
        if(item.id != action.key) {
            return item;
        }
        return {
            ...item,
            ...action.item
        }
    })
    return result;
}

export default giftListsReducer;