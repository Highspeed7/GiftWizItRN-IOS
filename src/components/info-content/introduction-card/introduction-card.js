import React, {Component} from 'react';
import { Alert, View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import theFactsImage from '../../../../assets/images/the-facts.png';
import cardViewBgImage from '../../../../assets/images/gift-blue-bg.jpg';

class IntroductionCard extends Component {
    imagePressed = () => {
        this.props.navigation.navigate("Facts");
    }
    render() {
        return (
            <ImageBackground source={cardViewBgImage} style={styles.cardBgImage}>
                <View style={styles.cardViewContainer}>
                    <Text style={styles.headerText}>Get with your gifts!</Text>
                    <TouchableOpacity onPress={this.imagePressed}>
                        <Image source={theFactsImage} style={styles.cardImage} />
                    </TouchableOpacity>
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

export default withNavigation(IntroductionCard);