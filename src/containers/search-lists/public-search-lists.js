import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TextInput, 
    Button
} from 'react-native';

class SearchPublicLists extends Component {
    state = {
        searchTerm: null,
        emailFilter: null
    }
    onPerformSearch = () => {
        let search = {
            searchTerm: this.state.searchTerm,
            userEmail: this.state.emailFilter,
            pager: {
                pageCount: 1,
                pageSize: 10
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
        const availableLists = this.props.searchedPublicLists.map((list) => {
            return (
                <Text>{list.name}</Text>
            )
        });
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text>Search public lists here...</Text>
                    <TextInput placeholder="List Name" onChangeText={this.setSearchTerm} />
                    <Button title="Search" onPress={this.onPerformSearch} />
                </View>
                <ScrollView>
                    {availableLists}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        searchPublicLists: (search) => dispatch(actions.searchPublicLists(search))
    }
}

const mapStateToProps = state => {
    return {
        searchedPublicLists: state.searchListsReducer.searchedPublicLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPublicLists);