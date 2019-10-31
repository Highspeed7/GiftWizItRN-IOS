import React, {Component} from 'react';
import { 
    View,
    Text,
    Alert,
    FlatList,
    StyleSheet,
    Button,
    Modal } from 'react-native';
import { Card } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/auxiliary';
import * as actions from '../../store/actions/index';
import ListAction from '../../components/list-actions/list-action';
import AddContactModal from '../../components/contacts/add-contact';
import Checkbox from '../../components/checkbox/checkbox';
import { goclone } from '../../utils/utils';
import LinearGradient from 'react-native-linear-gradient';

class Contacts extends Component {
    state = {
        deleteMode: null,
        addContactModalOpen: null,
        selectedContacts: []
    }
    componentDidMount() {
        this.props.getContacts()
    }
    setDeleteMode = () => {
        this.setState({
            ...this.state,
            deleteMode: true
        });
    }
    addNewContactPressed = () => {
        this.setState({
            addContactModalOpen: true
        });
    }
    closeAddContactModal = () => {
        this.setState({
            addContactModalOpen: null
        });
    }
    onContactSelected = (contact) => {
        var contactId = contact.contactId;

        if(this.isContactSelected(contactId)) {
            this.setState((prevState, props) => {
                const nowSelectedArr = prevState.selectedContacts.filter((contact) => contact != contactId);
                return {
                    selectedContacts: nowSelectedArr
                };
            });
        }else {
            this.setState((prevState, props) => {
                return {
                    selectedContacts: prevState.selectedContacts.concat(contactId)
                };
            });
        }
    }
    isContactSelected = (contactId) => {
        return this.state.selectedContacts.indexOf(contactId) != -1;
    }
    confirmContactsDelete = () => {
        if(this.state.selectedContacts.length == 0) {
            Alert.alert("You did not select any contacts to delete.")
            return;
        }
        let deletedContactsArr = [];
        let deletedContactsObj = {};

        this.state.selectedContacts.forEach((list) => {
            deletedContactsObj["contactId"] = list;
            deletedContactsArr.push(goclone(deletedContactsObj));
        });
        this.cancelActions();
        this.props.deleteContacts(deletedContactsArr);
    }
    cancelActions = () => {
        this.setState({
            ...this.state,
            deleteMode: null,
            selectedContacts: []
        });
    }
    render() {
        const contactsList = (this.props.contacts !== null)
            ? <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.listContainer}>
                <FlatList 
                    horizontal={false}
                    data={this.props.contacts}
                    extraData={[this.state.deleteMode, this.isContactSelected]}
                    renderItem={(contact) => (
                        <Card key={contact.item.contact.contactId}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    {(this.state.deleteMode == true)
                                        ? <Checkbox
                                            onSelected={() => this.onContactSelected(contact.item.contact)}
                                            isSelected={this.isContactSelected(contact.item.contact.contactId)}
                                        />
                                        : null
                                    }
                                </View>
                                <View>
                                    <Text style={{fontWeight: 'bold'}}>{contact.item.contact.contactUsers[0].contactAlias}</Text>
                                    <Text>{contact.item.contact.email}</Text>
                                </View>
                            </View>
                            
                            
                        </Card>
                    )}
                />
            </LinearGradient>
            : <Text>There are no contacts yet...</Text>
        return (
            <Auxiliary>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.viewContainer}>
                    <View>
                        <Text style={styles.contactHeading}>Your Contacts</Text>
                    </View>
                    <View style={styles.listsActionsContainer}>
                        <ListAction 
                            title="Add"
                            icon={() => (<FontAwesome5 
                                name="plus"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.addNewContactPressed}
                        />
                        <ListAction 
                            title="Delete"
                            icon={() => (<FontAwesome5 
                                name="trash"
                                color="black"
                                size={25}
                            />)} 
                            onPressed = {this.setDeleteMode}
                        />
                        {(this.state.deleteMode) 
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
                    <Modal
                        visible={this.state.addContactModalOpen != null}
                        onRequestClose={this.closeAddContactModal}
                    >
                        <AddContactModal onContactAdded={this.closeAddContactModal} />
                    </Modal>
                    {(this.state.deleteMode == true)
                        ? <View>
                            <Text style={{color: 'white'}}>Are you sure you want to remove the selected contacts?</Text>
                            <Button title="Yes" onPress={this.confirmContactsDelete} />
                            <Button title="No" onPress={this.cancelActions} />
                        </View>
                        : null
                    }
                </LinearGradient>
                {contactsList}
                <View style={{...styles.spacer, backgroundColor: '#7db9e8'}}></View>
            </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    contactHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    viewContainer: {
        padding: 10
    },
    listContainer: {
        flex: 1
    },
    listsActionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    spacer: {
        height: 25
    }
});

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(actions.setContacts()),
        deleteContacts: (contacts) => dispatch(actions.deleteContacts(contacts))
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactsReducer.contacts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);