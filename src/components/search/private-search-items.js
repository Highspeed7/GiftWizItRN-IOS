import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Modal,
    Alert } from 'react-native';

import PrivateSearchItemModal from '../../components/search/private-search-item-modal';
import Auxiliary from '../../hoc/auxiliary';
import Swatch from '../swatch/swatch';
import GWWebView from '../web-view/gw-web-view';

class PrivateSearchItems extends Component {
    state = {
        productWebViewOpen: null,
        selectedItem: null
    }
    openProducWebView = (item) => {
        // Set the selected item
        this.setState({
            productWebViewOpen: true,
            selectedItem: item
        });
    }
    closeProductView = () => {
        this.setState({
            productWebViewOpen: null,
            selectedItem: null
        });
    }
    render() {
        const giftItems = (this.props.activeList.itemsData != null && this.props.activeList.itemsData.length > 0) 
            ? this.props.activeList.itemsData.map((item) => (
                    <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch} onPress={() => this.openProducWebView(item)}>
                        <Swatch>
                            <Image style={styles.itemImage} source={{uri: item.image}} />
                        </Swatch>
                    </TouchableOpacity>
            ))
            : null
        return (
            <Auxiliary>
                <View style={{padding: 10}}>
                    <Text>{this.props.activeList.name}</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listsContainer}>
                        {giftItems}
                    </View>
                    <Modal
                        visible={this.state.productWebViewOpen != null}
                        onRequestClose={() => this.closeProductView()}
                    >
                        <PrivateSearchItemModal 
                            item={this.state.selectedItem} 
                            storeProductClicked={(productData) => {
                                this.closeProductView();
                                this.props.storeProductClicked(productData);
                            }}
                        />
                    </Modal>
                </ScrollView>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    scrollView: {
        padding: 10
    },
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default PrivateSearchItems;