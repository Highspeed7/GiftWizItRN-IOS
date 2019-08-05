import React, { Component } from 'react'
import { WebView } from 'react-native-webview';

class ProductWebView extends Component {
    render() {
        return (
            <WebView source={this.props.source} />
        )
    }
}

export default ProductWebView;