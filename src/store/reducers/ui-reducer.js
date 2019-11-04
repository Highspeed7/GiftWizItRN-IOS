import {UI_START_LOADING, UI_STOP_LOADING, POP_NOTIF_TOAST} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    shouldPop: null
};

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case POP_NOTIF_TOAST:
            return {
                ...state,
                shouldPop: action.payload
            }
        default: return state;
    }
}

export default uiReducer;