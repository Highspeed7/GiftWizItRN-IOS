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
import { Card } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import ListAction from '../../components/list-actions/list-action';
import GiftListDetail from '../../components/gift-list/gift-list-detail';
import Auxiliary from '../../hoc/auxiliary';
import { goclone } from '../../utils/utils';
import Checkbox from '../../components/checkbox/checkbox';
import GiftListAdd from '../../components/gift-list/add-modal/gift-list-add';
import LinearGradient from 'react-native-linear-gradient';

class GiftLists extends Component {
    state = {
        addListModalOpen: null,
        shareListModalOpen: null,
        selectedLists: [],
        newListName: null,
        restrictChatFlag: false,
        allowAdds: true,
        deleteMode: null
    }
    setChatRestriction = (value) => {
        this.setState({
            restrictChatFlag: value
        });
    };
    setAllowAdds = (value) => {
        this.setState({
            allowAdds: value
        });
    };
    onSwatchPress(list) {
        var listId = list.id;
        if(this.state.deleteMode == null) {
            // Call to get the selected list's items.
            this.props.setListItems(listId);
            this.props.setListActive(listId)
            return;
        }
        if(this.isListSelected(listId)) {
            this.setState((prevState, props) => {
                const nowSelectedArr = prevState.selectedLists.filter((list) => list != listId);
                return {
                    selectedLists: nowSelectedArr
                }
            })
        }else {
            this.setState((prevState, props) => {
                return {
                    selectedLists: prevState.selectedLists.concat(listId)
                }
            });
        }
    }
    confirmListsDelete = () => {
        if(this.state.selectedLists.length == 0) {
            Alert.alert("You did not select any items to delete.")
            return;
        }
        let deletedListsArr = [];
        let deletedListObj = {};

        this.state.selectedLists.forEach((list) => {
            deletedListObj["id"] = list;
            deletedListsArr.push(goclone(deletedListObj));
        });
        this.cancelActions();
        this.props.deleteGiftLists(deletedListsArr);
    }
    setDeleteMode = () => {
        this.setState({
            deleteMode: true
        });
    }
    cancelActions = () => {
        this.setState({
            deleteMode: null,
            selectedLists: []
        });
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
            var newGiftList = {
                name: this.state.newListName,
                restrictChat: this.state.restrictChatFlag,
                allowItemAdds: this.state.allowAdds
            };
            await this.props.addNewGiftList(newGiftList);
            this.closeNewListModal();
        }
    }
    addedGiftNameHandler = (val) => {
        this.setState({
            newListName: val
        });
    }
    isListSelected = (listId) => {
        return this.state.selectedLists.indexOf(listId) != -1;
    }
    render() {
        const giftLists = (this.props.giftLists.length > 0) 
        ? this.props.giftLists.map((list) => (
            <Card>
                <TouchableOpacity key={list.id} onPress={() => this.onSwatchPress(list)} style={styles.touchableSwatch}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: 10}}>
                            {(this.state.deleteMode)
                                ? <Checkbox
                                    onSelected={()=>this.onSwatchPress(list)}
                                    isSelected={this.isListSelected(list.id)}
                                />
                                : null
                            }
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text>{list.name}</Text>
                        </View>
                    </View>
                    <Modal visible={list.active != null} onRequestClose={() => this.props.setListInactive(list.id)}>
                        {/* <Button title="Close" onPress={() => this.props.setListInactive(list.id)}/> */}
                        <GiftListDetail list={list} />
                    </Modal>
                </TouchableOpacity>
            </Card>
        ))
        : null
        // TODO: Make add gift list into it's own component.
        return (
            <Auxiliary>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.actionContainer}>
                    <View style={styles.listActionsContainer}>
                        <ListAction 
                            title="Add"
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
                                <GiftListAdd
                                    addedGiftNameHandler={this.addedGiftNameHandler}
                                    newGiftListAdded={this.newGiftListAdded}
                                    restrictChatFlag={this.setChatRestriction}
                                    allowItemAdds={this.setAllowAdds}
                                />
                            </Modal>
                        </ListAction>
                        <ListAction 
                            title="Delete"
                            icon={() => (<FontAwesome5 
                                name="trash"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.setDeleteMode}
                        >
                        </ListAction>
                        {
                            (this.state.deleteMode)
                            ? <ListAction
                                title="Cancel"
                                icon={() => (<FontAwesome5
                                    name="times"
                                    color="black"
                                    size={25}
                                />)}
                                onPressed = {this.cancelActions}
                            />
                            : null
                        }
                    </View>
                    {/* <Text>Your Gift Lists</Text> */}
                    {(this.state.deleteMode == true)
                        ? <View>
                            <Text>Are you sure you want to remove the selected lists?</Text>
                            <Button title="Yes" onPress={this.confirmListsDelete} />
                            <Button title="No" onPress={this.cancelActions} />
                        </View>
                        : null
                    }
                </LinearGradient>
                <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{flex: 1}}>
                    <ScrollView style={styles.listContainer}>
                        {giftLists}
                        <View style={styles.spacer}></View>
                    </ScrollView>
                </LinearGradient>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: '100%',
        margin: 1
    },
    listContainer: {
        padding: 10
    },
    listActionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    actionContainer: {
        padding: 10
    },
    spacer: {
        height: 25
    }
})

const mapDispatchToProps = dispatch => {
    return {
        getLists: () => dispatch(actions.setGiftLists()),
        addNewGiftList: (newGiftList) => dispatch(actions.addNewGiftlist(newGiftList)),
        setListActive: (key) => dispatch(actions.setGiftListActive(key)),
        setListInactive: (key) => dispatch(actions.setGiftListInactive(key)),
        setListItems: (key) => dispatch(actions.setGiftListItems(key)),
        deleteGiftLists: (listData) => dispatch(actions.deleteGiftLists(listData))
    }
}

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftLists);