import React, {Component} from 'react';
import { Linking } from 'react-native';
import { Provider } from 'react-redux';
import {
  createSwitchNavigator, 
  createAppContainer
 } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import GetStarted from './src/components/get-started/get-started';
import storeConfiguration from './src/store/storeConfig';

import PostAuthTabNavigator from './src/components/navigation/post-auth-tab-navigation';
import SearchTabNavigation from './src/components/navigation/search-tab-navigation';
import WelcomeStackNavigator from './src/components/navigation/welcome-stack-navigation';
import Splash from './src/containers/splash/splash';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import StoreDrawerNavigator from './src/components/navigation/store-drawer-navigation';
import StoreProductNavigator from './src/components/navigation/store-product-navigation';
import StoreCart from './src/components/store/store-cart';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://ffc091a0db47471facafaf3fade97fea@sentry.io/1778392', 
});


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
  },
  Store: {
    screen: StoreDrawerNavigator,
    path: 'test'
  },
  Products: {
    screen: StoreProductNavigator
  },
  StoreCart: {
    screen: StoreCart,
    path: "cart"
  }
});



const startStackNavigator = createStackNavigator({
  Splash
}, {
  initialRouteName: "Splash",
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
  postAuth: {
    screen: PostAuthStackNavigator,
    path: ''
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return (
      [
        <Spinner key="0" visible={this.props.loading} />,
        <AppContainer key="1" />
      ]
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.uiReducer.isLoading
  }
}

const ConnectedRootContainer = connect(mapStateToProps)(App);

export default function Root() {
  try {
    return (
      <Provider store={store}>
        <ConnectedRootContainer />
      </Provider>
    )
  }catch(error) {
    console.log(error);
  }
};
