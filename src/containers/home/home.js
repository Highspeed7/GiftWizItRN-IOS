import React, {Component} from 'react';
import { 
    View, 
    Text, 
    Button, 
    ScrollView, 
    ImageBackground, 
    FlatList, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import GiftIdeasCard from '../../components/info-content/gift-ideas-card/gift-ideas-card';
import storeConfiguration from '../../store/storeConfig';
import InfoCard from '../../components/welcome/info-card';
import Auxiliary from '../../hoc/auxiliary';

import getShoppingBg from '../../../assets/images/get-shopping-bg.png';
import NextHolidayCard from '../../components/info-content/next-holiday-card/next-holiday-card';

const store = storeConfiguration();

class Home extends Component {
     timer = null;

    componentDidMount = () => {
        this.props.setNotificationsCount();
        this.props.beginNotifications();
    }
    componentWillFocus = () => {
        if(!this.props.isAuthenticated) {
            this.props.navigation.navigate("preAuth");
        }
    }
    componentDidUpdate() {
        if(!this.props.isAuthenticated) {
            this.props.navigation.navigate("preAuth");
        }
    }
    shopCardPressed = () => {
        this.props.navigation.navigate("WishList", {
            storeSelectorOpen: true
        });
    }
    searchCardPressed = () => {
        this.props.navigation.navigate("SearchLists");
    }
    logOut = () => {
        clearInterval(this.timer);
        this.props.onLogout(this.props.token);
    }
    render() {
        return (
            <Auxiliary>
                <NavigationEvents onWillFocus={this.componentWillFocus} />
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{padding: 10}}>
                    <Text style={{color: 'white'}}>
                        {(this.props.userData != null) 
                            ? `Welcome ${this.props.userData.username}`
                            : `Welcome guest!`
                        }
                    </Text>
                    <Button onPress={this.logOut} title="Logout" />
                </LinearGradient>
                <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{flex: 1}}>
                    <ScrollView style={styles.contentContainer}>
                        <InfoCard style={{backgroundColor: 'white', borderWidth: 2,  borderColor: 'red', width: '100%'}}>
                            <ImageBackground style={{width: '100%', resizeMode: 'contain'}} source={getShoppingBg}>
                                <TouchableOpacity style={styles.infoCard} onPress={this.shopCardPressed}>
                                    <Text style={[styles.cardText]}>Get to Shopping!</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </InfoCard>
                        <InfoCard>
                            <NextHolidayCard />
                        </InfoCard>
                        <InfoCard>
                            <LinearGradient colors={['#ffffff', '#00ffff']} style={{flex: 1, height: 100, width: '100%'}}>
                                <GiftIdeasCard authed={true} />
                            </LinearGradient>
                        </InfoCard>
                        <InfoCard>
                            <TouchableOpacity style={styles.infoCard} onPress={this.searchCardPressed}>
                                <Text style={[styles.cardText, {color: "black"}]}>Search Lists</Text>
                            </TouchableOpacity>
                        </InfoCard>
                        <View style={{height: 40, width: '100%'}}></View>
                    </ScrollView>
                </LinearGradient>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer:{
        flex: 1
    },
    infoCard: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(192,192,192,0.4)',
        padding: 10
    },
    cardText: {
        color: 'black',
        fontFamily: 'Graciela-Regular',
        fontSize: 22
    }
});

const mapStateToProps = state => {
    return {
        token: state.authReducer.accessToken,
        expiry: state.authReducer.accessTokenExpiration,
        isAuthenticated: state.authReducer.isAuthenticated,
        userData: state.authReducer.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        beginNotifications: () => dispatch(actions.beginNotifications()),
        onLogout: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke)),
        setNotificationsCount: () => dispatch(actions.setNotificationsCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);