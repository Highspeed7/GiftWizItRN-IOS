import * as actionTypes from './actionTypes';

export const setChatConnectionId = (connId) => {
    return {
        type: actionTypes.SET_CHAT_CONNECTION_ID,
        data: connId
    };
};

export const setChatConnection = (connection) => {
    return {
        type: actionTypes.SET_CHAT_CONNECTION,
        data: connection
    };
};