import React, {Component} from 'react';
import { 
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    Alert,
    Modal } from 'react-native';
import { Card } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import ListAction from '../../components/list-actions/list-action';
import AddContactModal from '../../components/contacts/add-contact';

class Contacts extends Component {
    state = {
        addContactModalOpen: null
    }
    componentDidMount() {
        this.props.getContacts()
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
    render() {
        const contactsList = (this.props.contacts !== null)
            ? <ScrollView>
                <FlatList 
                    horizontal={false}
                    data={this.props.contacts}
                    renderItem={(contact) => (
                        <Card>
                            <Text style={{fontWeight: 'bold'}}>{contact.item.contact.contactUsers[0].contactAlias}</Text>
                            <Text>{contact.item.contact.email}</Text>
                        </Card>
                    )}
                />
            </ScrollView>
            : <Text>There are no contacts yet...</Text>
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text style={styles.contactHeading}>Your Contacts</Text>
                </View>
                <View>
                    <ListAction 
                        title="Add"
                        icon={() => (<FontAwesome5 
                            name="plus"
                            color="black"
                            size={25}
                        />)} 
                        onPressed = {this.addNewContactPressed}
                    />
                </View>
                {contactsList}
                <Modal
                    visible={this.state.addContactModalOpen != null}
                    onRequestClose={this.closeAddContactModal}
                >
                    <AddContactModal onContactAdded={this.closeAddContactModal} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contactHeading: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewContainer: {
        padding: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(actions.setContacts())
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactsReducer.contacts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);