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
import ListAction from '../list-actions/list-action';
import Auxiliary from '../../hoc/auxiliary';
import GiftListEdit from './edit-modal/gift-list-edit';
import * as actions from '../../store/actions/index';
import { goclone } from '../../utils/utils';

class GiftListDetail extends Component {
    state = {
        moveMode: null,
        deleteMode: null,
        selectedItems: [],
        selectedGiftListId: null,
        seletedGiftListName: null,
        editModalOpen: null
    }
    setMoveMode = () => {
        this.setState({
            moveMode: true,
            deleteMode: null
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
        const selectedList = goclone(this.props.giftLists.find((list) => {
            return list.id == glistId
        }));

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
                    <View style={{flexDirection: 'row'}}>
                        <ListAction
                            icon={() => (<FontAwesome5
                                name="dolly"
                                color="black"
                                size={25}
                            />)}
                            onPressed={() => this.setMoveMode()}
                        >
                        </ListAction>
                        <ListAction
                            icon={() => (<FontAwesome5
                                name="edit"
                                color="black"
                                size={25}    
                            />)}
                            onPressed={() => this.editActionPressed()}
                        >
                        <Modal
                            visible={this.state.editModalOpen != null}
                            onRequestClose={this.closeEditModal}
                        >
                            <GiftListEdit activeList={this.props.list} />                           
                        </Modal>
                        </ListAction>
                        <ListAction
                            icon={() => (<FontAwesome5
                                name="trash"
                                color="black"
                                size={25}    
                            />)}
                            onPressed={() => Alert.alert("Delete list pressed")}
                        >
                        </ListAction>
                        {(this.state.moveMode != null || this.state.deleteMode != null)
                            ? <ListAction
                                    icon={() => (<FontAwesome5
                                        name="times"
                                        color="black"
                                        size={25}    
                                    />)}
                                    onPressed={() => this.cancelActions()}
                                ></ListAction>
                            : null
                        }
                    </View>
                    {(this.state.moveMode != null)
                        ? <View style={{padding: 10}}>
                            <Picker
                                selectedValue={this.state.selectedGiftListId}
                                onValueChange={this.onGListSelected}
                                mode="dropdown"
                                >{giftLists}
                            </Picker>
                            <Button title="Move" onPress={this.confirmItemsMove} />
                        </View>
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
        height: '100%'
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
        moveGiftListItems: (itemData) => dispatch(actions.moveGiftListItems(itemData))
    }
};

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftListDetail);