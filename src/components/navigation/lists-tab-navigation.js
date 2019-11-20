import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import WishList from '../../containers/wish-list/wish-list';
import GiftLists from '../../containers/gift-lists/gift-lists';
import OtherLists from '../../containers/other-lists/other-lists';
import MaterialTopTabBarWrapper from './tab-components/material-top-tab-bar-wrapper';

export default ListsTabNavigator = createMaterialTopTabNavigator({
    WishList: {
      screen: WishList,
      navigationOptions: {
        tabBarLabel: "Wish List"
      }
    },
    GiftLists: {
      screen: GiftLists,
      navigationOptions: {
        tabBarLabel: "My Gift Lists"
      }
    },
    OtherLists: {
      screen: OtherLists,
      navigationOptions: {
        tabBarLabel: "Other Lists"
      } 
    }
  },
  {
    tabBarComponent: MaterialTopTabBarWrapper,
    tabBarOptions:{
      activeTintColor: 'white',
      indicatorStyle: {backgroundColor: 'white'},
      tabStyle: {backgroundColor: '#4c669f'}
    }
  });