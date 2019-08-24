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
    TouchableOpacity
} from 'react-native';

import Swatch from '../../components/swatch/swatch';

class SearchPublicLists extends Component {
    state = {
        searchTerm: null,
        emailFilter: null
    }
    screenWillBlur = (e) => {
        this.setState({
            searchTerm: null,
            searchFilter: null
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
    render() {
        const availableLists = (this.props.searchedPublicLists.length > 0) 
            ? this.props.searchedPublicLists.map((list) => (
                    <TouchableOpacity key={list.id} style={styles.touchableSwatch}>
                        <Swatch>
                            <Text>{list.name}</Text>
                        </Swatch>
                    </TouchableOpacity>
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