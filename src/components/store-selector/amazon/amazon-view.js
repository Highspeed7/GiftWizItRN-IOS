import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { amazonProductView1Script } from '../scripts/scripts';
import Auxiliary from '../../../hoc/auxiliary';
import WebViewNav from '../../web-view-nav/web-view-nav';

class AmazonView extends Component {
    INJECTED_JAVASCRIPT = null
    constructor() {
        super();
        this.INJECTED_JAVASCRIPT = amazonProductView1Script;
    }
    state = {
        webRef: null
    }
    setWebRef = (r) => {
        this.setState({
            webRef: r
        });
    }
    render() {
        webRef = null;
        return (
            <Auxiliary>
                {(this.state.webRef != null) ? <WebViewNav onBack={this.state.webRef.goBack} onForward={this.state.webRef.goForward } /> : null}
                <WebView
                    ref={this.setWebRef}
                    source={this.props.url}
                    injectedJavaScript={this.INJECTED_JAVASCRIPT}
                    onMessage={(event) => this.onMessageFromView(event)}
                ></WebView>
            </Auxiliary>
        )
    }
    onMessageFromView = (event) => {
        console.log(event.nativeEvent.data);
        try {
            this.props.onItemAdded(JSON.parse(event.nativeEvent.data));
        }
        catch(e) {
            // Do nothing
            console.log(e);
        }
    }
}

export default AmazonView;