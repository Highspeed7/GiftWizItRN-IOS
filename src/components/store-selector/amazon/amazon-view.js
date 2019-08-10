import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { amazonProductView1Script } from '../scripts/scripts';

class AmazonView extends Component {
    INJECTED_JAVASCRIPT = null
    constructor() {
        super();
        this.INJECTED_JAVASCRIPT = amazonProductView1Script;
    }
    render() {
        return (
            <WebView
                source={this.props.url}
                injectedJavaScript={this.INJECTED_JAVASCRIPT}
            ></WebView>
        )
    }
}

export default AmazonView;