import * as actionsTypes from '../../store/actions/actionTypes';

const initialState = {
    client: null,
    collections: [],
    activeCategory: null,
    displayedProducts: []
}

const storeFrontReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionsTypes.INITIALIZE_STOREFRONT:
            return {
                ...state,
                client: action.payload.client,
                collections: action.payload.collections
            }
        case actionsTypes.SET_CATEGORY_ACTIVE:
            return {
                ...state,
                activeCategory: action.data
            }
        case actionsTypes.FETCH_CTGRY_PRODUCTS:
            return {
                ...state,
                displayedProducts: action.payload
            }
        case actionsTypes.CLEAR_CTGRY_PRODUCTS:
            return {
                ...state,
                displayedProducts: []
            }
        default: return state;
    }
}

export default storeFrontReducer;