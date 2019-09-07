import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

import * as actions from '../../store/actions/index';
import SharedListView from '../../components/shared-list-view/shared-list-view';

class OtherLists extends Component {
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            if(this.props.sharedByLists.length == 0) {
                this.props.getUserSharedByLists();
            }
        });
    }
    onListPressed = (listId) => {
        this.props.setUserSharedListActive(listId);
    }
    onListModalClosed = (listId) => {
        this.props.setUserSharedListInactive(listId);
    }
    render() {
        const lists = (this.props.sharedByLists.length > 0) 
            ? this.props.sharedByLists.map((list) => (
                <TouchableOpacity key={list.giftListId} onPress={() => this.onListPressed(list.giftListId)}>
                    <Card>
                        <Text style={{fontWeight: 'bold'}}>{list.giftListName}</Text><Text>shared by: {list.fromUser}</Text>
                    </Card>
                    <Modal
                        visible={list.active != null}
                        onRequestClose={() => this.onListModalClosed(list.giftListId)}
                    >
                        <SharedListView 
                            list={list}
                        />
                    </Modal>
                </TouchableOpacity>
            ))
            : null
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>Lists Shared with you...</Text>
                </View>
                <ScrollView>
                    {lists}
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
        getUserSharedByLists: () => dispatch(actions.getUserSharedByLists()),
        setUserSharedListActive: (key) => dispatch(actions.setUserSharedListActive(key)),
        setUserSharedListInactive: (key) => dispatch(actions.setUserSharedListInactive(key))
    }
}

const mapStateToProps = state => {
    return {
        sharedByLists: state.sharedListsReducer.sharedByLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherLists);