import React, {Component} from 'react';
import { Alert, View, Text, ScrollView, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Swatch from '../../components/swatch/swatch';
import GiftListDetail from '../../components/gift-list/gift-list-detail';

class GiftLists extends Component {
    onSwatchPress(list) {
        // Call to get the selected list's items.
        // TODO: Implement a timer, so that items are refreshed based on interval
        this.props.setListItems(list.id);
        this.props.setListActive(list.id)
    }
    componentDidMount() {
        this.props.getLists();
    }
    render() {
        const giftLists = (this.props.giftLists.length > 0) 
        ? this.props.giftLists.map((list) => (
            <TouchableOpacity key={list.id} onPress={() => this.onSwatchPress(list)} style={styles.touchableSwatch}>
                <Swatch>
                    <Text>{list.name}</Text>
                    <Modal visible={list.active != null} onRequestClose={() => this.props.setListInactive(list.id)}>
                        {/* <Button title="Close" onPress={() => this.props.setListInactive(list.id)}/> */}
                        <GiftListDetail list={list} />
                    </Modal>
                </Swatch>
            </TouchableOpacity>
        ))
        : null
        return (
            <ScrollView style={styles.scrollView}>
                <View>
                <Text>Your Gift Lists</Text>
                </View>
                <View style={styles.listsContainer}>
                    <TouchableOpacity style={styles.touchableSwatch}>
                        <Swatch><Text>+</Text></Swatch>
                    </TouchableOpacity>
                    {giftLists}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getLists: () => dispatch(actions.setGiftLists()),
        setListActive: (key) => dispatch(actions.setGiftListActive(key)),
        setListInactive: (key) => dispatch(actions.setGiftListInactive(key)),
        setListItems: (key) => dispatch(actions.setGiftListItems(key))
    }
}

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftLists);