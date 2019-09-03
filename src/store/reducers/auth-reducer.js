import * as actionTypes from '../actions/actionTypes';
import { Alert } from 'react-native';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    accessTokenExpiration: null,
    refreshToken: null,
    authInProgress: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                authInProgress: true
            }
        case actionTypes.AUTH_REVOKE:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                accessTokenExpiration: null,
                refreshToken: null,
                authInProgress: false,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            Alert.alert("In auth success");
            console.log("In Auth Success");
            var expiration = (action.authdata.tokenAdditionalParameters != null) 
            ? action.authdata.tokenAdditionalParameters.expires_on
            : (action.authdata.expires_on != null) ? action.authdata.expires_on : action.authdata.additionalParameters.expires_on

            console.log(`Storing expiration: ${expiration} and token ${action.authdata.accessToken}`);

            return {
                ...state,
                error: null,
                accessToken: action.authdata.accessToken,
                accessTokenExpiration: expiration,
                authInProgress: false,
                isAuthenticated: true
            }
        default:
            return state;
    }   
}

export default authReducer;