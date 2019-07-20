import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import AuthConfirm from './src/components/auth-confirm/auth-confirm';
import Welcome from './src/components/welcome/welcome';
import Dashboard from './src/containers/dashboard/dashboard';

const AuthStackNavigator = createStackNavigator({
  "Welcome": {
    screen: Welcome
  },
  "oauth-redirect": {
    screen: AuthConfirm
  }
})

// const AppStackNavigator = createStackNavigator({
//   "dashboard": Dashboard
// })

// const AppSwitchNavigator = createSwitchNavigator({
//   auth: AuthStackNavigator,
//   app: AppStackNavigator
// })

const AppContainer = createAppContainer(AuthStackNavigator);

class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

export default App;
