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
import Home from './src/containers/home/home';
import WishList from './src/containers/wish-list/wish-list';
import GiftLists from './src/containers/gift-lists/gift-lists';
import Facts from './src/components/info-content/introduction-card/facts';
import Contacts from './src/containers/contacts/contacts';
import storeConfiguration from './src/store/storeConfig';

import Icon from 'react-native-vector-icons/Ionicons';

const store = storeConfiguration();

// TODO: Move routing info to a seperate file.
// TODO: Maybe move the header image to a seperate file
const WelcomeStackNavigator = createStackNavigator(
  {
    "Welcome": Welcome,
    "Facts": Facts
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
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: <Icon 
                      name="md-home"
                      color="black"
                      size={25}
                  />,
      tabBarLabel: "Home"
    }
  },
  WishList: {
    screen: WishList,
    navigationOptions: {
      tabBarIcon: <Icon 
                      name="md-list-box"
                      color="black"
                      size={25}
                  />,
      tabBarLabel: "Wish Lists"
    }
  },
  GiftLists: {
    screen: GiftLists,
    navigationOptions: {
      tabBarIcon: <Icon 
                      name="md-list-box"
                      color="black"
                      size={25}
                  />,
      tabBarLabel: "Gift Lists"
    }
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      tabBarIcon: <Icon 
                      name="md-contacts"
                      color="black"
                      size={25}
                  />,
      tabBarLabel: "Contacts"
    }
  }
});

const PreAuthStackNavigator = createBottomTabNavigator({
  "Welcome": {
    screen: WelcomeStackNavigator
  },
  "Get Started": {
    screen: GetStarted
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
