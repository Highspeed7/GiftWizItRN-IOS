import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ideas from '../../../resources/gift-idea-store';
import { NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class GiftIdeasCard extends Component {
    navigateToIdeasStore = () => {
        if(this.props.authed) {
            this.props.navigation.navigate("GiftIdeasAuthed");
        }else {
            this.props.navigation.navigate("GiftIdeasNoAuth");
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.navigateToIdeasStore}
                >
                    <Text style={styles.cardText}>Gift Ideas!</Text>
                    {/* <ScrollView>
                        <FlatList
                            horizontal={true}
                            data={ideas.introGiftIdeas}
                            renderItem={(idea) => (
                                <View style={styles.listItemContainer}>
                                    <Image source={idea.item.image} style={styles.listItemImage} />
                                </View>
                            )}
                        />
                    </ScrollView> */}
                </TouchableOpacity>
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
    cardText: {
        fontFamily: 'Graciela-Regular',
        fontSize: 22
    }
});

export default withNavigation(GiftIdeasCard);