import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducer';

const rootReducer = combineReducers({
    appReducer: reducer
});

const storeConfiguration = () => {
    return createStore(rootReducer);
};

export default storeConfiguration;