import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as signalR from '@aspnet/signalr';

import preAuthReducer from './reducers/pre-auth-reducer';
import authReducer from './reducers/auth-reducer';
import giftListsReducer from './reducers/giftlists-reducer';
import wishListReducer from './reducers/wishlists-reducer';
import sharedListsReducer from './reducers/shared-lists-reducer';
import apiInterceptor from './middleware/api-interceptor';
import signalRInterceptor from './middleware/signalr-interceptor';
import storefrontInterceptor from './middleware/storefront-interceptor';
import notificationActionInterceptor from './middleware/notification-action-interceptor';
import contactsReducer from './reducers/contacts-reducer';
import storeFrontReducer from './reducers/storefront-reducer';
import searchListsReducer from './reducers/search-reducer';
import notificationsReducer from './reducers/notifications-reducer';
import uiReducer from './reducers/ui-reducer';

const appReducer = combineReducers({
    preAuthReducer: preAuthReducer,
    authReducer: authReducer,
    giftListsReducer: giftListsReducer,
    contactsReducer: contactsReducer,
    wishListReducer: wishListReducer,
    sharedListsReducer: sharedListsReducer,
    searchListsReducer: searchListsReducer,
    notificationsReducer: notificationsReducer,
    storeFrontReducer: storeFrontReducer,
    uiReducer: uiReducer
});

const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
}

const storeConfiguration = () => {
    return createStore(rootReducer, applyMiddleware(thunk, apiInterceptor, signalRInterceptor, notificationActionInterceptor, storefrontInterceptor));
};

export default storeConfiguration;