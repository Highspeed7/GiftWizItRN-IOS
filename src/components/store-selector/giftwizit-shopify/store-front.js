import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Card, Button, ButtonGroup } from 'react-native-elements';

import Auxiliary from '../../../hoc/auxiliary';
import * as actions from '../../../store/actions/index';

class StoreFront extends Component {
    componentDidMount() {
        this.props.initializeStore()
    }
    fetchCategoryProducts = async () => {
        await this.props.fetchCategoryProducts();
    }
    addLineItemToCart = (productId) => {
        let itemsToAdd = [];
        let lineItem = {
            variantId: productId,
            quantity: 1
        };

        itemsToAdd.push(lineItem);

        this.props.addItemToCart(itemsToAdd);
    }
    render() {
        if(this.props.activeCategory != null && this.props.products.length == 0) {
            this.fetchCategoryProducts();
        }
        productsList = (this.props.products.length > 0)
            ? <FlatList
                horizontal={false}
                data={this.props.products}
                renderItem={(product) => {
                    const images = product.item.images;
                    return <Card containerStyle={{minHeight: 100}}>
                                <TouchableOpacity>
                                    <View style={{flexDirection: 'row', flex: 2, maxHeight: 55}}>
                                        <View style={{flex: 1}}>
                                            <Image style={styles.productImage} source={{uri: images[0].src}} />
                                        </View>
                                        <View style={{flex: 4, paddingTop: 3}}>
                                            <Text style={{fontSize: 18, fontWeight: 'bold'}} numberOfLines={2} ellipsizeMode='tail' >{product.item.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', flex: 4, paddingTop: 10}}>
                                    <View style={{flex: 2, flexDirection: 'row'}}>
                                        <Button 
                                            icon={
                                                <FontAwesome5
                                                    name="star"
                                                    color="black"
                                                    size={20}
                                                />
                                            }
                                            type="clear"
                                        />
                                        <Button 
                                            icon={
                                                <FontAwesome5
                                                    name="cart-plus"
                                                    color="black"
                                                    size={20}
                                                />
                                            }
                                            onPress={() => this.addLineItemToCart(product.item.variants[0].id)}
                                            type="clear"
                                        />
                                    </View>
                                    <View style={{flex: 2, alignItems: 'flex-end'}}>
                                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>${product.item.variants[0].price}</Text>
                                    </View>
                                </View>
                            </Card>
                }}
            />
            : null;
        return (
            <View style={{padding: 10, flex: 1}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.props.activeCategory != null ? this.props.activeCategory.title : null}</Text>
                <View style={{flex: 1}}>
                    {productsList}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    productImage: {
        height: 60,
        width: 60
    },
    productImageContainer: {
        resizeMode: 'contain',
        flex: 1
    }
})

mapDispatchToProps = dispatch => {
    return {
        initializeStore: () => dispatch(actions.initializeStore()),
        fetchCategoryProducts: () => dispatch(actions.fetchCategoryProducts()),
        addItemToCart: (lineItems) => dispatch(actions.addItemToCart(lineItems))
    }
}

mapStateToProps = state => {
    return {
        activeCategory: state.storeFrontReducer.activeCategory,
        client: state.storeFrontReducer.client,
        products: state.storeFrontReducer.displayedProducts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);