import React, {Component} from 'react';
import {
  View,
  Image
} from 'react-native';
import { Provider } from 'react-redux';

import {
  createStackNavigator, 
  createSwitchNavigator, 
  createAppContainer, 
  createBottomTabNavigator
 } from 'react-navigation';
import Welcome from './src/containers/welcome/welcome';
import GetStarted from './src/components/get-started/get-started';
import Facts from './src/components/info-content/introduction-card/facts';
import storeConfiguration from './src/store/storeConfig';
import PasswordReset from './src/containers/auth/pass-reset';

import PostAuthTabNavigator from './src/components/navigation/post-auth-tab-navigation';
import SearchTabNavigation from './src/components/navigation/search-tab-navigation';
import WelcomeStackNavigator from './src/components/navigation/welcome-stack-navigation';

const store = storeConfiguration();

// TODO: Move routing info to a seperate file.
// TODO: Maybe move the header image to a seperate file

const PostAuthStackNavigator = createStackNavigator({
  Home: {
    screen: PostAuthTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  SearchLists: {
    screen: SearchTabNavigation
  }
});

const PreAuthStackNavigator = createBottomTabNavigator({
  "Welcome": {
    screen: WelcomeStackNavigator
  },
  "GetStarted": {
    screen: GetStarted,
    navigationOptions: {
      tabBarLabel: "Get Started"
    }
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  preAuth: PreAuthStackNavigator,
  postAuth: PostAuthStackNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
