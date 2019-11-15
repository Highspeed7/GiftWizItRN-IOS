import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ideas from '../../../resources/gift-idea-store';
import { NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';

import wizardIdeasImage from '../../../../assets/images/gift-ideas-wizard.png';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
            <View style={{padding: 10}}>
                <TouchableOpacity

                    onPress={this.navigateToIdeasStore}
                >
                    <Text style={styles.cardText}>Gift Ideas!</Text>
                    <Image source={wizardIdeasImage} resizeMode={'contain'} style={{position: 'absolute', width: 250, height: 160, top: -10, left: '10%'}} />
                    <View style={styles.giftIdeaThoughtBubble}>
                        <FontAwesome5Icon
                            style={{left: '35%', top: '25%'}}
                            name="question"
                            color="black"
                            size={50}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    giftIdeaThoughtBubble: {
        borderRadius: 50,
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: 'black', 
        width: 150, 
        top: -30 , 
        height: '85%', 
        left: -20, 
        alignSelf: 'flex-end'
    },
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