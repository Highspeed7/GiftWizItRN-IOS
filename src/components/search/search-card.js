import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

import searchMagnifyImage from '../../../assets/images/search-magnifying-glass.png';

class SearchCard extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.infoCard} onPress={this.props.searchCardPressed}>
                <View>
                    <Text style={[styles.cardText, {color: "black"}]}>Search Lists</Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                    <Image style={styles.cardImage} source={searchMagnifyImage} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardImage: {
        width: 150,
        height: 150,
        top: -55,
        left: -50
    },  
    infoCard: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    cardText: {
        color: 'black',
        fontFamily: 'Graciela-Regular',
        fontSize: 22
    }
})

export default SearchCard;