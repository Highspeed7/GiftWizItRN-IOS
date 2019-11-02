import React, { Component } from 'react';
import { View, Image, StyleSheet, Linking, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Splash extends Component {
    timer;
    componentWillUnmount = () => {
        clearTimeout(this.timer);
    }
    async componentDidMount() {
        try {
            await this.props.getToken();
        }catch(error) {
            console.log(error.message);
        }
        
        var state = await NetInfo.fetch();

        // if(state.type != 'wifi') {
        //     Alert.alert("This app runs best when connected to a wifi network.");
        // }

        await Linking.getInitialURL().then((url) => {
            if(url != null) {
                this.handleOpenURL(url);
            }else {
                // Wait 5 seconds for intro splash
                this.timer = setTimeout(() => {
                    if(this.props.isAuthenticated) {
                        this.props.navigation.navigate("postAuth");
                        // this.props.navigation.navigate("product-detail");
                    }else {
                        this.props.navigation.navigate("preAuth");
                    }
                }, 2000);
            }
        })
    }

    componentWillUnmount() {

    }

    handleOpenURL(url) {
        let path = url.split('://')[1];
        path = path.replace("/", "");
        
        this.props.navigation.navigate(path);
      }

    render() {
        return (
            <View style={styles.splashContainer}>
                <Image style={styles.splashImage} source={{uri: "https://giftwizit.com/assets/images/gw_logo2.png"}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashImage: {
        height: '75%',
        width: '75%',
        resizeMode: 'contain',
        left: -5
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(actions.getAuthToken())
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);