import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class TargetView extends Component {
    render() {
        return (
            <WebView
                source={this.props.url}
            ></WebView>
        )
    }
}

export default TargetView;