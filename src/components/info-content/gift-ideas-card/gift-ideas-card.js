import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import * as ideas from '../../../resources/gift-idea-store';

class GiftIdeasCard extends Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>Gift Ideas!</Text>
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        data={ideas.introGiftIdeas}
                        renderItem={(idea) => (
                            <View style={styles.listItemContainer}>
                                <Image source={idea.item.image} style={styles.listItemImage} />
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderColor: 'transparent',
        elevation: 2,
        borderWidth: 1
    },
    listItemImage: {
        width: 75,
        height: 75
    },
    cardContainer: {
        padding: 10
    },
    cardText: {
        fontFamily: 'Graciela-Regular',
        fontSize: 22
    }
});

export default GiftIdeasCard;