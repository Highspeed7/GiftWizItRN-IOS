import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Alert} from 'react-native';

import HeaderButton from '../store/header/header-button';
import CartButton from '../store/header/cart-button';
import StoreFront from '../../components/store-selector/giftwizit-shopify/store-front';
import CategoryDrawerContent from '../../components/store/drawer/category-drawer-content';

export default StoreDrawerNavigator = createDrawerNavigator(
    {
        StoreFront: {
            screen: StoreFront,
            path: "storefront",
            navigationOptions: {
                title: 'Categories'
            }
        }
    },
    {
        contentComponent: CategoryDrawerContent
    }
);

const test = () => {
    Alert.alert("Testing")
}

StoreDrawerNavigator.navigationOptions = navData => {
    return {
        headerTitle: "Choose a category",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Categories'
                            iconName='list'
                            onPress={() => {
                                navData.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CartButton}>
                        <Item
                            title='Cart'
                            iconName='shopping-cart'
                            onPress={() => {
                                navData.navigation.navigate("StoreCart")
                            }}
                        />
                    </HeaderButtons>
    }
}