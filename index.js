/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import reducer from './src/store/reducer';

const store = createStore(reducer);

AppRegistry.registerComponent(appName, () => App);
