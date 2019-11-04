import React, { Component } from 'react';
import { Alert, ActivityIndicator, Platform, BackHandler, Modal, Text, View, TouchableOpacity, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import WebViewNav from '../web-view-nav/web-view-nav';
import Auxiliary from '../../hoc/auxiliary';
import * as scripts from '../store-selector/scripts/scripts';
import { Overlay } from 'react-native-elements';
import { sleep } from '../../utils/utils';
import Toaster from '../toast-notifications/toaster';

class GWWebView extends Component {
    pageAlertIssued = false;
    state = {
        webRef: null,
        canGoBack: false,
        modalMessage: null,
        showMessageModal: false
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
    navStateChanged = (navState) => {
        this.props.uiStartLoading();
        this.pageAlertIssued = false;
        this.props.canGoBack(navState);
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
                    onNavigationStateChange={this.navStateChanged}
                ></WebView>
                <Overlay
                    height={150}
                    isVisible={this.state.showMessageModal == true}
                    onBackdropPress={() => {}}
                >
                    <View style={{padding: 10, flexDirection: 'column'}}>
                        <View>
                            <Text style={{fontSize: 18}}>{this.state.modalMessage}</Text>
                        </View>
                        <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                            <Button
                                title="OK"
                                onPress={() => this.setState({showMessageModal: false, modalMessage: null})}
                            />
                        </View>
                    </View>
                </Overlay>
                <Toaster />
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
        }else if((JSON.parse(event.nativeEvent.data)).pageMessage != null) {
            if(this.pageAlertIssued == false) {
                var data = JSON.parse(event.nativeEvent.data).pageMessage;
                this.setState({
                    showMessageModal: true,
                    modalMessage: data
                });
                this.pageAlertIssued = true;
            }
            return;
        }else if((JSON.parse(event.nativeEvent.data)).startSpinner != null) {
            this.props.uiStartLoading();
        }else if((JSON.parse(event.nativeEvent.data)).stopSpinner != null) {
            this.props.uiStopLoading();
            sleep(500);
        }
       
        let config = this.props.config;
        let caseHandlers = config.caseHandlers;
        let eventCall = JSON.parse(event.nativeEvent.data).case;
        let payload = JSON.parse(event.nativeEvent.data).payload;

        console.log("Event: " + event.nativeEvent.data + " at: " + new Date());

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

mapDispatchToProps = dispatch => {
    return {
        uiStartLoading: () => dispatch(actions.uiStartLoading()),
        uiStopLoading: () => dispatch(actions.uiStopLoading())
    }
}

export default connect(null, mapDispatchToProps)(GWWebView);