import * as actionTypes from './actionTypes';

export const setContacts = (contacts) => {
    return {
        type: actionTypes.SET_CONTACTS,
        contacts: contacts
    }
}

export const addContact = (contact) => {
    return {
        type: actionTypes.ADD_CONTACT,
        contact: contact
    }
}

export const deleteContacts = (contacts) => {
    return {
        type: actionTypes.DELETE_CONTACTS,
        data: contacts
    }
}