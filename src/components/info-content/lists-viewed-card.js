import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListsViewed extends Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.cardText}>Lists you've viewed...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10
    },
    cardText: {
        fontFamily: "SayItSoftly",
        fontSize: 24
    }
});

export default ListsViewed;