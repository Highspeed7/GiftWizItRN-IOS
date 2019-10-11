import React, { Component } from 'react';
import { 
    Alert, 
    ScrollView, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    Dimensions
} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

import ProductVariants from './product-variants/product-variants';
import {shallowCompare} from '../../utils/utils';
import * as storeConstants from '../../resources/storefront-store';
import * as actions from '../../store/actions/index';
import { SliderBox } from 'react-native-image-slider-box';
import Auxiliary from '../../hoc/auxiliary';

class ProductDetail extends Component {
    // Gives access to variants selected
    variantRef = null;
    selectedVariant = null;
    state = {
        activeImage: null,
        viewDesc: null,
        activeVariant: null,
        cartActionEnabled: true,
        enableDiscussion: false,
    }
    touchableRef = null;
    didFocus = () => {
        this.props.initializeStore();
        const {product_Id, variant_Id, startDiscussion} = this.props.navigation.state.params;

        if(startDiscussion) {
            this.setState({
                enableDiscussion: true
            });
        }

        if(product_Id != null) {
            this.props.getProduct(product_Id);
        }
        else return;
    }
    willBlur = () => {
        this.props.setProductInactive();
        this.setState({
            enableDiscussion: false
        });
    }
    componentDidUpdate = () => {
        if(this.props.activeProduct != null && this.selectedVariant == null) {
            this.setActiveVariant()
            this.props.stopSpinner();
        }
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return shallowCompare(this, nextProps, nextState);
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
        let productId = this.selectedVariant.id
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
            variant_Id: this.selectedVariant.id,
            product_Id: product.id
        };
        
        // Construct the item to add
        var itemToAdd = {
            name: product.title,
            image: this.props.activeVariant.image.src,
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
        let productId;

        if(this.selectedVariant == null) {
            productId = this.props.activeProduct.variants[0].id;
        }else {
            productId = this.selectedVariant.id;
        }

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
    openDescription = () => {
        this.setState({
            viewDesc: true
        });
    };
    setActiveVariant = () => {
        let {variant_Id} = this.props.navigation.state.params;

        // If we aren't provided a variant_Id... assign the first one (This should never happen)
        if(variant_Id == null) {
            variant_Id = this.props.activeProduct.variants[0].id
        }

        this.props.activeProduct.variants.filter((variant) => {
            if(variant.id == variant_Id) {
                this.setState({
                    activeVariant: variant
                });
                this.selectedVariant = variant;
            }    
        })
    }
    variantChanged = (available, chosenVariant) => {
        this.setState({cartActionEnabled: available})

        if(available) {
            this.selectedVariant = chosenVariant;
            this.forceUpdate();
        }
    }
    render() {
        let productImages = null;
        if(this.props.activeProduct != null) {
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
                    <Overlay
                        fullScreen={true}
                        isVisible={this.state.viewDesc != null}
                        onBackdropPress={() => this.setState({viewDesc: null})}
                    >
                        {this.props.activeProduct.descriptionHtml.length > 0
                            ? <ScrollView>
                                <HTML html={this.props.activeProduct.descriptionHtml} imagesMaxWidth={Dimensions.get('window').width} />
                            </ScrollView>
                            : null
                        }
                    </Overlay>,
                    <ScrollView 
                        style={{padding: 10}}
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
                        <View 
                            style={{flex: 1, flexDirection: 'column', paddingBottom: 10, marginBottom: 15, borderBottomWidth: 1, borderColor: '#eeeeee'}}
                        >
                            {this.props.activeProduct.description.length > 0
                                ? <TouchableOpacity onPress={this.openDescription}>
                                    <Text style={{textDecorationLine: 'underline', fontFamily: 'Avenir Next LT Pro Light', fontSize: 20, color: 'gray'}} >Description</Text>
                                </TouchableOpacity>
                                : <Text>No description... </Text>
                            }
                        </View>
                        {this.props.activeProduct.variants.length > 1 
                            ? <View style={{marginBottom: 15, borderBottomWidth: 1, borderColor: '#eeeeee', paddingBottom: 15}}>
                                    <ProductVariants
                                        ref={r => this.variantRef = r} 
                                        activeProduct={this.props.activeProduct}
                                        activeVariant={this.state.activeVariant}
                                        onVariantChanged={this.variantChanged}
                                    />
                                </View>
                            : null
                        }
                        
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
                            {
                                (this.state.enableDiscussion)
                                ? <Button 
                                    containerStyle={{marginBottom: 5}}
                                    title="Join Discussion"
                                    type="outline"
                                    onPress={() => Alert.alert("Coming Soon!")}
                                />
                                : null
                            }
                            <Button
                                disabled={!this.state.cartActionEnabled}
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
        activeVariant: state.storeFrontReducer.activeVariant,
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
        removeItemFromWList: (item) => dispatch(actions.deleteWishListItems(item)),
        initializeStore: () => dispatch(actions.initializeStore())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);