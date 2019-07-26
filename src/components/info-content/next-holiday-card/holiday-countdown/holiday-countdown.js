import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HolidayCountdown extends Component {
    state = {
        intervalId: null,
        currentCount: null
    }
    componentDidMount = () => {
        this.getTimeRemaining("2019-12-25");
        var intervalId = setInterval(() => {
            this.getTimeRemaining("2019-12-25");
            this.setState({
                intervalId: intervalId
            });
        }, (1000));
    }
    getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor( (t/1000) % 60 );
        let minutes = Math.floor( (t/1000/60) % 60 );
        let hours = Math.floor( (t/(1000*60*60)) % 24 );
        let days = Math.floor( t/(1000*60*60*24) );
        let finalTime = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        this.setState({
            currentCount: `${finalTime.days} days, ${finalTime.hours} hrs, ${finalTime.minutes} mins, ${finalTime.seconds} seconds!`
        });
    }
    render() {
        return (
            <View style={styles.countContainer}>
                <Text style={styles.countText}>{this.state.currentCount}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    countText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    }
});

export default HolidayCountdown;