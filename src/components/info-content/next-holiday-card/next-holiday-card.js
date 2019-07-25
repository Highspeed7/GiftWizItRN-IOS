import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import holidayBgImage from '../../../../assets/images/holday-bg.png';
import HolidayCountdown from './holiday-countdown/holiday-countdown';

class NextHolidayCard extends Component {
    render() {
        return (
            <ImageBackground style={styles.cardBgImage} source={holidayBgImage}>
                <View style={styles.overlay}>
                    <Text style={styles.cardText}>Be ready for the holidays. . .</Text>
                    <HolidayCountdown />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    cardText: {
        color: 'white',
        fontFamily: 'SayItSoftly',
        fontSize: 24
    },
    cardBgImage: {
        width: '100%',
        height: '100%'
    }
});

export default NextHolidayCard;