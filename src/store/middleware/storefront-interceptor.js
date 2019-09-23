import Client from 'shopify-buy/index.unoptimized.umd';

import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import * as storefrontConfig from '../../resources/storefront-store';
import axios from 'axios';

const storeFrontInterceptor = store => next => async (action) => {
    const state = store.getState();
    let client = state.storeFrontReducer.client;
    switch(action.type) {
        case actionTypes.INITIALIZE_STOREFRONT:
            try {
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
                    store.dispatch()
                    action.payload.collections = collections;
                });
    
                // Call to see if there is an existing checkout already
                var existingCheckout = await store.dispatch(actions.getCheckout());

                // If not create a new checkout
                console.log(existingCheckout);
                if(existingCheckout == null) {
                    await client.checkout.create().then((checkout) => {
                        console.log(checkout.id)
                        
                        var checkoutToStore = {
                            id: checkout.id,
                            webUrl: checkout.webUrl
                        };
                        store.dispatch(actions.setCheckout(checkoutToStore));
                        action.payload.checkout = checkout;
                    });
                }else {
                    await client.checkout.fetch(existingCheckout.checkoutId).then((checkout) => {
                        action.payload.checkout = checkout;
                    })
                }
            }catch(err) {
                console.log(err);
            }
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
            break;
        case actionTypes.SET_CHECKOUT:
            store.dispatch(actions.uiStartLoading());
            token = await store.dispatch(actions.getAuthToken());

            let headerObj = {
                'Authorization': `bearer ${token}`
            };

            let body = action.data;

            config = {
                headers: headerObj
            };
            await axios.post("https://giftwizitapi.azurewebsites.net/api/storeCheckout", body, config).then((response) => {
                store.dispatch(actions.uiStopLoading());
            });
            break;
        case actionTypes.GET_CHECKOUT:
            
            break;
    }
    next(action);
};

export default storeFrontInterceptor;