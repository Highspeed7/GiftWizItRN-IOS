import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    currentActiveSharedList: null,
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
            var list = state.sharedByLists.filter((list) => {
                return list.giftListId == action.key
            });
            return {
                ...state,
                sharedByLists: utils.updateObjectInArray(state.sharedByLists, {item: {active: true}, key: action.key}, "giftListId"),
                currentActiveSharedList: {
                    ...list[0]
                }
            }
        case actionTypes.SET_USER_SHARED_LIST_INACTIVE:
            return {
                ...state,
                sharedByLists: utils.updateObjectInArray(state.sharedByLists, {item: {active: null}, key: action.key}, "giftListId"),
                currentActiveSharedList: null
            }
        case actionTypes.SET_USER_SHARED_LIST_ITEMS:
            return {
                ...state,
                sharedByLists: utils.updateObjectInArray(state.sharedByLists, {item: {listItems: action.data}, key: action.key}, "giftListId"),
                currentActiveSharedList: {
                    ...state.currentActiveSharedList,
                    listItems: action.data
                }
            }
        case actionTypes.SET_USER_SHARED_ITEM_ACTIVE:
            var lists = (state.sharedByLists.map((list) => {
                if(list["giftListId"] != action.key){
                    return list
                }
                return {
                    ...list,
                    listItems: utils.updateObjectInArray(list.listItems, {item: {active: true}, key: action.itemId}, "item_Id")
                }
            }))
            var items = (state.currentActiveSharedList.listItems.map((item) => {
                if(item.item_Id != action.itemId) {
                    return item;
                }
                return {
                    ...item,
                    active: true
                }
            }));
            return {
                ...state,
                sharedByLists: lists,
                currentActiveSharedList: {
                    ...state.currentActiveSharedList,
                    listItems: items
                }
            }
        case actionTypes.SET_USER_SHARED_ITEM_INACTIVE:
            var lists = (state.sharedByLists.map((list) => {
                if(list["giftListId"] != action.key){
                    return list
                }
                return {
                    ...list,
                    listItems: utils.updateObjectInArray(list.listItems, {item: {active: null}, key: action.itemId}, "item_Id"),

                }
            }))
            var items = (state.currentActiveSharedList.listItems.map((item) => {
                if(item.item_Id != action.itemId) {
                    return item;
                }
                return {
                    ...item,
                    active: false
                }
            }));
            return {
                ...state,
                sharedByLists: lists,
                currentActiveSharedList: {
                    ...state.currentActiveSharedList,
                    listItems: items
                }
            }
    }
    return state;
}

export default sharedListsReducer;
