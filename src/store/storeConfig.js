import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import preAuthReducer from './reducers/pre-auth-reducer';
import authReducer from './reducers/auth-reducer';
import giftListsReducer from './reducers/giftlists-reducer';
import wishListReducer from './reducers/wishlists-reducer';
import apiInterceptor from './middleware/api-interceptor';
import contactsReducer from './reducers/contacts-reducer';

const rootReducer = combineReducers({
    preAuthReducer: preAuthReducer,
    authReducer: authReducer,
    giftListsReducer: giftListsReducer,
    contactsReducer: contactsReducer,
    wishListReducer: wishListReducer
});

const storeConfiguration = () => {
    return createStore(rootReducer, applyMiddleware(thunk, apiInterceptor));
};

export default storeConfiguration;