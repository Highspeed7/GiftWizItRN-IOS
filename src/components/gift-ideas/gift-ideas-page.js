import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

class GiftIdeasPage extends Component {
    render() {
        return (
            <ScrollView style={styles.contentContainer}>
                <Text>{this.props.title}</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10
    }
});

export default GiftIdeasPage;