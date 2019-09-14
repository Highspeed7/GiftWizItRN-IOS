import React, {Component} from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    Button
} from 'react-native';
import { connect } from 'react-redux';

import Checkbox from '../../checkbox/checkbox';
import * as actions from '../../../store/actions/index';

class ShareGiftList extends Component {
    state = {
        selectedContacts: [],
        shareableContacts: []
    }
    componentDidMount = async () => {
        this.props.getContacts();
        await this.props.getSharedLists();
        this.setShareableContacts();
    }
    setShareableContacts = () => {
        console.log(this.props);

        let listSharedContacts = this.props.sharedLists.map((sharedList) => {
            const activeListId = this.props.activeList.id
            if(sharedList.giftListId == activeListId) {
                return sharedList.contact
            }
        }).filter((el) => {
            return el != null;
        });

        let filteredListContacts = this.props.contacts.slice(0);

        if(listSharedContacts.length > 0) {
            for(var i = 0; i < filteredListContacts.length; i++) {
                listSharedContacts.forEach((listContact) => {
                    if(listContact.email == filteredListContacts[i].contact.email) {
                        filteredListContacts.splice(i, 1);
                    }
                })
            }
        }

        this.setState({
            shareableContacts: filteredListContacts
        });
    }
    onContactSelected = (contact) => {
        let contactId = contact.contact.contactId;
        let contactIndex = this.isContactSelected(contactId);
        if(contactIndex != -1) {
            const nowSelectedContacts = this.state.selectedContacts.slice();
            nowSelectedContacts.splice(contactIndex, 1);
            this.setState({selectedContacts: nowSelectedContacts});
        }else {
            this.setState((prevState, props) => {
                return {
                    selectedContacts: prevState.selectedContacts.concat(contactId)
                }
            })
        }
    }
    onListShared = async () => {
        // Construct the share data object
        let shareData = {};
        let contacts = this.props.contacts.filter((contact) => {
            let contactId = contact.contact.contactId;
            return (this.isContactSelected(contactId) != -1);
        })

        shareData.contacts = contacts;
        shareData.g_List_Id = this.props.activeList.id

        await this.props.shareGiftList(shareData);
        await this.props.getSharedLists();
        this.setShareableContacts();
        this.props.stopUiLoading();
    }
    isContactSelected = (contactId) => {
        return this.state.selectedContacts.indexOf(contactId);
    }
    render() {
        const contacts = (this.state.shareableContacts.length > 0)
            ? this.state.shareableContacts.map((contact) => {
                let doCheck = this.isContactSelected(contact.contact.contactId) != -1;
                return <View style={{flexDirection: 'row', height: 55}}>
                            <Checkbox 
                                item={contact} 
                                onSelected={this.onContactSelected}
                                isSelected={doCheck}
                            />
                            <View style={{paddingLeft: 10, height: 30, justifyContent: 'center'}}>
                                <Text>{contact.contact.name}</Text>
                            </View>
                        </View>
            })
            : <Text>Either you have no contacts, or you have shared this list with all of them.</Text>
        return (
            <View style={styles.mainViewContainer}>
                <View style={{marginBottom: 40}}>
                    <Text style={{fontSize: 20}}>Share {this.props.activeList.name}</Text>
                </View>
                <View style={{paddingBottom: 10, paddinTop: 10}}>
                    <Text style={{fontSize: 24}}>with...</Text>
                </View>
                <ScrollView>
                    {contacts}
                </ScrollView>
                <Button title="Share" onPress={() => this.onListShared()} />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(actions.setContacts()),
        getSharedLists: () => dispatch(actions.getSharedLists()),
        shareGiftList: (shareData) => dispatch(actions.shareGiftList(shareData)),
        stopUiLoading: () => dispatch(actions.uiStopLoading())
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactsReducer.contacts,
        sharedLists: state.sharedListsReducer.sharedLists
    }
}

const styles = StyleSheet.create({
    mainViewContainer: {
        padding: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareGiftList);