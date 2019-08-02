import React, {Component} from 'react';
import { Alert, View, Text, ScrollView, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Swatch from '../../components/swatch/swatch';
import Auxiliary from '../../hoc/auxiliary';

class GiftLists extends Component {
    onSwatchPress() {
        Alert.alert("Swatch pressed");
    }
    componentDidMount() {
        this.props.getLists();
    }
    render() {
        const giftLists = (this.props.giftLists.length > 0) ? this.props.giftLists.map((list) => (
            <TouchableOpacity key={list.id} onPress={() => this.props.setListActive(list.id)} style={styles.touchableSwatch}>
                <Swatch style={{borderWidth: 3, borderColor: 'purple'}}>
                    <Text>{list.name}</Text>
                    <Modal visible={list.active != null} onRequestClose={() => this.props.setListInactive(list.id)}>
                        <Text>{list.name}</Text>
                        <Button title="Close" onPress={() => this.props.setListInactive(list.id)}/>
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
        setListInactive: (key) => dispatch(actions.setGiftListInactive(key))
    }
}

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftLists);