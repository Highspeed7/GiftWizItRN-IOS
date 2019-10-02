import React, { Component } from 'react';
import { Alert, ActivityIndicator, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

import WebViewNav from '../web-view-nav/web-view-nav';
import Auxiliary from '../../hoc/auxiliary';
import * as scripts from '../store-selector/scripts/scripts';

class GWWebView extends Component {
    state = {
        webRef: null,
        canGoBack: false
    }
    INJECTED_JAVASCRIPT = null;
    setWebRef = (r) => {
        this.setState({
            webRef: r
        });
        this.props.setRef(r);
        this.INJECTED_JAVASCRIPT = this.props.config["initial_js"];
    }
    onAndroidBackPress = () => {
        if(this.state.canGoBack && this.state.webRef) {
            this.state.webRef.goBack();
            return true
        }
        return false;
    }
    componentDidMount() {
        if(Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
    }
    test = (navState) => {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }
    componentWillUnmount() {
        if(Platform.OS === 'android'){
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }
    webViewError = (event) => {
        Alert.alert("Error from view " + event.nativeEvent.description);
    }
    render() {
        return (
            <Auxiliary>
                {(this.state.webRef != null) ? <WebViewNav onWebClose={this.props.onWebClose} onBack={this.state.webRef.goBack} onForward={this.state.webRef.goForward } /> : null}
                <WebView
                    ref={this.setWebRef}
                    source={this.props.url}
                    injectedJavaScript={this.INJECTED_JAVASCRIPT != null ? this.INJECTED_JAVASCRIPT : null}
                    onMessage={this.onMessageFromView}
                    startInLoadingState={true}
                    renderLoading={() => <ActivityIndicator/>}
                    onError={this.webViewError}
                    onNavigationStateChange={this.props.canGoBack}
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

        if((JSON.parse(event.nativeEvent.data)).debug != null) {
            // Added for debug purposes;
            var data = JSON.parse(event.nativeEvent.data).debug;
            alert((JSON.parse(event.nativeEvent.data)).debug);
            console.log(data);
            return;
        }
       
        let config = this.props.config;
        let caseHandlers = config.caseHandlers;
        let eventCall = JSON.parse(event.nativeEvent.data).case;
        let payload = JSON.parse(event.nativeEvent.data).payload;

        console.log(JSON.parse(event.nativeEvent.data));

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