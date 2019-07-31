import * as actionTypes from './actionTypes';
import {authorize, revoke} from 'react-native-app-auth';
import * as authCfg from './authConfig';
import AsyncStorage from '@react-native-community/async-storage';

// export const set_auth = (value) => {
//     return {
//         type: actionTypes.SET_AUTH,
//         value: value
//     }
// }

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authStoreToken = (authData) => {
    return async(dispatch) => {
        await AsyncStorage.setItem("gw:auth:token", authData.accessToken);
        await AsyncStorage.setItem("gw:auth:token_expires_in", authData.tokenAdditionalParameters.expires_on);
        await AsyncStorage.setItem("gw:auth:refresh_token", authData.refreshToken);
        dispatch(authSuccess(authData));
    }
}

export const authClearStorage = () => {
    return async dispatch => {
        await AsyncStorage.removeItem("gw:auth:token");
        await AsyncStorage.removeItem("gw:auth:expiryDate");
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authdata: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authRevoke = () => {
    return {
        type: actionTypes.AUTH_REVOKE
    }
}

export const logOut = (tokenToRevoke) => {
    return async(dispatch) => {
        try {
            await revoke(authCfg.config, {
                tokenToRevoke
            });
            dispatch(authRevoke());
        }catch(error) {
            // Do nothing yet...
        }
    }
}

export const getAuthToken = async() => {
    return await AsyncStorage.getItem("gw:auth:token");
}

export const auth = () => {
    return async(dispatch) => {
        dispatch(authStart())
        try {
            const authState = await authorize(authCfg.config);
            // Store token info in asyncStorage
            dispatch(authSuccess(authState));
        }catch(error) {
            dispatch(authFail(error));
        }
    }
}