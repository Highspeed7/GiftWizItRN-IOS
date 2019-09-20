import React, { Component } from 'react';
import { Text } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CartIcon from '../../notifications/cart-icon';

class CustomHeaderButton extends Component {
    render() {
        return <HeaderButton {...this.props} 
                    IconComponent={CartIcon} 
                    iconSize={23}
                />
    }
}

export default CustomHeaderButton;