import * as actionTypes from './actionTypes';

export const initializeStore = () => {
    return {
        type: actionTypes.INITIALIZE_STOREFRONT
    }
}

export const setCategoryActive = (collection) => {
    return {
        type: actionTypes.SET_CATEGORY_ACTIVE,
        data: collection
    }
}

export const fetchCategoryProducts = () => {
    return {
        type: actionTypes.FETCH_CTGRY_PRODUCTS
    }
}

export const clearCategoryProducts = () => {
    return {
        type: actionTypes.CLEAR_CTGRY_PRODUCTS
    }
}

export const addItemToCart = (item) => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        data: item
    }
}

export const itemAddedToCart = (checkout) => {
    return {
        type: actionTypes.ITEM_ADDED_TO_CART,
        data: checkout
    };
};

export const setCheckout = (checkout) => {
    return {
        type: actionTypes.SET_CHECKOUT,
        data: checkout
    };
};
