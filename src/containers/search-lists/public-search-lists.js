import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

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
    Dimensions
} from 'react-native';

import Swatch from '../../components/swatch/swatch';
import Auxiliary from '../../hoc/auxiliary';
import PublicSearchItems from '../../components/search/public-search-items';

class SearchPublicLists extends Component {
    state = {
        searchTerm: null,
        emailFilter: null
    }
    screenWillBlur = (e) => {
        this.setState({
            searchTerm: null,
            emailFilter: null
        });
        this.props.clearSearchResults();
    }
    onPerformSearch = () => {
        if(this.state.searchTerm == null) {
            Alert.alert("Please enter a search term.");
            return false;
        }
        let search = {
            searchTerm: this.state.searchTerm,
            userEmail: this.state.emailFilter,
            pager: {
                pageCount: 1,
                pageSize: 100
            }
        }

        this.props.searchPublicLists(search);
    }
    setSearchTerm = (val) => {
        this.setState({
            searchTerm: val
        });
    }
    setEmailFilter = (val) => {
        this.setState({
            emailFilter: val
        });
    }
    onSearchItemPressed = (key) => {
        // Get the list items
        this.props.setPublicListItems(key);
        // Set the list item active
        this.props.setPublicListActive(key);
    }
    closeItemModal = (key) => {
        this.props.setPublicListInactive(key);
    } 
    storeProductClicked = (productData) => {
        this.props.navigation.navigate("Products", {...productData, startDiscussion: false});
    }
    render() {
        const availableLists = (this.props.searchedPublicLists.length > 0) 
            ? this.props.searchedPublicLists.map((list) => (
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
                        <PublicSearchItems
                            activeList={list}
                            storeProductClicked={this.storeProductClicked}
                        />
                    </Modal>
                </Auxiliary>
            ))
            : null
        return (
            <View style={styles.viewContainer}>
                <NavigationEvents onWillBlur={this.screenWillBlur} />
                <View>
                    <Text>Search public lists here...</Text>
                    <TextInput placeholder="List Name" onChangeText={this.setSearchTerm} value={this.state.searchTerm} />
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

const mapDispatchToProps = dispatch => {
    return {
        setPublicListItems: (key) => dispatch(actions.setPublicListItems(key)),
        setPublicListInactive: (key) => dispatch(actions.setPublicListInactive(key)),
        setPublicListActive: (key) => dispatch(actions.setPublicListActive(key)),
        clearSearchResults: () => dispatch(actions.clearSearchState()),
        searchPublicLists: (search) => dispatch(actions.searchPublicLists(search))
    }
}

const mapStateToProps = state => {
    return {
        searchedPublicLists: state.searchListsReducer.searchedPublicLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublicLists);