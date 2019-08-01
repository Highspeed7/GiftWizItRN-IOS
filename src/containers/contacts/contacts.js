import React, {Component} from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Contacts extends Component {
    componentDidMount() {
        this.props.getContacts()
    }
    render() {
        const contactsList = (this.props.contacts !== null)
            ? <ScrollView>
                <FlatList 
                    horizontal={false}
                    data={this.props.contacts}
                    renderItem={(contact) => (
                        <View>
                            <Text>{contact.item.contact.name}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            : <Text>There are no contacts yet...</Text>
        return (
            <View>
                <View>
                    <Text>Your Contacts</Text>
                </View>
                {contactsList}
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);