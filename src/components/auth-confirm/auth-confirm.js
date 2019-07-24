import React, {Component} from 'react';
import { View, Text, Clipboard } from 'react-native';

class AuthConfirm extends Component {
    componentDidMount() {
        Clipboard.setString(this.props.navigation.getParam("code"));
    }
    render() {
        return (
            <View>
                <Text>Auth Confirmed: {this.props.navigation.getParam("code")} </Text>
            </View>
        )
    }
}
export default AuthConfirm;