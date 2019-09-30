import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import {goclone} from '../../utils/utils';
import * as actions from '../../store/actions/index';
import CartItem from './cart-item/cart-item';

class StoreCart extends Component {
    state = {
        summaryVisible: true
    }
    showSummary = () => {
        this.setState({
            summaryVisible: true
        });
    }
    toggleSummaryView = () => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                summaryVisible: !prevState.summaryVisible
            }
        });
    }
    completeCheckout = () => {
        const url = this.props.checkout.webUrl;
        Linking.canOpenURL(url).then((r) => {
            if(r){
                Linking.openURL(url);
            }
        });
    }
    addLineItemToCart = (item) => {
        let productId = item.variant.id
        let itemsToAdd = [];
        let lineItem = {
            variantId: productId,
            quantity: 1
        };

        itemsToAdd.push(lineItem);

        this.props.addItemToCart(itemsToAdd);
    }
    updateLineItem = (item) => {
        let itemCpy = goclone(item);
        let productId = itemCpy.id;
        let quantity = (itemCpy.quantity - 1);
        let itemsToUpdate = [];
        let lineItem = {
            id: productId,
            quantity: quantity
        };

        itemsToUpdate.push(lineItem);

        this.props.updateLineItem(itemsToUpdate);
    }
    removeLineItemFromCart = (item) => {
        let productId = item.id
        let itemsToRemove = [];

        itemsToRemove.push(productId);

        this.props.removeItemFromCart(itemsToRemove);
    }
    render() {
        // const { likneItems } = this.props.checkout;
        return (
            [
                <FlatList
                    ListFooterComponent={() => <View style={{height: 40}}></View>}
                    data={this.props.checkout.lineItems}
                    renderItem={({item}) => ([
                        <CartItem 
                            product={item} 
                            onItemAdd={() => this.addLineItemToCart(item)} 
                            onItemRemove={() => this.updateLineItem(item)} 
                        />
                    ])}
                />,
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                    }}>
                    {this.state.summaryVisible == false
                    ? <Button
                        title="Order Summary"
                        type="outline"
                        buttonStyle={{
                            width: 150, 
                            position: 'relative', 
                            bottom: -5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            backgroundColor: 'rgba(135, 206, 250, 0.4)'
                        }}
                        onPress={this.toggleSummaryView}
                    />
                    : <Button
                        icon={<Icon
                            name="times"
                            size={20}
                            color="red"
                        />}
                        type="outline"
                        buttonStyle={{
                            width: 150, 
                            position: 'relative', 
                            bottom: -5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            backgroundColor: 'rgba(135, 206, 250, 0.4)'
                        }}
                        onPress={this.toggleSummaryView}
                    />}
                    {this.state.summaryVisible == true
                        ? <View style={styles.summaryView}>
                            <Text style={styles.priceText}>{`Subtotal: $${this.props.checkout.subtotalPrice}`}</Text>
                            <Button title="Continue" onPress={this.completeCheckout} />
                        </View>
                        : null
                    }
                </View>
            ]
        )
    }
}

const styles = StyleSheet.create({
    priceText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    summaryView :{
        height: 150, 
        borderWidth: 1, 
        width: '100%',
        backgroundColor: 'white',
        padding: 10
    }
})

mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (items) => dispatch(actions.addItemToCart(items)),
        removeItemFromCart: (items) => dispatch(actions.removeItemFromCart(items)),
        updateLineItem: (items) => dispatch(actions.updateItemInCart(items))
    }
}

mapStateToProps = state => {
    return {
        checkout: state.storeFrontReducer.checkout
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreCart);