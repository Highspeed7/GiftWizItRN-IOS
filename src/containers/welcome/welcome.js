import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import { ScrollView, Button, Alert, Text, AsyncStorage, Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import IntroStep1 from '../../components/intro-modal/step-1';
import IntroStep2 from '../../components/intro-modal/step-2';
import IntroStep3 from '../../components/intro-modal/step-3';
import Auxiliary from '../../hoc/auxiliary';
import InfoCard from '../../components/welcome/info-card';

// TODO: Move to another file.
// const config = {
//     issuer: 'https://login.microsoftonline.com/b4d3aec8-2794-4abb-8517-a30636599371/v2.0',
//     clientId: 'b4d3aec8-2794-4abb-8517-a30636599371',
//     redirectUrl: 'giftwi://welcome',
//     // redirectUrl: 'urn:ietf:wg:oauth:2.0:oob',
//     additionalParameters: {},
//     scopes: ["https://giftwizit.onmicrosoft.com/api/read", "https://giftwizit.onmicrosoft.com/api/user_impersonation", "offline_access"],
//     serviceConfiguration: {
//         authorizationEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1',
//         tokenEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_SigninSignup1',
//         revocationEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/logout'
//     }
// }

class Welcome extends Component {
    // authorize = async () => {
    //     let errorMsg = null;
    //     try {
    //         const authState = await authorize(config);
    //     }catch(error) {
    //         errorMsg = error.message || error;
    //         Alert.alert("Failed to login " + error);
    //     }
    // }
    render() {
        renderModal = () => {
            switch(this.props.introStep) {
                case 1:
                    return <IntroStep1 />
                case 2:
                    return <IntroStep2 />
                case 3:
                    return <IntroStep3 />
            }
        }
        return (
            <ScrollView style={styles.scrollContainer}>
                <InfoCard>
                    <Text>Content 1</Text>
                </InfoCard>
                <InfoCard>
                    <Text>Content 2</Text>
                </InfoCard>
                <InfoCard>
                    <Text>Content 3</Text>
                </InfoCard>
                <InfoCard>
                    <Text>Content 4</Text>
                </InfoCard>
                <Modal
                    visible={this.props.introComplete === null}
                >
                    {renderModal()}
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        introStep: state.appReducer.introStep,
        introComplete: state.appReducer.introComplete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClosed: () => dispatch({type: "MODAL_CLOSED"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);