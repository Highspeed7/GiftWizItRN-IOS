import Client from 'shopify-buy/index.unoptimized.umd';

import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import * as storefrontConfig from '../../resources/storefront-store';

const storeFrontInterceptor = store => next => async (action) => {
    const state = store.getState();
    let client = state.storeFrontReducer.client;
    switch(action.type) {
        case actionTypes.INITIALIZE_STOREFRONT:
            action.payload = {
                client: null,
                collections: null,
                checkout: null
            };
            client = Client.buildClient({
                domain: 'giftwizit.myshopify.com',
                storefrontAccessToken: storefrontConfig.storefrontToken
            });

            action.payload.client = client;

            await client.collection.fetchAllWithProducts().then((collections) => {
                console.log(collections);
                action.payload.collections = collections;
            });

            // Call to see if there is an existing checkout already
            // If not create a new checkout
            await client.checkout.create().then((checkout) => {
                console.log(checkout.id)
                action.payload.checkout = checkout;
            });

            break;
        case actionTypes.FETCH_CTGRY_PRODUCTS:
            const activeCategory = state.storeFrontReducer.activeCategory;

            await client.collection.fetchWithProducts(activeCategory.id).then((collection) => {
                action.payload = collection.products;
            })
            break;
        case actionTypes.ADD_ITEM_TO_CART:
            const checkoutId = state.storeFrontReducer.checkout.id;
            client.checkout.addLineItems(checkoutId, action.data).then((checkout) => {
                store.dispatch(actions.itemAddedToCart(checkout));
            }).catch((err) => {
                console.log(err);
            })
    }
    next(action);
};

export default storeFrontInterceptor;