import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity,
    Image, 
    Alert, 
    Picker, 
    Button,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Swatch from '../swatch/swatch';
import ShareGiftList from './share-modal/gift-list-share';
import ListAction from '../list-actions/list-action';
import Auxiliary from '../../hoc/auxiliary';
import GiftListEdit from './edit-modal/gift-list-edit';
import * as actions from '../../store/actions/index';
import { goclone } from '../../utils/utils';
import ListChat from '../list-chat/list-chat';
import { Badge } from 'react-native-elements';

class GiftListDetail extends Component {
    state = {
        moveMode: null,
        deleteMode: null,
        selectedItems: [],
        selectedGiftListId: null,
        seletedGiftListName: null,
        editModalOpen: null,
        shareListModalOpen: null,
        chatModalActive: null
    }
    componentDidMount = async () => {
        if(this.props.list.restrictChat == false) {
            await this.props.connectToListChatChannel(this.props.list.id);
            await this.props.getListMessageCount(this.props.list.id);
        }
    }
    componentWillUnmount = () => {
        if(this.props.list.restrictChat == false) {
            this.props.disconnectFromListChatChannel(this.props.list.id);
        }
    }
    setChatModalActive = () => {
        this.setState({
            chatModalActive: true
        });
    }
    setChatModalInactive = async () => {
        this.props.clearChatMessages();
        this.setState({
            chatModalActive: null
        });
        
        // Update the message count after chat is closed
        await this.props.getListMessageCount(this.props.list.id);
    }
    setMoveMode = async () => {
        if(this.props.editableSharedLists.length == 0) {
            await this.props.getEditableLists();
        }

        this.setState({
            moveMode: true,
            deleteMode: null
        });
    }
    setDeleteMode = () => {
        this.setState({
            moveMode: null,
            deleteMode: true
        });
    }
    cancelActions = () => {
        const nowSelectedArr = [];
        this.setState({
            moveMode: null,
            deleteMode: null,
            selectedItems: nowSelectedArr
        });
    }
    onGListSelected = (glistId, position) => {
        // Get the list name from gift lists
        var selectedList = goclone(this.props.giftLists.find((list) => {
            return list.id == glistId
        }));

        if(selectedList == null) {
            selectedList = goclone(this.props.editableSharedLists.find((list) => {
                return list.id == glistId
            }));
        }

        this.setState({
            selectedGiftListId: glistId,
            selectedGiftListName: selectedList.name
        });
    }
    itemSwatchPressed = (itemId) => {
        if(this.state.moveMode == null && this.state.deleteMode == null) {
            return;
        }
        if(this.isItemSelected(itemId)) {
            this.setState((prevState, props) => {
                const nowSelectedArr = prevState.selectedItems.filter((item) => item != itemId);
                return {
                    selectedItems: nowSelectedArr
                }
            })
        }else {
            this.setState((prevState, props) => {
                return {
                    selectedItems: prevState.selectedItems.concat(itemId)
                }
            });
        }
    }
    confirmItemsMove = async() => {
        if(this.state.selectedItems.length == 0) {
            Alert.alert("Please select an item to move first.");
            return;
        }

        // Create the required object
        let movedItemsArr = [];
        let movedItemObj = {};

        if(this.state.selectedGiftListId == null) {
            if(this.props.giftLists.length > 0) {
                // Set the selectedGiftListId and name to the first gift list
                this.setState((prevState, props) => {
                    return {
                        selectedGiftListId: props.giftLists[0].id,
                        selectedGiftListName: props.giftLists[0].name
                    }
                }, () => {
                    this.state.selectedItems.forEach((item) => {
                        movedItemObj["g_List_Id"] = this.props.list.id;
                        movedItemObj["item_Id"] = item;
                        movedItemObj["to_Glist_Id"] = this.state.selectedGiftListId
            
                        movedItemsArr.push(goclone(movedItemObj));
                    })
                    this.cancelActions();
                    console.log(movedItemsArr);
                    this.props.moveGiftListItems(movedItemsArr);
                });
            }else {
                // TODO: Move alerts to toasters.
                Alert.alert("There are no gift lists currently; create some to move items to them.")
                this.cancelActions();
            }
        }else {
            this.state.selectedItems.forEach((item) => {
                movedItemObj["g_List_Id"] = this.props.list.id;
                movedItemObj["item_Id"] = item;
                movedItemObj["to_Glist_Id"] = this.state.selectedGiftListId;
    
                movedItemsArr.push(goclone(movedItemObj));
            })
            this.cancelActions();
            console.log(movedItemsArr);
            this.props.moveGiftListItems(movedItemsArr);
        }
    }
    isItemSelected = (itemId) => {
        return this.state.selectedItems.indexOf(itemId) != -1;
    }
    editActionPressed = () => {
        this.setState({
            editModalOpen: true
        });
    }
    closeEditModal = () => {
        this.setState({
            editModalOpen: null
        });
    }
    shareListPressed = async () => {
        this.setState({
            shareListModalOpen: true
        });
    }
    closeShareListModal = () => {
        this.setState({
            shareListModalOpen: null
        });
    }
    confirmItemsDelete = () => {
        let deletedItemsArr = [];
        let deletedItemObj = {};

        this.state.selectedItems.forEach((item) => {
            deletedItemObj["item_Id"] = item;
            deletedItemObj["gift_List_Id"] = this.props.list.id;
            deletedItemsArr.push(goclone(deletedItemObj));
        });
        this.cancelActions();
        this.props.deleteItemsFromList(deletedItemsArr);
    }
    render(){
        const giftItems = (this.props.list.itemsData != null && this.props.list.itemsData.length > 0) 
            ? this.props.list.itemsData.map((item) => (
                <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch} onPress={() => this.itemSwatchPressed(item.item_Id)}>
                    <Swatch>
                        <Image style={styles.itemImage} source={{uri: item.image}} />
                        {(this.isItemSelected(item.item_Id)) 
                        ? <View style={styles.swatchSelectedContainer}>
                                <FontAwesome5 
                                    style={styles.swatchSelectedIcon}
                                    name="check"
                                    color="white"
                                    size={25}
                                />
                            </View>
                        : null    
                    }
                    </Swatch>
                </TouchableOpacity>
            ))
            : null
        const sharedGiftLists = (this.props.editableSharedLists.length > 0 && this.state.moveMode)
            ? this.props.editableSharedLists.map((glist) => (
                <Picker.Item
                    key={glist.id}
                    label={glist.name}
                    value={glist.id}
                />
            ))
            : null
        const giftLists = (this.props.giftLists.length > 0 && this.state.moveMode)
            ? this.props.giftLists.map((glist) => (
                <Picker.Item
                    key={glist.id}
                    label={glist.name}
                    value={glist.id}
                />
            ))
            : null
        return (
            <Auxiliary>
                <View style={{padding: 10}}>
                    <Text>{this.props.list.name}</Text>
                    <ScrollView 
                        keyboardShouldPersistTaps="always"
                        horizontal={true} style={{width: '100%'}}>
                        {(this.state.moveMode == null)
                            ? <ListAction
                                    title="Move"
                                    icon={() => (<FontAwesome5
                                        name="dolly"
                                        color="black"
                                        size={25}
                                    />)}
                                    onPressed={() => this.setMoveMode()}
                                >
                                </ListAction>
                            : <ListAction
                                title="Cancel"
                                icon={() => (<FontAwesome5
                                    name="times"
                                    color="black"
                                    size={25}    
                                />)}
                                onPressed={() => this.cancelActions()}
                            ></ListAction>
                        }
                        {(this.props.list.restrictChat == false)
                            ? <ListAction
                                    title="Messages"
                                    icon={() => (<FontAwesome5
                                        name={'comment-alt'} solid
                                        color="black"
                                        size={25}
                                    />)}
                                    onPressed={() => this.setChatModalActive()}
                                >
                                    <Modal
                                        visible={this.state.chatModalActive != null}
                                        onRequestClose={() => this.setChatModalInactive()}
                                    >
                                        <ListChat
                                            listTitle={this.props.list.name} 
                                            activeList={this.props.list}
                                        />
                                    </Modal>
                                    <Badge
                                        value={this.props.sessionListMessageCount}
                                        containerStyle={{position: 'absolute', top: 20, left: '53%'}}
                                    />
                                </ListAction>
                            : null
                        }
                        <ListAction
                            title="Share"
                            icon={() => (<FontAwesome5
                                name="share"
                                color="black"
                                size={25}    
                            />)}
                            onPressed = {this.shareListPressed}
                        >
                            <Modal
                                visible={this.state.shareListModalOpen != null}
                                onRequestClose={() => this.closeShareListModal()}
                            >
                                <ShareGiftList activeList={this.props.list} />
                            </Modal>
                        </ListAction>
                        <ListAction
                            title="Edit"
                            icon={() => (<FontAwesome5
                                name="edit"
                                color="black"
                                size={23}    
                            />)}
                            onPressed={() => this.editActionPressed()}
                        >
                        <Modal
                            visible={this.state.editModalOpen != null}
                            onRequestClose={this.closeEditModal}
                        >
                            <GiftListEdit activeList={this.props.list} onListChanged={() => this.setState({editModalOpen: null})} />                           
                        </Modal>
                        </ListAction>
                        {(this.state.deleteMode == null)
                            ? <ListAction
                                title="Delete"
                                icon={() => (<FontAwesome5
                                    name="trash"
                                    color="black"
                                    size={25}    
                                />)}
                                onPressed={() => this.setDeleteMode()}
                            >
                            </ListAction>
                            : <ListAction
                                title="Cancel"
                                icon={() => (<FontAwesome5
                                    name="times"
                                    color="black"
                                    size={25}    
                                />)}
                                onPressed={() => this.cancelActions()}
                            ></ListAction>
                        }
                    </ScrollView>
                    {(this.state.moveMode != null)
                        ? <View style={{padding: 10}}>
                            <Picker
                                selectedValue={this.state.selectedGiftListId}
                                onValueChange={this.onGListSelected}
                                mode="dropdown"
                                >{giftLists}
                                {sharedGiftLists}
                            </Picker>
                            <Button title="Move" onPress={this.confirmItemsMove} />
                        </View>
                        : null
                    }
                    {(this.state.selectedItems.length > 0 && this.state.deleteMode == true)
                        ? <View>
                            <Text>Are you sure you want to remove the selected items?</Text>
                            <Button title="Yes" onPress={this.confirmItemsDelete} />
                            <Button title="No" onPress={this.cancelActions} />
                        </View>
                        : null
                    }
                    {(this.state.deleteMode || this.state.moveMode) 
                        ? <Text style={{fontSize: 20}}>You may select multiple items...</Text> 
                        : null
                    }
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listsContainer}>
                        {giftItems}
                    </View>
                </ScrollView>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    swatchSelectedIcon: {
        position: 'absolute',
        alignSelf: 'center'
    },
    swatchSelectedContainer: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        width: '100%',
        top: 4,
        justifyContent: 'center'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        connectToListChatChannel: (list_id) => dispatch(actions.connectToListChat(list_id)),
        disconnectFromListChatChannel: (list_id) => dispatch(actions.disconnectFromListChat(list_id)),
        clearChatMessages: () => dispatch(actions.clearChatMessages()),
        moveGiftListItems: (itemData) => dispatch(actions.moveGiftListItems(itemData)),
        getEditableLists: () => dispatch(actions.getEditableSharedLists()),
        deleteItemsFromList: (itemData) => dispatch(actions.deleteGiftItems(itemData)),
        getListMessageCount: (list_id) => dispatch(actions.getListMessageCount(list_id))
    }
};

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists,
        editableSharedLists: state.wishListReducer.editableSharedLists,
        sessionListMessageCount: state.giftListsReducer.sessionListMessageCount
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftListDetail);