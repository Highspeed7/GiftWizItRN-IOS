import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    StyleSheet, 
    Linking } from 'react-native';

import Auxiliary from '../../hoc/auxiliary';


class SharedListItem extends Component {
    openModal = () => {
        Linking.openURL(this.props.item.afflt_Link);
    }
    render() {
        return (
            <Auxiliary>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={this.openModal}>
                    <View style={styles.listImageContainer}>
                        <Image style={styles.listImage} source={{uri: this.props.item.image}} />
                    </View>
                    <Text style={styles.itemText}>{this.props.item.itm_Name}</Text> 
                </TouchableOpacity>
            </ScrollView>
        </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    itemText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    listImageContainer: {
        minHeight: 250
    },
    listImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'contain'
    }
});

export default SharedListItem;