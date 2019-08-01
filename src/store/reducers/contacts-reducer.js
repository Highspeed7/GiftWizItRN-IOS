import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contacts: null
};

const contactsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
    }
    return state;
}

export default contactsReducer;