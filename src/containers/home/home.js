import React, {Component} from 'react';
import { View, Text, Button, ScrollView, ImageBackground, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import storeConfiguration from '../../store/storeConfig';
import InfoCard from '../../components/welcome/info-card';
import Auxiliary from '../../hoc/auxiliary';

import getShoppingBg from '../../../assets/images/get-shopping-bg.png';

const store = storeConfiguration();

class Home extends Component {
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
    render() {
        return (
            <Auxiliary>
                <View style={{padding: 10}}>
                    <Text>Welcome Home!</Text>
                    <Button onPress={() => this.props.onLogout(this.props.token)} title="Logout" />
                </View>
                <ScrollView style={{padding: 10}}>
                    <InfoCard style={{backgroundColor: 'white'}}>
                        <ImageBackground style={{width: '100%', resizeMode: 'contain'}} source={getShoppingBg}>
                            <TouchableOpacity style={styles.infoCard} onPress={this.shopCardPressed}>
                                <Text style={[styles.cardText]}>Get to Shopping!</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard}>
                            <Text style={[styles.cardText, {color: "black"}]}>Gift Ideas</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard} onPress={this.searchCardPressed}>
                            <Text style={[styles.cardText, {color: "black"}]}>Search Lists</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard}>
                            <Text style={[styles.cardText, {color: "black"}]}>Notifications</Text>
                        </TouchableOpacity>
                    </InfoCard>
                </ScrollView>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    infoCard: {
        width: '100%',
        height: '100%'
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
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);