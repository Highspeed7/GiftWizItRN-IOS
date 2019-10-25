import React, {Component} from 'react';
import {authorize, revoke} from 'react-native-app-auth';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Alert, Button, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import * as actions from '../../store/actions/index';

import * as actionCreators from '../../store/actions/auth';

class GetStarted extends Component {
    componentDidMount = () => {
        this.authCheck();
    }
    componentDidUpdate = (prevProps, prevState) => {
        this.authCheck();
    }
    componentWillFocus = () => {
        console.log(this.props.navigation.getParam());
    }
    registerUser = async() => {
        await this.props.registerUser();
        return;
    }
    render() {
        return (
            <View>
                <NavigationEvents onWillFocus={this.componentWillFocus} />
                <Text>Get Started!</Text>
                {
                    this.props.authInProgress === true 
                    ? <ActivityIndicator />
                    : null
                }
                {
                    this.props.isAuthenticated === false 
                    ? <Button title="Login" onPress={this.props.onAuth} />
                    : <Button title="Logout" onPress={() => this.props.onRevoke(this.props.accessToken)} />
                }
            </View>
        )
    }
    authCheck = async() => {
        // This component should redirect to dashboard if the user is logged in
        console.log("NIGGER");
        if(this.props.isAuthenticated) {
            await this.registerUser();
            this.props.navigation.navigate("postAuth");
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // setAuthState: (value) => dispatch(actionCreators.set_auth(value))
        onAuth: () => dispatch(actions.auth()),
        onRevoke: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke)),
        registerUser: () => dispatch(actions.registerUser())
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        accessToken: state.authReducer.accessToken,
        accessTokenExpiration: state.authReducer.accessTokenExpiration,
        authInProgress: state.authReducer.authInProgress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);