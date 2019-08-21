import React, {Component} from 'react';
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import storeConfiguration from '../../store/storeConfig';
import InfoCard from '../../components/welcome/info-card';
import Auxiliary from '../../hoc/auxiliary';

const store = storeConfiguration();

class Home extends Component {
    componentDidUpdate() {
        console.log("component updated");
        if(!this.props.isAuthenticated) {
            this.props.navigation.navigate("preAuth");
        }
    }
    shopCardPressed = () => {
        this.props.navigation.navigate("WishList", {
            storeSelectorOpen: true
        });
    }
    render() {
        return (
            <Auxiliary>
                <View style={{padding: 10}}>
                    <Text>Welcome Home!</Text>
                    <Button onPress={() => this.props.onLogout(this.props.token)} title="Logout" />
                </View>
                <ScrollView style={{padding: 10}}>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard} onPress={this.shopCardPressed}>
                            <Text>Get to Shopping!</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard}>
                            <Text>Gift Ideas</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard}>
                            <Text>Search Lists</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard}>
                            <Text>Notifications</Text>
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