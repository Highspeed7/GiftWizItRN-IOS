import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

class SearchPrivateLists extends Component {
    render() {
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text>Search Private Lists! You will need to provide the password for these lists.</Text>
                </View>
                <ScrollView>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    }
});

export default SearchPrivateLists;