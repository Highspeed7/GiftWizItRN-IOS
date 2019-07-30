import React, {Component} from 'react';
import {authorize, revoke} from 'react-native-app-auth';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Button } from 'react-native';

import * as actions from '../../store/actions/index';

import * as actionCreators from '../../store/actions/auth';

class GetStarted extends Component {
    componentDidMount() {
        // // Check AsyncStorage for token and validate expiry.
        // var authObj = await AsyncStorage.getItem("auth_data")
        // if(authObj !== null) {
            
        // }
    }
    render() {
        return (
            <View>
                <Text>Get Started!</Text>
                <Text>{'\n' + this.props.accessToken + '\n' + this.props.accessTokenExpiration}</Text>
                {
                    this.props.isAuthenticated === false 
                    ? <Button title="Login" onPress={this.props.onAuth} />
                    : <Button title="Logout" onPress={() => this.props.onRevoke(this.props.accessToken)} />
                }
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // setAuthState: (value) => dispatch(actionCreators.set_auth(value))
        onAuth: () => dispatch(actions.auth()),
        onRevoke: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke))
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        accessToken: state.authReducer.accessToken,
        accessTokenExpiration: state.authReducer.accessTokenExpiration
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);