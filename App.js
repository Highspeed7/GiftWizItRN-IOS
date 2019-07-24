import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet
} from 'react-native';
import { Provider } from 'react-redux';

import {
  createStackNavigator, 
  createSwitchNavigator, 
  createAppContainer, 
  createBottomTabNavigator} from 'react-navigation';
import Welcome from './src/containers/welcome/welcome';
import GetStarted from './src/components/get-started/get-started';
import WishList from './src/containers/wish-list/wish-list';
import GiftLists from './src/containers/gift-lists/gift-lists';
import Contacts from './src/containers/contacts/contacts';
import storeConfiguration from './src/store/storeConfig';

import Content2 from './src/components/content2/content2';
import Content3 from './src/components/content3/content3';

const store = storeConfiguration();

// TODO: Move routing info to a seperate file.
// TODO: Maybe move the header image to a seperate file
const WelcomeStackNavigator = createStackNavigator(
  {
    "Welcome": Welcome,
    "Content2": Content2,
    "Content3": Content3
  },
  {
    defaultNavigationOptions: {
        headerTitle: (
          <View style={{width: '100%'}}>
            <Image
              style={{width: 150, height: '100%', alignSelf: 'center'}} 
              source={{uri: 'https://giftwizit.com/assets/images/gw_logo2.png'}}
            />
          </View>
        ),
        headerStyle: {
          height: 65
        }
    }
  }
);

const PostAuthStackNavigator = createBottomTabNavigator({
  "Wish Lists": WishList,
  "Gift Lists": GiftLists,
  "Contacts": Contacts
});

const PreAuthStackNavigator = createBottomTabNavigator({
  "Welcome": {
    screen: WelcomeStackNavigator
  },
  "Get Started": GetStarted
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
