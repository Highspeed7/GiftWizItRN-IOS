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

// export const getLists = () => {
//     return async(dispatch) => {
//         let token = null;
//         token = await dispatch(actions.getAuthToken());
//         axios.defaults.headers.common['Authorization'] = '';
//         delete axios.defaults.headers.common['Authorization'];

//         if(token) {
//             axios.defaults.headers.common['Authorization'] = `${token}`;
//         }

//         try {
//             axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists').then((response) => {
//                 dispatch(setGiftLists(response));
//             })
//         }catch(error) {
//             dispatch({type: "LIST_FAIL"});
//         }
//     }
// }