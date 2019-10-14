import Client from 'shopify-buy/index.unoptimized.umd';

import * as actionTypes from "../actions/actionTypes";
import * as actions from '../actions/index';
import axios from 'axios';

const storeFrontInterceptor = store => next => async (action) => {
    const state = store.getState();
    let client = state.storeFrontReducer.client;
    let checkoutId = null;
    switch(action.type) {
        case actionTypes.INITIALIZE_STOREFRONT:
            try {
                action.payload = {
                    client: null,
                    collections: null,
                    checkout: null
                };
    
                if(client == null) {
                    client = await store.dispatch(actions.getClient());
                }
    
                action.payload.client = client;
    
                await client.collection.fetchAllWithProducts().then((collections) => {
                    console.log(collections);
                    action.payload.collections = collections;
                });
    
                // Call to see if there is an existing checkout already
                var existingCheckout = await store.dispatch(actions.getCheckout());

                // If not create a new checkout
                if(existingCheckout == null) {
                    await client.checkout.create().then((checkout) => {
                        console.log(checkout.id)
                        
                        var checkoutToStore = {
                            id: checkout.id,
                            webUrl: checkout.webUrl
                        };
                        store.dispatch(actions.setCheckout(checkoutToStore));
                        action.payload.checkout = checkout;
                        store.dispatch(actions.uiStopLoading());
                    });
                }else {
                    await client.checkout.fetch(existingCheckout.checkoutId).then((checkout) => {
                        action.payload.checkout = checkout;
                        store.dispatch(actions.uiStopLoading());
                    })
                }
            }catch(err) {
                console.log(err);
            }
            break;
        case actionTypes.FETCH_CTGRY_PRODUCTS:
            store.dispatch(actions.uiStartLoading());
            const activeCategory = state.storeFrontReducer.activeCategory;

            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            await client.collection.fetchWithProducts(activeCategory.id).then((collection) => {
                action.payload = collection.products;
                store.dispatch(actions.uiStopLoading());
            })
            break;
        case actionTypes.ADD_ITEM_TO_CART:
            checkoutId = state.storeFrontReducer.checkout.id;

            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            client.checkout.addLineItems(checkoutId, action.data).then((checkout) => {
                store.dispatch(actions.itemAddedToCart(checkout));
            }).catch((err) => {
                console.log(err);
            })
            break;
        case actionTypes.REMOVE_ITEM_FROM_CART:
            checkoutId = state.storeFrontReducer.checkout.id;

            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            client.checkout.removeLineItems(checkoutId, action.data).then((checkout) => {
                store.dispatch(actions.itemAddedToCart(checkout));
            }).catch((err) => {
                console.log(err);
            })
            break;
        case actionTypes.UPDATE_ITEM_IN_CART:
            checkoutId = state.storeFrontReducer.checkout.id;

            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            client.checkout.updateLineItems(checkoutId, action.data).then((checkout) => {
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
        case actionTypes.GET_PRODUCT:
            store.dispatch(actions.uiStartLoading());
            const productId = action.data;

            // Check that the client is initialized
            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            await client.product.fetch(productId).then((product) => {
                action.payload = product;
            });
            break;
        case actionTypes.GET_PRODUCTS_NEXT_PAGE:
            store.dispatch(actions.uiStartLoading());

            if(client == null) {
                client = await store.dispatch(actions.getClient());
            }

            await client.fetchNextPage(state.storeFrontReducer.displayedProducts).then((res) => {
                action.payload = res.model
                store.dispatch(actions.uiStopLoading());
            }).catch((err) => {
                console.log("Error: ", err);
            });
    }
    next(action);
};

export default storeFrontInterceptor;