import * as actionTypes from '../actions/actionTypes';

const initialState = {
    promoCollections: []
}

const giftIdeasReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_PROMO_COLLECTIONS:
            return {
                promoCollections: action.data
            }
        default: return state;
    }
}

export default giftIdeasReducer;