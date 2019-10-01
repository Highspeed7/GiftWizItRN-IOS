import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButton } from 'react-navigation-header-buttons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CartIcon from '../../notifications/cart-icon';

class CartButton extends Component {
    cartPressed = () => {
        if(this.props.cartCount > 0) {
            this.props.onPress();
        }
    }
    render() {
        return <HeaderButton {...this.props} 
                    IconComponent={CartIcon} 
                    iconSize={23}
                    onPress={() => this.cartPressed()}
                />
    }
}

mapStateToProps = state => {
    return {
        cartCount: state.storeFrontReducer.cartCount
    }
}

export default connect(mapStateToProps)(CartButton);