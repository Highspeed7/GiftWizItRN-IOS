import * as actionTypes from './actionTypes';
import {authorize, revoke, refresh} from 'react-native-app-auth';
import * as authCfg from './authConfig';
import AsyncStorage from '@react-native-community/async-storage';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authStoreToken = (authData, storeRefresh = true) => {
    return async(dispatch) => {
        await AsyncStorage.setItem("gw:auth:token", authData.accessToken);
        
        if(storeRefresh) {
            await AsyncStorage.setItem("gw:auth:token_expires_on", authData.tokenAdditionalParameters.expires_on);
            await AsyncStorage.setItem("gw:auth:refresh_token", authData.refreshToken);
        }else {
            await AsyncStorage.setItem("gw:auth:token_expires_on", authData.additionalParameters.expires_on);
        }

        dispatch(authSuccess(authData));
    }
}

export const authClearStorage = () => {
    return async dispatch => {
        await AsyncStorage.removeItem("gw:auth:token");
        await AsyncStorage.removeItem("gw:auth:token_expires_on");
        await AsyncStorage.removeItem("gw:auth:refresh_token");
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

export const authRefresh = () => {
    return async (dispatch) => {
        return promise = new Promise(async(resolve, reject) => {
            const refreshToken = await AsyncStorage.getItem("gw:auth:refresh_token");
            let authData = null;
            try {
                console.log("In AuthRefresh");
                authData = await refresh(authCfg.config, {
                    refreshToken: refreshToken
                });
            }catch(error) {
                console.log(error);
            }
            if(authData) {
                console.log("Dispatching to authStore");
                await dispatch(authStoreToken(authData, false));
                resolve(authData);
            }else {
                reject();
            }
        })
        // TODO: Should probably check expiry of refresh token as well...
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
            await dispatch(authClearStorage());
            dispatch(authRevoke());
        }catch(error) {
            // Do nothing yet...
        }
    }
}

const checkTokenExpiry = (token, storageType = "FromGlobal") => {
    return (dispatch, getState) => {
        const promise = new Promise(async(resolve, reject) => {
            // Get the expiry time
            let expires_on = null;
            let didRefresh = null;
            if(storageType == "FromLocal"){
                expires_on = getState().authReducer.accessTokenExpiration;
            }else {
                expires_on = await AsyncStorage.getItem("gw:auth:token_expires_on");
            }
                
            console.log("In expiry check function with expiry time: " + expires_on);

            // Get the current time
            let now = ((Date.now()/1000));
            console.log("Change expires_on value");
            if(expires_on && (parseInt(expires_on) - 150) <= now) {
                // dispatch(authClearStorage());
                // dispatch(authRevoke());
                // reject({message: "Token expired"});
                // return;
                try {
                    // If the token is expired, try to refresh it.
                    let authdata = await dispatch(authRefresh());
                    didRefresh = true;
                    token = authdata.accessToken;
                }catch(error) {
                    // If refreshing fails, try to re-authenticate.
                    await dispatch(auth());
                    console.log("Error while refreshing token");
                    reject();
                    return;
                }
            }
            // Expiration is ok, return with token.
            resolve({accessToken: token, expires_on, didRefresh});
        })
        console.log("returning from token expiry function");
        return promise;
    }
}

export const getAuthToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise(async(resolve, reject) => {
            let token = getState().authReducer.accessToken;
            if(!token) {
                // Get token from async storage.
                token = await AsyncStorage.getItem("gw:auth:token");
                // Check expiration
                let authObj = await dispatch(checkTokenExpiry(token));
                // If no token is found, reject and return.
                if(!token) {
                    reject({message: "No token in store"});
                    return;
                }

                // Don't run authsuccess if we refreshed, because it was already ran.
                if(authObj.didRefresh == null) {
                    await dispatch(authSuccess(authObj));
                }
                
                resolve(authObj.accessToken);
                return;
            }
            let authObj = await dispatch(checkTokenExpiry(token, "FromLocal"));
            resolve(authObj.accessToken);
        })
        return promise;
    }
}

export const auth = () => {
    return async(dispatch) => {
        dispatch(authStart())
        try {
            console.log("in auth function");
            const authState = await authorize(authCfg.config);
            // Store token info in asyncStorage
            dispatch(authStoreToken(authState));
        }catch(error) {
            dispatch(authFail(error));
        }
    }
}