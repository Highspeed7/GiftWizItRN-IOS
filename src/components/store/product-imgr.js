import React, { Component } from 'react'
import { Text, Image } from 'react-native';

class ProductImgr extends Component {
    render() {
        const product = this.props.product
        return (
            <Text>{product.title}</Text>
        )
    }
}

export default ProductImgr;