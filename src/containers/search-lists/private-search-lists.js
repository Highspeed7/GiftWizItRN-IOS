import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { 
    View, 
    Text, 
    StyleSheet,
    Alert,
    ScrollView, 
    TextInput, 
    Button,
    TouchableOpacity,
    Modal,
    Keyboard
} from 'react-native';
import {connect} from 'react-redux';

import Swatch from '../../components/swatch/swatch';
import Auxiliary from '../../hoc/auxiliary';
import PrivateSearchItems from '../../components/search/private-search-items';

class SearchPrivateLists extends Component {
    state = {
        searchTerm: null,
        userEmail: null,
        password: null
    }
    setSearchTerm = (value) => {
        this.setState({
            searchTerm: value
        });
    }
    setUserEmail = (value) => {
        this.setState({
            userEmail: value
        });
    }
    setPassword = (value) => {
        this.setState({
            password: value
        });
    }
    onPerformSearch = () => {
        Keyboard.dismiss();
        if(this.state.searchTerm == null) {
            Alert.alert("No search term entered");
            return;
        }
        if(this.state.userEmail == null) {
            Alert.alert("No user email entered");
            return;
        }
        if(this.state.password == null) {
            this.setState({
                password: ""
            });
        }

        let search = {
            searchTerm: this.state.searchTerm,
            userEmail: this.state.userEmail,
            password: this.state.password != null ? this.state.password : "",
            pager: {
                pageCount: 1,
                pageSize: 100
            }
        }

        this.props.searchPrivateLists(search);
    }
    onSearchItemPressed = (key) => {
        // Get the list items
        this.props.setPrivateListItems(key);
        // Set the list item active
        this.props.setPrivateListActive(key);
    }
    closeItemModal = (key) => {
        this.props.setPrivateListInactive(key);
    } 
    storeProductClicked = (productData) => {
        this.props.navigation.navigate("Products", {...productData, startDiscussion: false});
    }
    render() {
        const availableLists = (this.props.searchedPrivateLists.length > 0) 
        ? this.props.searchedPrivateLists.map((list) => (
            <Auxiliary key={list.id}>
                <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.onSearchItemPressed(list.id)}>
                    <Swatch>
                        <Text>{list.name}</Text>
                    </Swatch>
                </TouchableOpacity>
                <Modal
                    visible={list.active != null}
                    onRequestClose={() => this.closeItemModal(list.id)}
                >
                    <PrivateSearchItems
                        activeList={list}
                        storeProductClicked={this.storeProductClicked}
                    />
                </Modal>
            </Auxiliary>
        ))
        : null
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text>Search Private Lists! You will need to provide 
                        the password and the email of the person who created the list for these lists.
                        {"\n\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>NOTE: Feature not yet fully implemented; Coming Soon!</Text>
                    <TextInput style={styles.textInput} placeholder="List Name" onChangeText={this.setSearchTerm} value={this.state.searchTerm} />
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.setUserEmail} value={this.state.userEmail} />
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={this.setPassword} value={this.state.password} />
                    <Button title="Search" onPress={this.onPerformSearch} />
                </View>
                <ScrollView>
                    <View style={styles.listsContainer}>
                        {availableLists}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    listsContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    }
});

mapDispatchToProps = dispatch => {
    return {
        setPrivateListActive: (key) => dispatch(actions.setPrivateListActive(key)),
        setPrivateListInactive: (key) => dispatch(actions.setPrivateListInactive(key)),
        setPrivateListItems: (key) => dispatch(actions.setPrivateListItems(key)),
        clearSearchResults: () => dispatch(actions.clearSearchState()),
        searchPrivateLists: (search) => dispatch(actions.searchPrivateLists(search))
    }
}

mapStateToProps = state => {
    return {
        searchedPrivateLists: state.searchListsReducer.searchedPrivateLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPrivateLists);