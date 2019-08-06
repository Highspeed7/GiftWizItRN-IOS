import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Swatch from '../swatch/swatch';

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
            <View>
                <View style={{padding: 10}}>
                    <Text>{this.props.list.name}</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listsContainer}>
                        {giftItems}
                    </View>
                </ScrollView>
            </View>
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