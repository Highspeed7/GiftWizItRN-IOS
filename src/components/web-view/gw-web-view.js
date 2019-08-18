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

        this.INJECTED_JAVASCRIPT = this.props.config["initial_js"];
    }
    render() {
        return (
            <Auxiliary>
                {(this.state.webRef != null) ? <WebViewNav onBack={this.state.webRef.goBack} onForward={this.state.webRef.goForward } /> : null}
                <WebView
                    ref={this.setWebRef}
                    source={this.props.url}
                    injectedJavaScript={this.INJECTED_JAVASCRIPT}
                    onMessage={this.onMessageFromView}
                ></WebView>
            </Auxiliary>
        )
    }
    onMessageFromView = (event) => {

        /* Config should be defined as such
        congif {
            caseHandlers: [
                {
                    case: string,
                    handler: func()
                }
            ],
            initial_js: func()
        }
        */
       
        let config = this.props.config;
        let caseHandlers = config.caseHandlers;
        let eventCall = JSON.parse(event.nativeEvent.data).case;
        let payload = JSON.parse(event.nativeEvent.data).payload;

        try {
            caseHandlers.forEach((viewCase) => {
                if(eventCall == viewCase.case) {
                    viewCase.handler(payload);
                }
            })
        }
        catch(e) {
            // Do nothing
            console.log(e);
        }
    }
}

export default GWWebView;