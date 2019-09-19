import Client from 'shopify-buy/index.unoptimized.umd';

import * as actionTypes from "../actions/actionTypes";
import * as storefrontConfig from '../../resources/storefront-store';

const storeFrontInterceptor = store => next => async (action) => {
    const state = store.getState();
    let client = state.storeFrontReducer.client;
    switch(action.type) {
        case actionTypes.INITIALIZE_STOREFRONT:
            action.payload = {
                client: null,
                collections: null
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
            break;
        case actionTypes.FETCH_CTGRY_PRODUCTS:
            const activeCategory = state.storeFrontReducer.activeCategory;

            await client.collection.fetchWithProducts(activeCategory.id).then((collection) => {
                action.payload = collection.products;
            })
            break;
    }
    next(action);
};

export default storeFrontInterceptor;