import React, {Component} from 'react';
import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import storeConfiguration from '../../store/storeConfig';

const store = storeConfiguration();

class Home extends Component {
    componentDidUpdate() {
        console.log("component updated");
        if(!this.props.isAuthenticated) {
            this.props.navigation.navigate("preAuth");
        }
    }
    render() {
        return (
            <View>
                <Text>Welcome Home!</Text>
                <Button onPress={() => this.props.onLogout(this.props.token)} title="Logout" />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.accessToken,
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);