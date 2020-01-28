import React, {Component} from 'react';
import {authorize, revoke} from 'react-native-app-auth';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Alert, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import * as actions from '../../store/actions/index';

import * as actionCreators from '../../store/actions/auth';
import LinearGradient from 'react-native-linear-gradient';

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
            <SafeAreaView style={{flex: 1}}>
                <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{flex: 1}}>
                    <NavigationEvents onWillFocus={this.componentWillFocus} />
                    <Text style={{color: 'white'}}>Login to get started!</Text>
                    {
                        this.props.isAuthenticated === false 
                        ? <Button title="Login" onPress={this.props.onAuth} />
                        : <Button title="Logout" onPress={() => this.props.onRevoke(this.props.accessToken)} />
                    }
                </LinearGradient>
            </SafeAreaView>
        )
    }
    authCheck = async() => {
        // This component should redirect to dashboard if the user is logged in
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
        accessTokenExpiration: state.authReducer.accessTokenExpiration
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);