import React, {Component} from 'react';
import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../../store/actions/index';
import storeConfiguration from '../../store/storeConfig';

const store = storeConfiguration();

class Home extends Component {
    componentDidMount() {
        this.props.getLists();
    }
    componentDidUpdate() {
        console.log("component updated");
        if(!this.props.isAuthenticated) {
            this.props.navigation.navigate("preAuth");
        }
    }
    render() {
        const giftLists = (this.props.giftLists !== null)
            ? <ScrollView>
                <FlatList 
                    horizontal={false}
                    data={this.props.giftLists}
                    renderItem={(list) => (
                        <View style={{flexDirection: 'column'}}>
                            <Text>{list.item.name}</Text>
                        </View>
                    )}
                />    
            </ScrollView>
            : <Text>There are no lists yet...</Text>
        return (
            <View>
                <Text>Welcome Home!</Text>
                <Text>Here are your gift lists!</Text>
                {giftLists}
                <Button onPress={() => this.props.onLogout(this.props.token)} title="Logout" />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        giftLists: state.testReducer.giftLists,
        token: state.authReducer.accessToken,
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (tokenToRevoke) => dispatch(actions.logOut(tokenToRevoke)),
        getLists: () => dispatch(actions.setGiftLists())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);