import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import ProductImgr from './product-imgr';

class ProductDetail extends Component {
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
    render() {
        // Stop loading spinner
        if(this.props.activeProduct != null) {
            this.props.stopSpinner();
        }
        return (
            <View>
                <NavigationEvents onDidFocus={this.didFocus} onWillBlur={this.willBlur} />
                {
                    this.props.activeProduct != null 
                        ? 
                        <Text>{this.props.activeProduct.title}</Text>
                        : null
                }
            </View>
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