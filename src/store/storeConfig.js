import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import preAuthReducer from './reducers/pre-auth-reducer';
import authReducer from './reducers/auth-reducer';
import testReducer from './reducers/test-reducer';
import apiInterceptor from './middleware/api-interceptor';

const rootReducer = combineReducers({
    preAuthReducer: preAuthReducer,
    authReducer: authReducer,
    testReducer: testReducer
});

const storeConfiguration = () => {
    return createStore(rootReducer, applyMiddleware(thunk, apiInterceptor));
};

export default storeConfiguration;