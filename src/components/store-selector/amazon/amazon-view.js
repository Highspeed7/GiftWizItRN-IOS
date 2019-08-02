import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class AmazonView extends Component {
    render() {
        return (
            <WebView
                source={this.props.url}
            ></WebView>
        )
    }
}

export default AmazonView;