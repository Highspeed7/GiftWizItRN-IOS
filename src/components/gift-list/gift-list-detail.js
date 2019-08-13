import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Swatch from '../swatch/swatch';
import ListAction from '../list-actions/list-action';
import Auxiliary from '../../hoc/auxiliary';

class GiftListDetail extends Component {
    render(){
        const giftItems = (this.props.list.itemsData != null && this.props.list.itemsData.length > 0) 
            ? this.props.list.itemsData.map((item) => (
                <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch}>
                    <Swatch>
                        <Image style={styles.itemImage} source={{uri: item.image}} />
                        {/* <Modal
                            visible={list.active != null}
                            onRequestClose={() => this.props.setWishListInactive(list.item_Id)}
                        >
                            <WishListItemModal wishList={list} />
                        </Modal> */}
                    </Swatch>
                </TouchableOpacity>
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
                            onPressed={() => Alert.alert("Move list pressed")}
                        >
                        </ListAction>
                        <ListAction
                            icon={() => (<FontAwesome5
                                name="edit"
                                color="black"
                                size={25}    
                            />)}
                            onPressed={() => Alert.alert("Edit list pressed")}
                        >
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
                    </View>
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
    }
});

export default GiftListDetail;