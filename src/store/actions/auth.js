import * as actionTypes from './actionTypes';
import * as actions from './index';
import {authorize, revoke, refresh, } from 'react-native-app-auth';
import * as authCfg from './authConfig';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Auth from 'appcenter-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authStoreToken = (authData) => {
    return async(dispatch) => {
        await AsyncStorage.setItem("gw:auth:token", authData.accessToken);
        await AsyncStorage.setItem("gw:auth:doLogin", "true");
        // if(storeRefresh) {
        //     await AsyncStorage.setItem("gw:auth:token_expires_on", authData.tokenAdditionalParameters.expires_on);
        //     await AsyncStorage.setItem("gw:auth:refresh_token", authData.refreshToken);
        // }else {
        //     await AsyncStorage.setItem("gw:auth:token_expires_on", authData.additionalParameters.expires_on);
        // }
        console.log("Calling authsuccess");
        dispatch(authSuccess(authData));
        dispatch(actions.uiStopLoading());
    }
}

export const authClearStorage = () => {
    return async dispatch => {
        await AsyncStorage.removeItem("gw:auth:token");
        await AsyncStorage.removeItem("gw:auth:doLogin");
        // await AsyncStorage.removeItem("gw:auth:token_expires_on");
        // await AsyncStorage.removeItem("gw:auth:refresh_token");
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authdata: authData
    }
}

export const storeUserDataInAsyncStorage = (userData) => {
    return async(dispatch) => {
        await AsyncStorage.setItem("gw:auth:userdata", JSON.stringify(userData));
        dispatch(registerSuccess(userData));
    }
}

export const registerSuccess = (userData) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        userData: userData
    };
};

// export const authFail = (error) => {
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error: error
//     }
// }

// export const authRefresh = () => {
//     return async (dispatch) => {
//         return promise = new Promise(async(resolve, reject) => {
//             const refreshToken = await AsyncStorage.getItem("gw:auth:refresh_token");
//             let authData = null;
//             try {
//                 console.log("In AuthRefresh");
//                 authData = await refresh(authCfg.config, {
//                     refreshToken: refreshToken
//                 });
//             }catch(error) {
//                 console.log(error);
//             }
//             if(authData) {
//                 console.log("Dispatching to authStore");
//                 await dispatch(authStoreToken(authData, false));
//                 resolve(authData);
//             }else {
//                 reject();
//             }
//         })
//         // TODO: Should probably check expiry of refresh token as well...
//     }
// }

export const authRevoke = () => {
    return {
        type: actionTypes.AUTH_REVOKE
    }
}

