import React, {Component} from 'react';
import {authorize} from 'react-native-app-auth';
import { View, Button, Alert, Clipboard, AsyncStorage } from 'react-native';

const config = {
    issuer: 'https://login.microsoftonline.com/b4d3aec8-2794-4abb-8517-a30636599371/v2.0',
    clientId: 'b4d3aec8-2794-4abb-8517-a30636599371',
    redirectUrl: 'giftwi://welcome',
    additionalParameters: {},
    scopes: ["https://giftwizit.onmicrosoft.com/api/read", "https://giftwizit.onmicrosoft.com/api/user_impersonation", "offline_access"],
    serviceConfiguration: {
        authorizationEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup1',
        tokenEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/token',
        revocationEndpoint: 'https://login.microsoftonline.com/giftwizit.onmicrosoft.com/oauth2/v2.0/logout'
    }
}

class Welcome extends Component {
    authorize = async () => {
        try {
            const authState = await authorize(config);
            Clipboard.setString(JSON.stringify(authState));
        }catch(error) {
            Alert.alert("Failed to login " + error);
        }
    }
    render() {
        return (
            <View>
                <Button title="Login" onPress={this.authorize}></Button>
            </View>
        )
    }
}

export default Welcome;