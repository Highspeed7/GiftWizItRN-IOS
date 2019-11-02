import React, {Component} from 'react';
import { 
    ScrollView, 
    View, 
    Text, 
    TouchableOpacity, 
    Modal, 
    StyleSheet, 
    Image, 
    Picker, 
    Alert,
    Linking,
    Button,
    BackHandler
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Swatch from '../../components/swatch/swatch';
import * as actions from '../../store/actions/index';
import StoreSelector from '../../components/store-selector/store-selector';
import WishListItemModal from '../../components/wish-list/wish-list-item-modal';
import Auxiliary from '../../hoc/auxiliary';
import ListAction from '../../components/list-actions/list-action';
import { goclone } from '../../utils/utils';
import LinearGradient from 'react-native-linear-gradient';

class WishList extends Component {
    state = {
        openStoreSelector: null,
        moveMode: null,
        deleteMode: null,
        selectedItems: [],
        selectedGiftListId: null,
        selectedGiftListName: null,
        combinedGiftLists: []
    }
    componentDidMount = () => {
        this.props.getWishList();
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log("back button pressed");
        });
    }
    componentWillFocus = () => {
        let openStoreSelector = this.props.navigation.getParam("storeSelectorOpen");

        if(openStoreSelector) {
            this.setState({
                openStoreSelector: true
            });
        }
    }
    addNewItemPressed = () => {
        this.setState({
            openStoreSelector: true
        });
    }
    setMoveMode = async () => {
        // TODO: Return to determine whether or not to update giftLists.
        if(this.props.giftLists.length == 0) {
            await this.props.getGiftLists();
        }

        if(this.props.editableSharedLists.length == 0) {
            await this.props.getEditableLists();
        }
        this.setState({
            moveMode: true,
            deleteMode: null
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log(prevProps);
    }
    cancelActions = () => {
        const nowSelectedArr = [];
        this.setState({
            moveMode: null,
            deleteMode: null,
            selectedItems: nowSelectedArr,
            selectedGiftListId: null,
            selectedGiftListName: null
        })
    }
    setDeleteMode = () => {
        // Set the delete mode to true
        this.setState({
            deleteMode: true,
            moveMode: null
        })
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
    confirmItemsDelete = () => {
        let deletedItemsArr = [];
        let deletedItemObj = {};

        this.state.selectedItems.forEach((item) => {
            deletedItemObj["item_Id"] = item;
            deletedItemsArr.push(goclone(deletedItemObj));
        });
        this.cancelActions();
        this.props.deleteWishListItems(deletedItemsArr);
    }
    confirmItemsMove = () => {
        // Create the required object
        let movedItemsArr = [];
        let movedItemObj = {};

        if(this.state.selectedGiftListId == null) {
            if(this.props.giftLists.length > 0) {
                // Set the selectedGiftListId and name to the first gift list
                this.setState((prevState, props) => {
                    console.log(props.giftLists[0].id);
                    console.log(props.giftLists[0].name);
                    return {
                        selectedGiftListId: props.giftLists[0].id,
                        selectedGiftListName: props.giftLists[0].name
                    }
                }, () => {
                    this.state.selectedItems.forEach((item) => {
                        movedItemObj["g_List_Id"] = this.state.selectedGiftListId;
                        movedItemObj["item_Id"] = item
            
                        movedItemsArr.push(goclone(movedItemObj));
                    })
                    this.cancelActions();
                    this.props.moveWishListItems(movedItemsArr);
                });
            }else {
                // TODO: Move alerts to toasters.
                Alert.alert("There are no gift lists currently; create some to move items to them.")
                this.cancelActions();
            }
        }else {
            this.state.selectedItems.forEach((item) => {
                movedItemObj["g_List_Id"] = this.state.selectedGiftListId;
                movedItemObj["item_Id"] = item
    
                movedItemsArr.push(goclone(movedItemObj));
            })
            this.cancelActions();
            this.props.moveWishListItems(movedItemsArr);
        }
    }
    itemSwatchPressed = (item) => {
        const itemId = item.item_Id;
        if(this.state.moveMode == null && this.state.deleteMode == null) {
            if(item.afflt_Link == null) {
                const productData = JSON.parse(item.product_Id);
                this.props.navigation.navigate("Products", productData);
                return;
            }
            this.props.setWishListActive(itemId);
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
    isItemSelected = (itemId) => {
        return this.state.selectedItems.indexOf(itemId) != -1;
    }
    onStoreSelectorClosed = () => {
        this.props.navigation.setParams({"storeSelectorOpen": null});
        this.setState({openStoreSelector: null})
    }
    openStoreFront = () => {
        // Close the store selector modal
        this.setState({
            openStoreSelector: null
        }, () => {
            this.props.navigation.navigate("Store", {getPrevCheckout: true});
        });
    }
    render() {
        const wishList = (this.props.wishList.length > 0)
        ? this.props.wishList.map((list) => (
            <TouchableOpacity key={list.item_Id} style={styles.touchableSwatch} onPress={() => {this.itemSwatchPressed(list)}}>
                <Swatch style={{justfiyContent: 'center'}}>
                    <Image style={styles.itemImage} source={{uri: list.image}} />
                    {(this.isItemSelected(list.item_Id)) 
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
                    <Modal
                        visible={list.active != null}
                        onRequestClose={() => this.props.setWishListInactive(list.item_Id)}
                    >
                        <WishListItemModal wishList={list} />
                    </Modal>
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
                <NavigationEvents onWillFocus={this.componentWillFocus} />
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.actionContainer}>
                    <Text style={{...styles.listActionText, textDecorationLine: "underline"}}>{(this.props.wishList[0] != null) ? this.props.wishList[0].wlst_Name: null}</Text>
                    <View style={styles.listActionsContainer}>
                        <ListAction 
                            title="Add"
                            icon={() => (<FontAwesome5 
                                name="plus"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.addNewItemPressed}
                        />
                        {(this.props.wishList.length > 0) 
                            ?   [<ListAction 
                                    title="Move"
                                    icon={() => (<FontAwesome5 
                                        name="dolly"
                                        color="black"
                                        size={25}
                                    />)} 
                                    onPressed = {this.setMoveMode}
                                />,
                                <ListAction 
                                    title="Delete"
                                    icon={() => (<FontAwesome5 
                                        name="trash"
                                        color="black"
                                        size={25}
                                    />)} 
                                    onPressed = {this.setDeleteMode}
                                />]
                            : null
                        }
                        {
                            (this.state.deleteMode || this.state.moveMode)
                            ? <ListAction
                                title="Cancel"
                                icon={() => (<FontAwesome5
                                    name="times"
                                    color="black"
                                    size={25}
                                />)}
                                onPressed = {this.cancelActions}
                            />
                            : null
                        }
                    </View>
                    {(this.state.selectedItems.length > 0 && this.state.moveMode == true)
                        ? <View>
                            <Picker
                                style={{color: 'white'}}
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
                            <Text style={{color: 'white'}}>Are you sure you want to remove the selected items?</Text>
                            <Button title="Yes" onPress={this.confirmItemsDelete} />
                            <Button title="No" onPress={this.cancelActions} />
                        </View>
                        : null
                    }
                    {(this.state.deleteMode || this.state.moveMode) 
                        ? <Text style={styles.listActionText}>You may select multiple items...</Text> 
                        : (this.props.wishList.length > 0) 
                        ? <Text style={styles.listActionText}>Select an item to see more details...</Text>
                        : <Text style={styles.listActionText}>There are no items to display... {'\n'}Add some above!</Text>
                    }
                </LinearGradient>
                <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{flex: 1, padding: 10}}>
                    <ScrollView>
                        <View style={styles.listContainer}>
                            {wishList}
                        </View>
                        <Modal
                            visible={this.state.openStoreSelector}
                            onRequestClose={this.onStoreSelectorClosed}
                        >
                            <StoreSelector 
                                onClose={this.onStoreSelectorClosed} 
                                openStoreFront={this.openStoreFront}
                            />
                        </Modal>
                    </ScrollView>
                </LinearGradient>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    actionContainer: {
        padding: 10
    },
    touchableSwatch: {
        width: '24%',
        margin: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listActionText: {
        color: 'white',
        fontSize: 20
    },
    listActionsContainer: {
        marginBottom: 10,
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
})

const mapDispatchToProps = dispatch => {
    return {
        getWishList: () => dispatch(actions.setWishList()),
        getGiftLists: () => dispatch(actions.setGiftLists()),
        getEditableLists: () => dispatch(actions.getEditableSharedLists()),
        setWishListActive: (key) => dispatch(actions.setWishListActive(key)),
        setWishListInactive: (key) => dispatch(actions.setWishListInactive(key)),
        moveWishListItems: (itemData) => dispatch(actions.moveWishListItems(itemData)),
        deleteWishListItems: (itemData) => dispatch(actions.deleteWishListItems(itemData))
    }
}

const mapStateToProps = state => {
    return {
        wishList: state.wishListReducer.wishList,
        giftLists: state.giftListsReducer.giftLists,
        sharedLists: state.sharedListsReducer.sharedLists,
        editableSharedLists: state.wishListReducer.editableSharedLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);