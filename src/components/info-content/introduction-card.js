import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import theFactsImage from '../../../assets/images/the-facts.png';
import cardViewBgImage from '../../../assets/images/gift-blue-bg.jpg';

class IntroductionCard extends Component {
    render() {
        return (
            <ImageBackground source={cardViewBgImage} style={styles.cardBgImage}>
                <View style={styles.cardViewContainer}>
                    <Text style={styles.headerText}>Get with your gifts!</Text>
                    <Image source={theFactsImage} style={styles.cardImage} />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    cardViewContainer: {
        padding: 10
    },
    headerText: {
        fontFamily: 'SayItSoftly',
        fontSize: 24
    },
    cardImage: {
        alignSelf: "flex-end"
    },
    cardBgImage: {
        width: '100%',
        height: '100%'
    }
});

export default IntroductionCard;