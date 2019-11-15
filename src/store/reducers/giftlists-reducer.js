import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils/utils';

const initialState = {
    giftLists: [],
    sessionChatMessages: [],
    sessionListMessageCount: null,
    messagePagingData: null
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
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {active: null}, key: action.key}, "id"),
                sessionListMessageCount: null
            }
        case actionTypes.SET_GLIST_ITEMS:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: {itemsData: action.payload.giftItems}, key: action.key}, "id")
            }
        case actionTypes.SET_GLIST_ITEM_ACTIVE:
            var lists = (state.giftLists.map((list) => {
                if(list["id"] != action.key){
                    return list
                }
                return {
                    ...list,
                    itemsData: utils.updateObjectInArray(list.itemsData, {item: {active: true}, key: action.itemId}, "item_Id")
                }
            }))
            return {
                ...state,
                giftLists: lists
            }
        case actionTypes.SET_GLIST_ITEM_INACTIVE:
            var lists = (state.giftLists.map((list) => {
                if(list["id"] != action.key){
                    return list
                }
                return {
                    ...list,
                    itemsData: utils.updateObjectInArray(list.itemsData, {item: {active: null}, key: action.itemId}, "item_Id")
                }
            }))
            return {
                ...state,
                giftLists: lists
            }
        case actionTypes.EDIT_GIFT_LIST:
            return {
                ...state,
                giftLists: utils.updateObjectInArray(state.giftLists, {item: action.data, key: action.data.id}, "id")
            }
        case actionTypes.APPEND_CHAT_MESSAGE:
            return {
                ...state,
                sessionChatMessages: utils.prependToArray(action.data, state.sessionChatMessages)
            }
        case actionTypes.SET_LIST_MESSAGES:
            return {
                ...state,
                sessionChatMessages: state.sessionChatMessages.concat(action.data.results),
                messagePagingData: action.data
            }
        case actionTypes.CLEAR_MESSAGES:
            return {
                ...state,
                sessionChatMessages: []
            }
        case actionTypes.GET_LIST_MESSAGE_COUNT:
            return {
                ...state,
                sessionListMessageCount: action.data
            }
        default: return state;
    }
}

export default giftListsReducer;