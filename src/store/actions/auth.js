import * as actionTypes from './actionTypes';
import {authorize, revoke} from 'react-native-app-auth';
import * as authCfg from './authConfig';

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

export const auth = () => {
    return async(dispatch) => {
        // TODO: Add loading spinner
        dispatch(authStart())
        try {
            const authState = await authorize(authCfg.config);
            dispatch(authSuccess(authState));
        }catch(error) {
            dispatch(authFail(error));
        }
    }
}