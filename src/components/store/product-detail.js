import React, { Component } from 'react';
import { Alert, Text, View, Image, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { SliderBox } from 'react-native-image-slider-box';
import Auxiliary from '../../hoc/auxiliary';

class ProductDetail extends Component {
    state = {
        activeImage: null
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
                        circleLoop={true}
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
                    </TouchableOpacity>
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
        activeProduct: state.storeFrontReducer.activeProduct
    };
};

mapDispatchToProps = dispatch => {
    return {
        getProduct: (productId) => dispatch(actions.getProduct(productId)),
        setProductInactive: () => dispatch(actions.setProductInactive()),
        stopSpinner: () => dispatch(actions.uiStopLoading())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);