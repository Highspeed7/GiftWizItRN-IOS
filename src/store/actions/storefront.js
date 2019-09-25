import * as actionTypes from './actionTypes';
import Client from 'shopify-buy/index.unoptimized.umd';

import * as storefrontConfig from '../../resources/storefront-store';

import * as actions from './index';

import axios from 'axios';

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

export const getClient = () => {
    return async(dispatch) => {
        return promise = new Promise((resolve, reject) => {
            try {
                let client = Client.buildClient({
                    domain: 'giftwizit.myshopify.com',
                    storefrontAccessToken: storefrontConfig.storefrontToken
                });
                resolve(client);
            }catch(err) {
                reject(err);
            }
        });
    };
};

export const getCheckout = () => {
    return async(dispatch) => {
        return promise = new Promise(async (resolve, reject) => {
            try {
                dispatch(actions.uiStartLoading());
                token = await dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                config = {
                    headers: headerObj
                };

                await axios.get("https://giftwizitapi.azurewebsites.net/api/getCheckout", config).then((r) => {
                    dispatch(actions.uiStopLoading());
                    if(r.data.length > 0) {
                        resolve(r.data[0]);
                        return;
                    }
                    resolve(null);
                });
            }catch(err) {
                console.log(err);
                reject();
            }
        })
    }
}

export const getProduct = (productId) => {
    return {
        type: actionTypes.GET_PRODUCT,
        data: productId
    };
};

export const setProductInactive = () => {
    return {
        type: actionTypes.SET_PRODUCT_INACTIVE
    };
};