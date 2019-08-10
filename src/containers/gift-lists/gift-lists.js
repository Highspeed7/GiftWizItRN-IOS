import React, {Component} from 'react';
import { 
    Alert, 
    View, 
    Text, 
    ScrollView, 
    Button, 
    Modal, 
    StyleSheet,
    TextInput, 
    TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Swatch from '../../components/swatch/swatch';
import ListAction from '../../components/list-actions/list-action';
import GiftListDetail from '../../components/gift-list/gift-list-detail';
import Auxiliary from '../../hoc/auxiliary';

class GiftLists extends Component {
    state = {
        addListModalOpen: null,
        newListName: null
    }
    onSwatchPress(list) {
        // Call to get the selected list's items.
        // TODO: Implement a timer, so that items are refreshed based on interval
        this.props.setListItems(list.id);
        this.props.setListActive(list.id)
    }
    componentDidMount() {
        this.props.getLists();
    }
    addNewListPressed = () => {
        this.setState({
            addListModalOpen: true
        });
    }
    closeNewListModal = () => {
        this.setState({
            addListModalOpen: null
        });
    }
    newGiftListAdded = async() => {
        // Make sure we have updated lists
        if(this.state.newListName == null || this.state.newListName.length == 0){
            Alert.alert("You did not enter a name, please do so");
            return;
        }
        await this.props.getLists()
        var existingList = this.props.giftLists.filter((list) => {
            return list.name == this.state.newListName;
        });

        if(existingList.length > 0) {
            Alert.alert("Name already in use, please enter a different name.");
        }else {
            await this.props.addNewGiftList(this.state.newListName);
            this.closeNewListModal();
        }
    }
    addedGiftNameHandler = (val) => {
        this.setState({
            newListName: val
        });
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
            <Auxiliary>
                <View style={styles.actionContainer}>
                    <Text>Your Gift Lists</Text>
                    <View style={styles.listsContainer}>
                        <ListAction 
                            icon={() => (<FontAwesome5 
                                name="plus"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.addNewListPressed}
                        >
                            <Modal 
                                visible={this.state.addListModalOpen != null}
                                onRequestClose={() => this.closeNewListModal()}
                            >
                                <View style={{padding: 10}}>
                                    <Text>Hello!</Text>
                                    <TextInput placeholder="Name" onChangeText={this.addedGiftNameHandler} />
                                    <Button title="Submit" onPress={this.newGiftListAdded} />
                                </View>
                            </Modal>
                        </ListAction>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listsContainer}>
                        {giftLists}
                    </View>
                </ScrollView>
            </Auxiliary>
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
    },
    actionContainer: {
        padding: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getLists: () => dispatch(actions.setGiftLists()),
        addNewGiftList: (name) => dispatch(actions.addNewGiftlist(name)),
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