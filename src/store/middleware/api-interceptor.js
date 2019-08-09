import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';
import * as actions from '../actions/index';
import { authorize } from 'react-native-app-auth';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from '../actions/authConfig';

const apiInterceptor = store => next => async action => {
    let token = null;
    let authPreviousSuccess = false;
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let commonHeaders = {
                    'Authorization': `bearer ${token}`
                }

                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists', {headers: commonHeaders}).then((response) => {
                    console.log(response.data);
                    action.giftLists = response.data;     
                })
            }catch(error) {
                console.log(error);
                action.type = "LIST_FAIL";
            }
            break;
        case actionTypes.SET_GLIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }

                let body = {
                    gift_list_id: action.key
                }

                let config = {
                    headers: headerObj,
                    params: body
                }

                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftListItems', config).then((response) => {
                    action.payload = {
                        giftItems: response.data
                    }
                });
                break;
            }catch(error) {

            }
        case actionTypes.AUTH_START:
            console.log("Authentication Started");
            break;
        case actionTypes.SET_CONTACTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/Contacts/Get', {headers: headerObj}).then((response) => {
                    action.contacts = response.data;
                });
            }catch(error) {
                console.log(error);
                action.type = "SET_CONTACTS_FAILED";
            }
            break;
        case actionTypes.AUTH_SUCCESS:
            next(action)
            break;
        case actionTypes.SET_WISH_LIST:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/WishList', {headers: headerObj}).then((response) => {
                    action.wishList = response.data;
                });
            }catch(error) {
                console.log(error);
                action.type = "SET_WISH_LIST_FAILED";
            }
            break;
        case actionTypes.MOVE_WISH_LIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                
                let body = action.data;

                let config = {
                    headers: headerObj,
                };
                console.log(config);
                console.log(body);
                await axios.post('http://giftwizitapi.azurewebsites.net/api/MoveItems', body, config).then((response) => {
                    store.dispatch(actions.setWishList());
                });
            }catch(error) {
                console.log(error);
            }
        default: next(action);
    }
    next(action);
}

// const doAuth = async() => {
//     try {
//         let authData = await authorize(config)
//         await storeToken(authData);
//         return authData.accessToken
//     }catch(error) {
//         return authData;
//     }
// }

// const storeToken = async(authData) => {
//     await AsyncStorage.setItem("gw:auth:token", authData.accessToken);
//     await AsyncStorage.setItem("gw:auth:token_expires_on", authData.tokenAdditionalParameters.expires_on);
//     await AsyncStorage.setItem("gw:auth:refresh_token", authData.refreshToken);
// }

export default apiInterceptor;