import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SearchPublicLists from '../../containers/search-lists/public-search-lists';
import SearchPrivateLists from '../../containers/search-lists/private-search-lists';

export default SearchTabNavigation = createBottomTabNavigator({
    SearchPublicLists: {
      screen: SearchPublicLists,
      navigationOptions: {
        tabBarLabel: "Search Public Lists"
      }
    },
    SearchPrivateLists: {
      screen: SearchPrivateLists,
      navigationOptions: {
        tabBarLabel: "Search Private Lists"
      }
    }
  });