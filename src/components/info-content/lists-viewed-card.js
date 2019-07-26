import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListsViewed extends Component {
    render() {
        return (
            <View style={[styles.cardContainer, {backgroundColor: 'blanchedalmond'}]}>
                <Text style={styles.cardText}>Lists you've viewed...</Text>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Text>You have not yet viewed any lists...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,
        flex: 1
    },
    cardText: {
        fontFamily: "Graciela-Regular",
        fontSize: 22
    }
});

export default ListsViewed;