import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actions from './index';
import AsyncStorage from '@react-native-community/async-storage';

export const setGiftLists = (giftLists) => {
    return {
        type: actionTypes.SET_GIFTLISTS,
        giftLists: giftLists
    }
}

export const setGiftListActive = (key) => {
    return {
        type: actionTypes.SET_GLIST_ACTIVE,
        key: key
    }
}

export const setGiftListInactive = (key) => {
    return {
        type: actionTypes.SET_GLIST_INACTIVE,
        key: key
    }
}
