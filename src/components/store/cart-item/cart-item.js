import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CartItem extends Component {
    render() {
        const product = this.props.product;
        const image = product.variant.image.src;
        return (
            <Card>
                <View style={styles.itemCardTop}>
                    <View style={{flex: 1}}>
                        <Image style={styles.productImage} source={{uri: image}} />
                        <Badge 
                            value={product.quantity}
                            containerStyle={{position: 'absolute', right: 3, bottom: -10}}
                        />
                    </View>
                    <View style={{flex: 4, paddingTop: 3}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}} numberOfLines={2} ellipsizeMode='tail' >{product.title}</Text>
                    </View>
                </View>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Button
                            buttonStyle={{...styles.cartActionButton, marginLeft: 0}}
                            type='outline'
                            icon={<Icon
                                name="plus"
                                size={15}
                                color="black"
                            />}
                            onPress={this.props.onItemAdd}
                        />
                        <Button
                            buttonStyle={styles.cartActionButton}
                            type='outline'
                            icon={<Icon
                                name="minus"
                                size={15}
                                color="black"
                            />}
                            onPress={this.props.onItemRemove}
                        />
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 20}}>{`$${product.variant.price} x ${product.quantity} = $${(product.variant.price * product.quantity)}`}</Text>
                    </View>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    productImage: {
        height: 60,
        width: 60
    },
    itemCardTop: {
        flexDirection: 'row',
        flex: 2,
        maxHeight: 55,
        marginBottom: 15
    },
    cartActionButton: {
        borderRadius: 50,
        width: 30,
        height: 30,
        margin: 3
    }
})

export default CartItem;