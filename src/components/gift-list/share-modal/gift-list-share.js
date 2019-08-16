import React, {Component} from 'react';
import { View, Text, Picker, PickerItem } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ShareGiftList extends Component {
    state = {
        selectedContact: null
    }
    onContactSelected = (contactId, position) => {
        this.setState({
            selectedContact: contactId
        });
    }
    componentDidMount() {
        this.props.getContacts();
    }
    render() {
        const contacts = (this.props.contacts.length > 0)
            ? this.props.contacts.map((contact) => (
                <Picker.Item
                    key={contact.contact.contactId}
                    label={contact.contact.name}
                    value={contact.contact.contactId}
                />
            ))
            : null
        return (
            <View>
                <Text>Share the gift list.</Text>
                <Picker
                    selectedValue={this.state.selectedContact}
                    onValueChange={this.onContactSelected}
                    mode="dropdown"
                    >{contacts}
                </Picker>
            </View>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ShareGiftList);