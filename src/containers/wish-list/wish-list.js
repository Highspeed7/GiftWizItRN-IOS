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
    Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import iconSet from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Swatch from '../../components/swatch/swatch';
import * as actions from '../../store/actions/index';
import StoreSelector from '../../components/store-selector/store-selector';
import WishListItemModal from '../../components/wish-list/wish-list-item-modal';
import Auxiliary from '../../hoc/auxiliary';
import ListAction from '../../components/list-actions/list-action';
import { goclone } from '../../utils/utils';

class WishList extends Component {
    state = {
        openStoreSelector: null,
        moveMode: null,
        deleteMode: null,
        selectedItems: [],
        selectedGiftListId: null,
        selectedGiftListName: null
    }
    componentDidMount = () => {
        this.props.getWishList();
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.wishList.length )
        console.log(prevProps);
        console.log(prevState);
    }
    addNewItemPressed = () => {
        this.setState({
            openStoreSelector: true
        });
    }
    setMoveMode = () => {
        // TODO: Return to determine whether or not to update giftLists.
        if(this.props.giftLists.length == 0) {
            this.props.getGiftLists();
        }
        this.setState({
            moveMode: true,
            deleteMode: null
        })
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
        const selectedList = goclone(this.props.giftLists.find((list) => {
            return list.id == glistId
        }));

        this.setState({
            selectedGiftListId: glistId,
            selectedGiftListName: selectedList.name
        });
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
    itemSwatchPressed = (itemId) => {
        if(this.state.moveMode == null && this.state.deleteMode == null) {
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
    render() {
        const wishList = (this.props.wishList.length > 0)
        ? this.props.wishList.map((list) => (
            <TouchableOpacity key={list.item_Id} style={styles.touchableSwatch} onPress={() => {this.itemSwatchPressed(list.item_Id)}}>
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
                <View style={styles.actionContainer}>
                    <Text style={{fontSize: 20, textDecorationLine:"underline"}}>{(this.props.wishList[0] != null) ? this.props.wishList[0].wlst_Name: null}</Text>
                    <View style={styles.listsContainer}>
                        <ListAction 
                            icon={() => (<FontAwesome5 
                                name="plus"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.addNewItemPressed}
                        />
                        {(this.props.wishList.length > 0) 
                            ?   [<ListAction 
                                    icon={() => (<FontAwesome5 
                                        name="dolly"
                                        color="black"
                                        size={25}
                                    />)} 
                                    onPressed = {this.setMoveMode}
                                />,
                                <ListAction 
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
                    {(this.state.selectedItems.length > 0)
                        ? <View>
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
                    {(this.state.deleteMode || this.state.moveMode) 
                        ? <Text style={{fontSize: 20}}>You may select multiple items...</Text> 
                        : (this.props.wishList.length > 0) 
                        ? <Text style={{fontSize: 20}}>Select an item to see more details...</Text>
                        : <Text style={{fontSize: 20}}>There are no items to display... {'\n'}Add some above!</Text>
                    }
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listsContainer}>
                        {wishList}
                    </View>
                    <Modal
                        visible={this.state.openStoreSelector}
                        onRequestClose={() => this.setState({openStoreSelector: null})}
                    >
                        <StoreSelector onClose={() => this.setState({openStoreSelector: null})} />
                    </Modal>
                </ScrollView>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {
        width: '100%',
        height: '100%'
    },
    actionContainer: {
        padding: 10
    },
    scrollView: {
        padding: 10
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    listsContainer: {
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
        setWishListActive: (key) => dispatch(actions.setWishListActive(key)),
        setWishListInactive: (key) => dispatch(actions.setWishListInactive(key)),
        moveWishListItems: (itemData) => dispatch(actions.moveWishListItems(itemData))
    }
}

const mapStateToProps = state => {
    return {
        wishList: state.wishListReducer.wishList,
        giftLists: state.giftListsReducer.giftLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);