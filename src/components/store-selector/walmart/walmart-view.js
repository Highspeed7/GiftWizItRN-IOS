import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class WalmartView extends Component {
    render() {
        return (
            <WebView
                source={this.props.url}
            ></WebView>
        )
    }
}

export default WalmartView;