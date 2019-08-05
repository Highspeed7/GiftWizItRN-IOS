import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import Auxiliary from '../../hoc/auxiliary';
import ProductWebView from '../product-web-view/product-web-view';

class WishListItemModal extends Component {
    state = {
        openProductWebView: null
    }
    openModal = () => {
        this.setState({openProductWebView: true});
    }
    closeModal = () => {
        this.setState({openProductWebView: null});
    }
    render() {
        return (
        <Auxiliary>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={this.openModal}>
                    <View style={styles.listImageContainer}>
                        <Image style={styles.listImage} source={{uri: this.props.wishList.image}} />
                    </View>
                    <Text style={styles.itemText}>{this.props.wishList.itm_Name}</Text> 
                </TouchableOpacity>
            </ScrollView>
            <Modal
                visible={this.state.openProductWebView != null}
                onRequestClose={this.closeModal}
            >
                <ProductWebView source={{uri: this.props.wishList.afflt_Link}} />
            </Modal>
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

export default WishListItemModal;