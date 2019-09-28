import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import CartItem from './cart-item/cart-item';

class StoreCart extends Component {
    render() {
        // const { likneItems } = this.props.checkout;
        return (
            <FlatList
                style={{borderWidth: 1}}
                data={this.props.checkout.lineItems}
                renderItem={({item}) => (
                    <CartItem product={item} />
                )}
            />
        )
    }
}

mapStateToProps = state => {
    return {
        checkout: state.storeFrontReducer.checkout
    }
}

export default connect(mapStateToProps)(StoreCart);