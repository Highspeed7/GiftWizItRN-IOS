import * as actionTypes from '../actions/actionTypes';

initialState = {
    isAuthenticated: false,
    accessToken: null,
    accessTokenExpiration: null,
    refreshToken: null,
    authInProgress: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        // case "SET_AUTH":
        //     return {
        //         ...state,
        //         isAuthenticated: action.value
        //     }
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
            return {
                ...state,
                error: null,
                accessToken: action.authdata.accessToken,
                accessTokenExpiration: action.authdata.tokenAdditionalParameters.expires_on,
                authInProgress: false,
                isAuthenticated: true
            }
        default:
            return state;
    }   
}

export default authReducer;