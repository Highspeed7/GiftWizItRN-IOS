import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';

import Swatch from '../../components/swatch/swatch';
import SharedListItem from './shared-list-item';

class SharedListView extends Component {
    state = {
        activeItem: null
    }
    render() {
        let {listItems} = this.props.list;
        listItems = (listItems != null && listItems.length > 0)
            ? this.props.list.listItems.map((item) => 
                (
                    <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch} onPress={() => {this.props.itemSelected(item)}}>
                        <Swatch style={{justfiyContent: 'center'}}>
                            <Image style={styles.itemImage} source={{uri: item.image}} />
                        </Swatch>
                        <Modal
                            visible={item.active != null}
                            onRequestClose={() => this.props.itemClosed(item.item_Id)}
                        >
                            <SharedListItem item={item} />
                        </Modal>
                    </TouchableOpacity>
                )
            )
            : null
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text style={styles.listTitleHeader}>{this.props.list.giftListName}</Text>
                </View>
                <ScrollView>
                    <View style={styles.listsContainer}>
                        {listItems}
                    </View>
                </ScrollView>
            </View>
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
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    listsContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default SharedListView;