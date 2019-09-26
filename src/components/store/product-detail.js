import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import * as storeConstants from '../../resources/storefront-store';
import * as actions from '../../store/actions/index';
import { SliderBox } from 'react-native-image-slider-box';
import Auxiliary from '../../hoc/auxiliary';

class ProductDetail extends Component {
    state = {
        activeImage: null,
        outerScrollEnabled: true
    }
    touchableRef = null;
    didFocus = () => {
        const productId = this.props.navigation.getParam("productId", null);

        if(productId != null) {
            this.props.getProduct(productId);
        }
        else return;
    }
    willBlur = () => {
        this.props.setProductInactive();
    }
    productImageSelected = (imageSrc) => {
        this.setState({
            activeImage: imageSrc
        });
    }
    clickImageSlider = () => {
        const productImages = this.props.activeProduct.images.map(i => i.src);
        const imageIndex = this.touchableRef.state.currentImage;
        this.productImageSelected(productImages[imageIndex]);
    }
    addLineItemToCart = () => {
        let productId = this.props.activeProduct.variants[0].id
        let itemsToAdd = [];
        let lineItem = {
            variantId: productId,
            quantity: 1
        };

        itemsToAdd.push(lineItem);

        this.props.addItemToCart(itemsToAdd);
    }
    addItemToWishList = () => {
        const product = this.props.activeProduct;
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
    getFavorited = () => {
        let productId = this.props.activeProduct.variants[0].id
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
    render() {
        let productImages;
        // Stop loading spinner
        if(this.props.activeProduct != null) {
            this.props.stopSpinner();
            productImages = this.props.activeProduct.images.map(i => i.src);
       }
        return (
            <Auxiliary>
                <NavigationEvents onDidFocus={this.didFocus} onWillBlur={this.props.setProductInactive} />
                {this.props.activeProduct != null 
                ? [
                    <SliderBox
                        ref={s => this.touchableRef = s}
                        images={productImages} 
                        onCurrentImagePressed={(index) => this.productImageSelected(productImages[index])}
                    />,
                    <TouchableOpacity onPress={this.clickImageSlider} style={{flexDirection: 'row', zIndex: 99999, position: 'absolute', padding: 15}}>
                        <Text style={{fontSize: 15, color: '#eeeeee'}}>Touch for full image... </Text>
                        <FontAwesome5
                            name="hand-pointer"
                            color="#eeeeee"
                            size={20}
                        />
                    </TouchableOpacity>,
                    <ScrollView 
                        style={{padding: 10}}
                        scrollEnabled={this.state.outerScrollEnabled}
                    >
                        <View style={{paddingBottom: 10, marginBottom: 15, borderBottomWidth: 1, borderColor: '#eeeeee'}}>
                            <Text 
                                style={{fontSize: 18, fontWeight: 'bold'}}
                                ellipsizeMode="tail"
                                numberOfLines={2}
                            >
                                {`${this.props.activeProduct.title}`}
                            </Text>
                        </View>
                        <ScrollView 
                            style={{paddingBottom: 10, marginBottom: 15, borderBottomWidth: 1, borderColor: '#eeeeee', height: 100, maxHeight: 150}}
                            onTouchStart={(ev) => {
                                this.setState({outerScrollEnabled: false});
                            }}
                            onMomentumScrollEnd={(e) => {
                                this.setState({outerScrollEnabled: true});
                            }}
                            onScrollEndDrag={(e) => {
                                this.setState({outerScrollEnabled: true})
                            }}
                        >
                            {this.props.activeProduct.description.length > 0
                                ? <Text>{this.props.activeProduct.description}</Text>
                                : <Text>No description... </Text>
                            }
                        </ScrollView>
                        <View style={{marginBottom: 15, borderBottomWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', minHeight: 100}}>
                            <Text style={{fontSize: 48, fontWeight: 'bold'}}>${this.props.activeProduct.variants[0].price}</Text>
                        </View>
                        <View>
                            {
                                (this.getFavorited().length > 0)
                                    ? <Button
                                        containerStyle={{marginBottom: 5}}
                                        title="Remove from Wish List"
                                        type="outline"
                                        onPress={this.addItemToWishList}
                                    />
                                    : <Button
                                        containerStyle={{marginBottom: 5}}
                                        title="Add to Wish List"
                                        type="outline"
                                        onPress={this.addItemToWishList}
                                    />
                            }
                            
                            <Button 
                                containerStyle={{marginBottom: 5}}
                                title="Join Discussion"
                                type="outline"
                                onPress={() => Alert.alert("Coming Soon!")}
                            />
                            <Button
                                containerStyle={{marginBottom: 5}}
                                title="Add to Cart"
                                type="solid"
                                onPress={this.addLineItemToCart}
                            />
                        </View>
                    </ScrollView>
                ]
                : null}
                <Overlay
                    isVisible={this.state.activeImage != null}
                    onBackdropPress={() => this.setState({activeImage: null})}
                >
                    <Image style={{height: '100%', width: '100%', resizeMode: 'contain'}} source={{uri: this.state.activeImage}} />
                </Overlay>
            </Auxiliary>
        )
    }
}

mapStateToProps = state => {
    return {
        activeProduct: state.storeFrontReducer.activeProduct,
        wishList: state.wishListReducer.wishList
    };
};

mapDispatchToProps = dispatch => {
    return {
        getProduct: (productId) => dispatch(actions.getProduct(productId)),
        setProductInactive: () => dispatch(actions.setProductInactive()),
        stopSpinner: () => dispatch(actions.uiStopLoading()),
        addItemToCart: (items) => dispatch(actions.addItemToCart(items)),
        addItemToWList: (item) => dispatch(actions.addWishListItem(item)),
        removeItemFromWList: (item) => dispatch(actions.deleteWishListItems(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);