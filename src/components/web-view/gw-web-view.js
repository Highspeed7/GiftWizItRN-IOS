import React, { Component } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

import WebViewNav from '../web-view-nav/web-view-nav';
import Auxiliary from '../../hoc/auxiliary';

class GWWebView extends Component {
    state = {
        webRef: null
    }
    INJECTED_JAVASCRIPT = null;
    setWebRef = (r) => {
        this.setState({
            webRef: r
        });

        this.INJECTED_JAVASCRIPT = this.props.javascript
    }
    render() {
        return (
            <Auxiliary>
                {(this.state.webRef != null) ? <WebViewNav onBack={this.state.webRef.goBack} onForward={this.state.webRef.goForward } /> : null}
                <WebView
                    ref={this.setWebRef}
                    source={this.props.url}
                    injectedJavaScript={this.INJECTED_JAVASCRIPT}
                ></WebView>
            </Auxiliary>
        )
    }
}

export default GWWebView;