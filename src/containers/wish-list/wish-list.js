import React, {Component} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import iconSet from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Swatch from '../../components/swatch/swatch';
import * as actions from '../../store/actions/index';
import StoreSelector from '../../components/store-selector/store-selector';
import WishListItemModal from '../../components/wish-list/wish-list-item-modal';
import Auxiliary from '../../hoc/auxiliary';
import ListAction from '../../components/list-actions/list-action';

class WishList extends Component {
    state = {
        openStoreSelector: null,
        moveMode: null,
        deleteMode: null
    }
    componentDidMount = () => {
        this.props.getWishList();
    }
    addNewItemPressed = () => {
        this.setState({
            openStoreSelector: true
        });
    }
    setMoveMode = () => {
        this.setState({
            moveMode: true,
            deleteMode: null
        })
    }
    cancelActions = () => {
        this.setState({
            moveMode: null,
            deleteMode: null
        })
    }
    setDeleteMode = () => {
        // Set the delete mode to true
        this.setState({
            deleteMode: true,
            moveMode: null
        })
    }
    itemSwatchPressed = (itemId) => {
        if(this.state.moveMode == null && this.state.deleteMode == null) {
            this.props.setWishListActive(itemId);
            return;
        }
        console.log("Setting selected items");
    }
    render() {
        const wishList = (this.props.wishList.length > 0)
        ? this.props.wishList.map((list) => (
            <TouchableOpacity key={list.item_Id} style={styles.touchableSwatch} onPress={() => {this.itemSwatchPressed(list.item_Id)}}>
                <Swatch>
                    <Image style={styles.itemImage} source={{uri: list.image}} />
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
                        <ListAction 
                            icon={() => (<FontAwesome5 
                                name="dolly"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.setMoveMode}
                        />
                        <ListAction 
                            icon={() => (<FontAwesome5 
                                name="trash"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.setDeleteMode}
                        />
                        {(this.state.deleteMode || this.state.moveMode)
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
                    {(this.state.deleteMode || this.state.moveMode) 
                        ? <Text style={{fontSize: 20}}>You may select multiple items...</Text> 
                        : <Text style={{fontSize: 20}}>Select an item to see more details...</Text>}
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
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getWishList: () => dispatch(actions.setWishList()),
        setWishListActive: (key) => dispatch(actions.setWishListActive(key)),
        setWishListInactive: (key) => dispatch(actions.setWishListInactive(key))
    }
}

const mapStateToProps = state => {
    return {
        wishList: state.wishListReducer.wishList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);