export const userLogout = () => {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export const logOut = (tokenToRevoke) => {
    return async(dispatch) => {
        try {
            Auth.signOut();
            await dispatch(authClearStorage());
            dispatch(userLogout());
            dispatch(authRevoke());
        }catch(error) {
            // Do nothing yet...
        }
    }
}

// const checkTokenExpiry = (token, storageType = "FromGlobal") => {
//     return (dispatch, getState) => {
//         const promise = new Promise(async(resolve, reject) => {
//             // Get the expiry time
//             let expires_on = null;
//             let didRefresh = null;
//             if(storageType == "FromLocal"){
//                 expires_on = getState().authReducer.accessTokenExpiration;
//             }else {
//                 expires_on = await AsyncStorage.getItem("gw:auth:token_expires_on");
//             }
                
//             console.log("In expiry check function with expiry time: " + expires_on);

//             // Get the current time
//             let now = ((Date.now()/1000));
//             console.log("Change expires_on value");
//             if(expires_on && (parseInt(expires_on) - 150) <= now) {
//                 // dispatch(authClearStorage());
//                 // dispatch(authRevoke());
//                 // reject({message: "Token expired"});
//                 // return;
//                 try {
//                     // If the token is expired, try to refresh it.
//                     let authdata = await dispatch(authRefresh());
//                     didRefresh = true;
//                     token = authdata.accessToken;
//                 }catch(error) {
//                     // If refreshing fails, try to re-authenticate.
//                     await dispatch(auth());
//                     console.log("Error while refreshing token");
//                     reject();
//                     return;
//                 }
//             }
//             // Expiration is ok, return with token.
//             resolve({accessToken: token, expires_on, didRefresh});
//         })
//         console.log("returning from token expiry function");
//         return promise;
//     }
// }

export const registerUser = () => {
    return (dispatch, getState) => {
        dispatch(actions.uiStartLoading());
        let promise = new Promise(async(resolve, reject) => {
            let token = await dispatch(getAuthToken());
    
            let headerObj = {
                'Authorization': `bearer ${token}`
            };
    
            config = {
                headers: headerObj
            };
    
            axios.post("https://giftwizitapi.azurewebsites.net/api/Users", null, config).then((res) => {
                console.log("resolving from register user");
                dispatch(storeUserDataInAsyncStorage(res.data))
                dispatch(actions.uiStopLoading());
                resolve();
            }).catch((e) => {
                dispatch(actions.uiStopLoading());
                reject(e);
            })
        })
        return promise;
    }
}

export const getAuthToken = () => {
    console.log("retrieving token");
    return (dispatch, getState) => {
        const promise = new Promise(async(resolve, reject) => {
            let token = null;
            // console.log(token);
            let doLogin = await AsyncStorage.getItem("gw:auth:doLogin");
            console.log(doLogin);
            if(doLogin == "true") {
                // Get token from async storage.
                // token = await AsyncStorage.getItem("gw:auth:token");
                token = await dispatch(auth());
                // Check expiration
                // let authObj = await dispatch(checkTokenExpiry(token));
                // If no token is found, reject and return.
                // if(!token) {
                //     reject({message: "No token in store"});
                //     return;
                // }

                // Don't run authsuccess if we refreshed, because it was already ran.
                // if(authObj.didRefresh == null) {
                //     await dispatch(authSuccess(authObj));
                // }
                
                resolve(token);
                return;
            }
            // let authObj = await dispatch(checkTokenExpiry(token, "FromLocal"));
            // resolve(token);
            resolve(token);
        })
        return promise;
    }
}

export const authFail = (error) => {
    return (dispatch) => {
        const promise = new Promise(async (resolve, reject) => {
            var resetEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_secretreset1";
            var newTokenEndpoint = "https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_secretreset1";
            if(error.message.indexOf("AADB2C90118") !== -1){
                await authorize({
                    ...authCfg.config,
                    serviceConfiguration:{
                        ...authCfg.config.serviceConfiguration,
                        authorizationEndpoint: resetEndpoint,
                        tokenEndpoint: newTokenEndpoint
                    }
                }).then((result) => {
                    console.log(result);
                    resolve(result);
                }).catch((e) => {
                    console.log(e);
                    reject();
                });
                console.log("Password reset complete");
            }else {
                reject();
            }
        })
        return promise;
    }
} 

export const auth = () => {
    return async(dispatch) => {
        dispatch(authStart())
        try {
            dispatch(actions.uiStartLoading());
            
            await Auth.setEnabled(true);

            const isEnabled = await Auth.isEnabled();

            console.log(isEnabled);

            const userInformation = await Auth.signIn();
            dispatch(authStoreToken(userInformation));
            dispatch(actions.uiStopLoading());
            return userInformation.accessToken;
            // console.log("in auth function");
            // let authState = null;
            // await authorize(authCfg.config).then((authData) => {
            //     authState = authData;
            //     dispatch(authStoreToken(authState));
            // }).catch(async(err) => {
            //     authState = await dispatch(authFail(err));
            //     console.log("Testing");
            //     if(authState != null) {
            //         dispatch(authStoreToken(authState));
            //     }else {
            //         throw err;
            //     }
            //     console.log("after auth fail");
            // });
            // Store token info in asyncStorage
        }catch(error) {
            console.log(error);
            dispatch(actions.uiStopLoading());
        }
    }
}