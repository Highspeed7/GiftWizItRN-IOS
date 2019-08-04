import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

class WishListItemModal extends Component {
    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.listImageContainer}>
                    <Image style={styles.listImage} source={{uri: this.props.wishList.image}} />
                </View>
                <Text>{this.props.wishList.itm_Name}</Text> 
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    listImageContainer: {
        maxHeight: 250
    },
    listImage: {
        width: '100%',
        height: '100%'
    }
});

export default WishListItemModal;