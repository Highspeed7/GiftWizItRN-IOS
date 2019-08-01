import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import AsyncStorage from '@react-native-community/async-storage';

export const setGiftLists = (giftLists) => {
    return {
        type: actionTypes.SET_GIFTLISTS,
        giftLists: giftLists
    }
}
