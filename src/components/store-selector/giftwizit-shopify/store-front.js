import React, { Component } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Linking,
    Alert
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAweomse from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Card, Button, ButtonGroup } from 'react-native-elements';

import * as storeConstants from '../../../resources/storefront-store';
import * as actions from '../../../store/actions/index';

class StoreFront extends Component {
    shouldGetPreviousCheckout = false;
    componentDidMount() {
        if(this.props.navigation.state.params != null) {
            try {
                const {getPrevCheckout} = this.props.navigation.state.params;
                this.shouldGetPreviousCheckout = getPrevCheckout;
                this.props.initializeStore(getPrevCheckout)
            }catch(e) {
                this.props.initializeStore(null);
            }
        }else {
            this.props.initializeStore(null);
        }
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
    addItemToWishList = (product) => {
        const favorited = this.getFavorited(product.variants[0].id);
        if(favorited.length > 0) {
            this.removeItemFromWishList(favorited[0]);
            return;
        }

        productData = {
            variant_Id: product.variants[0].id,
            product_Id: product.id
        };
        
        // Construct the item to add
        var itemToAdd = {
            name: product.title,
            image: product.images[0].src,
            productId: JSON.stringify(productData),
            domain: storeConstants.storeDomain,
            url: null
        }

        this.props.addItemToWList(itemToAdd);
    }
    removeItemFromWishList = (item) => {
        let deletedItemsArr = [];
        let deletedItemObj = {};

        deletedItemObj["item_Id"] = item.item_Id;
        deletedItemsArr.push(deletedItemObj);

        this.props.removeItemFromWList(deletedItemsArr);
    }
    testButtonClicked = () => {
        const url = "giftwi://product-detail";
        Linking.canOpenURL(url).then((supported) => {
            Linking.openURL(
                supported
                    ? url
                    : null
            ).catch((err) => {
                console.error("An error happened: ", err);
            })
        })
    }
    getFavorited = (productId) => {
        const wishList = this.props.wishList

        let favorited = [];

        favorited = wishList.filter((item) => {
            let itemProductData = {
                variant_Id: null
            };

            if(item.product_Id != null) {
                itemProductData = JSON.parse(item.product_Id);
            }

            if(itemProductData.variant_Id == productId){
                return item;
            }
        });

        return favorited;
    }
    productSelected = (product) => {
        let productData = {
            product_Id: product.id
        }
        // Send the productId as well as the first variantId, because 'Products will be expecting it.
        this.props.navigation.navigate("Products", {...productData, enableWishListAdd: this.shouldGetPreviousCheckout});
    }
    fetchNextPageOfProducts = () => {
        let lastProductIndex = this.props.products.length - 1;
        if(this.props.products[lastProductIndex].hasNextPage) {
            this.props.fetchNextPage();
        }
    }
    leaveStore = () => {
        if(this.shouldGetPreviousCheckout) {
            this.props.navigation.navigate("WishList");
        }else {
            this.props.navigation.navigate("Welcome");
        }
    }
    render() {
        if(this.props.activeCategory != null && this.props.products.length == 0) {
            this.fetchCategoryProducts();
        }
        productsList = (this.props.products.length > 0)
            ? <FlatList
                horizontal={false}
                data={this.props.products}
                extraData={this.props.wishList}
                onEndReached={this.fetchNextPageOfProducts}
                onEndReachedThreshold={1}
                renderItem={(product) => {
                    const images = product.item.images;
                    return product.item.availableForSale == true 
                        ?
                            <Card key={product.item.id} containerStyle={{minHeight: 100}}>
                                <TouchableOpacity onPress={() => this.productSelected(product.item)}>
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
                                                <FontAweomse
                                                    name={(this.getFavorited(product.item.variants[0].id).length > 0) ? "star" : "star-o"}
                                                    color={(this.getFavorited(product.item.variants[0].id).length > 0) ? "orange" : "black"}
                                                    size={20}
                                                />
                                            }
                                            onPress={() => this.addItemToWishList(product.item)}
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
                        : null
                }}
            />
            : null;
        return (
            <View style={{padding: 10, flex: 1}}>
                <Button title="Exit" onPress={this.leaveStore} />
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
        initializeStore: (getPrevCheckout) => dispatch(actions.initializeStore(getPrevCheckout)),
        fetchCategoryProducts: () => dispatch(actions.fetchCategoryProducts()),
        addItemToCart: (lineItems) => dispatch(actions.addItemToCart(lineItems)),
        addItemToWList: (item) => dispatch(actions.addWishListItem(item)),
        removeItemFromWList: (item) => dispatch(actions.deleteWishListItems(item)),
        fetchNextPage: () => dispatch(actions.fetchNextPageOfProducts())
    }
}

mapStateToProps = state => {
    return {
        activeCategory: state.storeFrontReducer.activeCategory,
        client: state.storeFrontReducer.client,
        products: state.storeFrontReducer.displayedProducts,
        wishList: state.wishListReducer.wishList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);