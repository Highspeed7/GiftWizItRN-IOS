import React, {Component} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import Swatch from '../../components/swatch/swatch';
import * as actions from '../../store/actions/index';
import StoreSelector from '../../components/store-selector/store-selector';
import WishListItemModal from '../../components/wish-list/wish-list-item-modal';

class WishList extends Component {
    state = {
        openStoreSelector: null,
    }
    componentDidMount = () => {
        this.props.getWishList();
    }
    addNewItemPressed = () => {
        this.setState({
            openStoreSelector: true
        });
    }
    render() {
        const wishList = (this.props.wishList.length > 0)
        ? this.props.wishList.map((list) => (
            <TouchableOpacity key={list.item_Id} style={styles.touchableSwatch} onPress={() => {this.props.setWishListActive(list.item_Id)}}>
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
            <ScrollView style={styles.scrollView}>
                <Text>{(this.props.wishList[0] != null) ? this.props.wishList[0].wlst_Name: null}</Text>
                <View style={styles.listsContainer}>
                    <TouchableOpacity style={styles.touchableSwatch} onPress={this.addNewItemPressed}>
                        <Swatch>                    
                            <Icon 
                                name="md-add"
                                color="#ccc"
                                size={25}
                            />
                        </Swatch>
                    </TouchableOpacity>
                    {wishList}
                </View>
                <Modal
                    visible={this.state.openStoreSelector}
                    onRequestClose={() => this.setState({openStoreSelector: null})}
                >
                    <StoreSelector onClose={() => this.setState({openStoreSelector: null})} />
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {
        width: '100%',
        height: '100%'
    },
    scrollView: {
        padding: 10
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    listsContainer: {
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