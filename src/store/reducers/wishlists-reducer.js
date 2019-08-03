import * as actionTypes from '../actions/actionTypes';

const initialState = {
    wishList: []
}

const wishListReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_WISH_LIST:
            return {
                ...state,
                wishList: action.wishList
            }
    }
    return state;
}

export default wishListReducer;