import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import preAuthReducer from './reducers/pre-auth-reducer';
import authReducer from './reducers/auth-reducer';
import giftListsReducer from './reducers/giftlists-reducer';
import wishListReducer from './reducers/wishlists-reducer';
import sharedListsReducer from './reducers/shared-lists-reducer';
import apiInterceptor from './middleware/api-interceptor';
import contactsReducer from './reducers/contacts-reducer';
import searchListsReducer from './reducers/search-reducer';
import notificationsReducer from './reducers/notifications-reducer';

const rootReducer = combineReducers({
    preAuthReducer: preAuthReducer,
    authReducer: authReducer,
    giftListsReducer: giftListsReducer,
    contactsReducer: contactsReducer,
    wishListReducer: wishListReducer,
    sharedListsReducer: sharedListsReducer,
    searchListsReducer: searchListsReducer,
    notificationsReducer: notificationsReducer
});

const storeConfiguration = () => {
    return createStore(rootReducer, applyMiddleware(thunk, apiInterceptor));
};

export default storeConfiguration;