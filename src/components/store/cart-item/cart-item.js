import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-elements';

class CartItem extends Component {
    render() {
        const product = this.props.product;
        const image = product.variant.image.src;
        return (
            <Card>
                <View style={{flexDirection: 'row', flex: 2, maxHeight: 55}}>
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
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    productImage: {
        height: 60,
        width: 60
    }
})

export default CartItem;