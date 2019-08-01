import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';
import * as actions from '../actions/index';
import { authorize } from 'react-native-app-auth';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from '../actions/authConfig';

const apiInterceptor = store => next => async action => {
    let token = null;
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let commonHeaders = {
                    'Authorization': `bearer ${token}`
                }

                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists', {headers: commonHeaders}).then((response) => {
                    action.giftLists = response.data;     
                })
            }catch(error) {
                console.log(error);
                action.type = "LIST_FAIL";
            }
        case actionTypes.AUTH_START:
            console.log("Authentication Started");
        case actionTypes.SET_CONTACTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headers = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/Contacts/Get', {headers: headers}).then((response) => {
                    action.contacts = response.data;
                });
            }catch(error) {
                console.log(error);
                action.type = "SET_CONTACTS_FAILED";
            }
        default: next(action);
    }
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