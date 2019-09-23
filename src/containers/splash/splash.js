import React, { Component } from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Splash extends Component {
    async componentDidMount() {
        try {
            await this.props.getToken();
        }catch(error) {
            console.log(error.message);
        }
        
        await Linking.getInitialURL().then((url) => {
            if(url != null) {
                this.handleOpenURL(url);
            }else {
                // Wait 5 seconds for intro splash
                setTimeout(() => {
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