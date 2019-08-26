import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import Auxiliary from '../../hoc/auxiliary';
import Swatch from '../swatch/swatch';

class PublicSearchItems extends Component {
    render() {
        const giftItems = (this.props.activeList.itemsData != null && this.props.activeList.itemsData.length > 0) 
            ? this.props.activeList.itemsData.map((item) => (
                <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch} onPress={() => this.itemSwatchPressed(item.item_Id)}>
                    <Swatch>
                        <Image style={styles.itemImage} source={{uri: item.image}} />
                    </Swatch>
                </TouchableOpacity>
            ))
            : null
        return (
            <Auxiliary>
                <View style={{padding: 10}}>
                    <Text>{this.props.activeList.name}</Text>
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
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    scrollView: {
        padding: 10
    },
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default PublicSearchItems;