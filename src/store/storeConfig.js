import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import preAuthReducer from './reducers/pre-auth-reducer';
import authReducer from './reducers/auth-reducer';

const rootReducer = combineReducers({
    preAuthReducer: preAuthReducer,
    authReducer: authReducer
});

const storeConfiguration = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default storeConfiguration;