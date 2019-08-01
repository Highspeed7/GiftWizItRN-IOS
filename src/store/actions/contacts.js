import * as actionTypes from './actionTypes';

export const setContacts = (contacts) => {
    return {
        type: actionTypes.SET_CONTACTS,
        contacts: contacts
    }
}