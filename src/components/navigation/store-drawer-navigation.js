import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Alert} from 'react-native';

import HeaderButton from '../store/header-button';
import StoreFront from '../../components/store-selector/giftwizit-shopify/store-front';
import CategoryDrawerContent from '../../components/store/drawer/category-drawer-content';

export default StoreDrawerNavigator = createDrawerNavigator(
    {
        StoreFront: {
            screen: StoreFront,
            navigationOptions: {
                title: 'Categories'
            }
        }
    },
    {
        contentComponent: CategoryDrawerContent
    }
);

StoreDrawerNavigator.navigationOptions = navData => {
    return {
        headerTitle: "Choose a category",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Categories'
                            iconName='list'
                            onPress={() => {navData.navigation.toggleDrawer();}}
                        />
                    </HeaderButtons>
    }
}