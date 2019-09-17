import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';
import * as actions from '../actions/index';

const notificationActionInterceptor = store => next => async action => {
    switch(action.type) {
        case "NOTIFICATION_RECIEVED":
        {
            switch(action.data.type) {
                case "ListShared":
                {
                    store.dispatch(actions.getUserSharedByLists());
                    store.dispatch(actions.setNotificationsCount());
                    break;
                }
                case "ListCreated":
                {
                    store.dispatch(actions.setGiftLists());
                    store.dispatch(actions.setNotificationsCount());
                    break;
                }
                case "ContactDeleted":
                {
                    store.dispatch(actions.setContacts());
                    store.dispatch(actions.setNotificationsCount());
                    break;
                }
            }
            break;
        }
    }
    next(action);
}

export default notificationActionInterceptor;