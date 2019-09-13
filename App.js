import React, {Component} from 'react';
import { Provider } from 'react-redux';

import {
  createStackNavigator, 
  createSwitchNavigator, 
  createAppContainer, 
  createBottomTabNavigator
 } from 'react-navigation';
import GetStarted from './src/components/get-started/get-started';
import storeConfiguration from './src/store/storeConfig';

import PostAuthTabNavigator from './src/components/navigation/post-auth-tab-navigation';
import SearchTabNavigation from './src/components/navigation/search-tab-navigation';
import WelcomeStackNavigator from './src/components/navigation/welcome-stack-navigation';
import Splash from './src/containers/splash/splash';

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

const startStackNavigator = createStackNavigator({
  Splash
}, {
  headerMode: "none"
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
  start: startStackNavigator,
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
