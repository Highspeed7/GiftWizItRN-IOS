import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

import * as actions from '../../store/actions/index';
import SharedListView from '../../components/shared-list-view/shared-list-view';
import LinearGradient from 'react-native-linear-gradient';

class OtherLists extends Component {
    activeList = null;
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            if(this.props.sharedByLists != null && this.props.sharedByLists.length == 0) {
                this.props.getUserSharedByLists();
            }
        });
    }
    onListPressed = (listId) => {
        this.props.setListItems(listId);
        this.props.setUserSharedListActive(listId);
    }
    onListItemPressed = (item) => {
        let itemId = item.item_Id;
        let key = activeList.giftListId;
        this.props.setUserSharedListItemActive(key, itemId);
    }
    navigateToStoreProduct = (item) => {
        if(item.afflt_Link == null) {
            const productData = JSON.parse(item.product_Id);
            this.props.setUserSharedListInactive(activeList.giftListId);
            this.props.navigation.navigate("Products", {...productData, startDiscussion: true});
            return;
        }
    }
    onListItemClosed = (itemId) => {
        let key = activeList.giftListId;
        this.props.setUserSharedListItemInactive(key, itemId);
    }
    onListModalClosed = (listId) => {
        this.props.setUserSharedListInactive(listId);
        
    }
    render() {

        activeList = (this.props.sharedByLists != null && this.props.sharedByLists.length > 0) 
        ? this.props.sharedByLists.filter((list) => {
            return list.active != null
        })[0]
        : null;

        const lists = (this.props.sharedByLists != null && this.props.sharedByLists.length > 0) 
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
                            onListModalClosed={() => this.onListModalClosed(list.giftListId)}
                            list={list}
                            onStoreProductClicked={this.navigateToStoreProduct}
                            itemSelected={this.onListItemPressed}
                            itemClosed={this.onListItemClosed}
                        />
                    </Modal>
                </TouchableOpacity>
            ))
            : null
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.viewContainer}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Lists Shared with you...</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollView}>
                    {lists}
                </ScrollView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        flex: 1
    },
    scrollView: {
        marginBottom: 40
    }
});

const mapDispatchToProps = dispatch => {
    return {
        getUserSharedByLists: () => dispatch(actions.getUserSharedByLists()),
        setUserSharedListActive: (key) => dispatch(actions.setUserSharedListActive(key)),
        setUserSharedListInactive: (key) => dispatch(actions.setUserSharedListInactive(key)),
        setUserSharedListItemActive: (key, itemId) => dispatch(actions.setUserSharedListItemActive(key, itemId)),
        setUserSharedListItemInactive: (key, itemId) => dispatch(actions.setUserSharedListItemInactive(key, itemId)),
        setListItems: (key) => dispatch(actions.setUserSharedListItems(key))
    }
}

const mapStateToProps = state => {
    return {
        sharedByLists: state.sharedListsReducer.sharedByLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherLists);