import React, { Component } from 'react';

import * as scripts from '../scripts/walmartScripts';
import GWWebView from '../../web-view/gw-web-view';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

class WalmartView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: scripts.walmartProductViewScript
        }
        return (
            // <WebView
            //     userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
            //     source={this.props.url}
            // ></WebView>
            <GWWebView
                setRef={this.props.setRef}
                canGoBack={this.props.canGoBack}
                config={config}
                url={this.props.url}
                onWebClose={this.props.onWebClose}
            ></GWWebView>
        )
    }
}

export default WalmartView;