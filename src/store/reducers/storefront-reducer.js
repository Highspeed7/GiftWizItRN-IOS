import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
    client: null,
    collections: [],
    activeCategory: null,
    displayedProducts: [],
    activeProduct: null,
    checkout: null,
    cartCount: 0
}

const storeFrontReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIALIZE_STOREFRONT:
            return {
                ...state,
                client: action.payload.client,
                collections: action.payload.collections,
                checkout: action.payload.checkout,
                cartCount: setCartCount(action.payload.checkout.lineItems)
            }
        case actionTypes.SET_CATEGORY_ACTIVE:
            return {
                ...state,
                activeCategory: action.data
            }
        case actionTypes.FETCH_CTGRY_PRODUCTS:
            return {
                ...state,
                displayedProducts: action.payload
            }
        case actionTypes.CLEAR_CTGRY_PRODUCTS:
            return {
                ...state,
                displayedProducts: []
            }
        case actionTypes.ITEM_ADDED_TO_CART:
            return {
                ...state,
                checkout: action.data,
                cartCount: setCartCount(action.data.lineItems)
            }
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                activeProduct: action.payload
            }
        case actionTypes.SET_PRODUCT_INACTIVE:
            return {
                ...state,
                activeProduct: null
            }
        case actionTypes.GET_PRODUCTS_NEXT_PAGE:
            return {
                ...state,
                displayedProducts: state.displayedProducts.concat(action.payload)
            }
        default: return state;
    }
}

const setCartCount = (lineItems) => {
    let count = 0;
    lineItems.forEach(item => {
        count = count + item.quantity;
    });

    return count;
}

export default storeFrontReducer;