import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Auxiliary from '../../hoc/auxiliary';

class SharedListView extends Component {
    render() {
        return (
            <Auxiliary>
                <View style={styles.viewContainer}>
                    <View>
                        <Text style={styles.listTitleHeader}>{this.props.list.giftListName}</Text>
                    </View>
                </View>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    listTitleHeader: {
      fontSize: 24,
      fontWeight: 'bold'  
    }
});

export default SharedListView;