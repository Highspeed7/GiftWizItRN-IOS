import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../../containers/home/home';
import Contacts from '../../containers/contacts/contacts';
import NotificationsIcon from '../notifications/notifications-icon';
import Notifications from '../../components/notifications/notifications';
import ListsTabNavigator from './lists-tab-navigation';

export default PostAuthTabNavigator = createBottomTabNavigator({
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
    Lists: {
      screen: ListsTabNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: <Icon 
                        name="md-list-box"
                        color="black"
                        size={25}
                    />,
        tabBarLabel: "Lists"
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
        tabBarLabel: "Contacts",
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({screenProps}) => ({
        tabBarIcon: () => (
          <NotificationsIcon />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#4c669f',
      inactiveBackgroundColor: '#7db9e8',
      tabStyle: {borderTopColor: 'transparent', borderTopWidth: 0},
      labelStyle: {color: 'white', borderTopWidth: 0},
    }
  }
  );