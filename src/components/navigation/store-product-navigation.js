import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CartButton from '../store/header/cart-button';
import ProductDetail from '../store/product-detail';

export default StoreProductNavigator = createStackNavigator(
    {
        Product: {
            screen: ProductDetail
        }
    },
    {
        headerMode: 'none'
    }
);

StoreProductNavigator.navigationOptions = navData => {
    return {
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