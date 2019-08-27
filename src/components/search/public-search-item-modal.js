import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal
} from 'react-native';

import Auxiliary from '../../hoc/auxiliary';
import ProductWebView from '../product-web-view/product-web-view';

class PublicSearchItemModal extends Component {
    state = {
        openProductWebView: null
    }
    openModal = () => {
        this.setState({
            openProductWebView: true
        });
    }
    closeModal = () => {
        this.setState({
            openProductWebView: null
        });
        // this.props.onItemModalClosed();
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
                <Modal
                    visible={this.state.openProductWebView != null}
                    onRequestClose={this.closeModal}
                >
                    <ProductWebView source={{uri: this.props.item.afflt_Link}} />
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

export default PublicSearchItemModal;