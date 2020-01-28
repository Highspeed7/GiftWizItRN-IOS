import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    wishList: [],
    editableSharedLists: []
}

const wishListReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_WISH_LIST:
            return {
                ...state,
                wishList: action.wishList
            }
        case actionTypes.SET_WISH_LIST_ACTIVE:
            return {
                ...state,
                wishList: utils.updateObjectInArray(state.wishList, {item: {active: true}, key: action.key}, "item_Id")
            }
        case actionTypes.SET_WISH_LIST_INACTIVE:
            return {
                ...state,
                wishList: utils.updateObjectInArray(state.wishList, {item: {active: null}, key: action.key}, "item_Id")
            }
        case actionTypes.GET_EDITABLE_SHARED_LISTS:
            return {
                ...state,
                editableSharedLists: action.data
            }
    }
    return state;
}

export default wishListReducer;