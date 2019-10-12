import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';
import * as actions from '../actions/index';
import { sleep } from '../../utils/utils';

const apiInterceptor = store => next => async action => {
    let token = null;
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());

                let commonHeaders = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists', {headers: commonHeaders}).then((response) => {
                    action.giftLists = response.data;
                    store.dispatch(actions.uiStopLoading());
                })
            }catch(error) {
                console.log(error);
                action.type = "LIST_FAIL";
                store.dispatch(actions.uiStopLoading()); 
            }
            break;
        case actionTypes.SET_GLIST_ITEMS:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }

                let body = {
                    gift_list_id: action.key
                }

                let config = {
                    headers: headerObj,
                    params: body
                }
                    
                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftListItems', config).then((response) => {
                    action.payload = {
                        giftItems: response.data
                    }
                    store.dispatch(actions.uiStopLoading()); 
                });
                break;
            }catch(error) {
                store.dispatch(actions.uiStopLoading()); 
            }
        case actionTypes.SET_CONTACTS:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/Contacts/Get', {headers: headerObj}).then((response) => {
                    action.contacts = response.data;
                    store.dispatch(actions.uiStopLoading());
                });
            }catch(error) {
                store.dispatch(actions.uiStopLoading());
                console.log(error);
                action.type = "SET_CONTACTS_FAILED";
            }
            break;
        case actionTypes.SET_WISH_LIST:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/WishList', {headers: headerObj}).then((response) => {
                    action.wishList = response.data;
                });
            }catch(error) {
                console.log(error);
                action.type = "SET_WISH_LIST_FAILED";
            }
            break;
        case actionTypes.MOVE_WISH_LIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }

                let body = action.data;

                let config = {
                    headers: headerObj,
                };
                await axios.post('http://giftwizitapi.azurewebsites.net/api/MoveItems', body, config).then((response) => {
                    store.dispatch(actions.setWishList());
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.ADD_NEW_GIFT_LIST:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/GiftLists', body, config).then((response) =>{
                    // store.dispatch(actions.setGiftLists());
                    // Notification will update lists.
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.ADD_WISH_LIST_ITEM:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/Items', body, config).then((response) => {
                    store.dispatch(actions.setWishList());
                })
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.MOVE_GLIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/MoveGiftItem', body, config).then((response) => {
                    store.dispatch(actions.setGiftListItems(action.data[0].g_List_Id));
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.EDIT_GIFT_LIST:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                };
                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/GiftLists/Update', body, config).then((response) => {
                    action.data = response.data;
                    store.dispatch(actions.uiStopLoading());
                });
            }catch(error) {
                store.dispatch(actions.uiStopLoading());
            }
            break;
        case actionTypes.SHARE_GIFT_LIST:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());

                console.log(`Using this token for share call: ${token}`);

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/ShareGiftList', body, config).then((res) => {
                    console.log(res);
                });

            }catch(error) {
                console.log(error);
                store.dispatch(actions.uiStopLoading());
            }
            break;
        case actionTypes.GET_SHARED_LISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/SharedList/Contacts', {headers: headerObj}).then((response) => {
                    action.sharedLists = response.data;
                });
            }catch(error) {

            }
            break;
        case actionTypes.SEARCH_PUBLIC_LISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post('http://giftwizitapi.azurewebsites.net/api/SearchPublicLists', body, config).then((response) => {
                   action.data = response.data;
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.SET_PUBLIC_LIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                await axios.get(`http://giftwizitapi.azurewebsites.net/api/SearchPublicListItems?giftListId=${action.key}`).then((response) => {
                    action.payload = {
                        giftItems: response.data
                    };
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.DELETE_WISH_LIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post("http://giftwizitapi.azurewebsites.net/api/WishList/ItemDelete", body, config).then((resposne) => {
                    store.dispatch(actions.setWishList());
                });
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.SET_NOTIFICATIONS_COUNT:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let config = {
                    headers: headerObj
                };

                await axios.get("http://giftwizitapi.azurewebsites.net/api/NotificationsCount", config).then((response) => {
                    action.value = response.data;
                });
            }catch(error) {
                
            }
            break;
        case actionTypes.GET_NOTIFICATIONS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let config = {
                    headers: headerObj
                };

                await axios.get("http://giftwizitapi.azurewebsites.net/api/UserNotifications", config).then((res) => {
                    action.payload = res.data;
                });
            }catch(error) {
                console.log("Error: ", error);
            }
            break;
        case actionTypes.FETCH_NEXT_NOTIF_PAGE:
            try {
                token = await store.dispatch(actions.getAuthToken());
                const state = store.getState();

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let config = {
                    headers: headerObj
                };

                await axios.get(`http://giftwizitapi.azurewebsites.net/api/UserNotifications?pageCount=${state.notificationsReducer.notifications.currentPage + 1}`, config)
                    .then((response) => {
                        action.payload = response.data;
                    });

            }catch(error) {
                console.log("Error: ", error);
            }
            break;
        case actionTypes.GET_USER_SHARED_FROM_LISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let config = {
                    headers: headerObj
                };

                await axios.get("http://giftwizitapi.azurewebsites.net/api/AllSharedLists", config).then((response) => {
                    action.data = response.data;
                })
            }catch(error) {

            }
            break;
        case actionTypes.SET_USER_SHARED_LIST_ITEMS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let config = {
                    headers: headerObj
                };

                await axios.post(`https://giftwizitapi.azurewebsites.net/api/GetUserSharedListItems?listId=${action.key}`, null, config).then((response) => {
                    action.data = response.data;
                });

            }catch(error) {
                console.log("Error: ", error);
            }
            break;
        case actionTypes.DELETE_GIFT_LISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                let config = {
                    headers: headerObj
                };

                await axios.post("https://giftwizitapi.azurewebsites.net/api/GiftLists/Delete", body, config).then((response) => {
                    store.dispatch(actions.setGiftLists());
                })
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.ADD_CONTACT:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.contact;

                config = {
                    headers: headerObj
                };

                await axios.post("https://giftwizitapi.azurewebsites.net/api/Contacts/Add", body, config).then((response) => {
                    store.dispatch(actions.setContacts());
                    store.dispatch(actions.uiStopLoading());
                })
            }catch(error) {
                console.log(error);
            }
            break;
        case actionTypes.DELETE_CONTACTS:
            try {
                store.dispatch(actions.uiStartLoading());
                token = await store.dispatch(actions.getAuthToken());

                let headerObj = {
                    'Authorization': `bearer ${token}`
                };

                let body = action.data;

                config = {
                    headers: headerObj
                };

                await axios.post("https://giftwizitapi.azurewebsites.net/api/Contacts/Delete", body, config).then((response) => {
                    store.dispatch(actions.uiStopLoading());
                });
            }catch(error) {
                store.dispatch(actions.uiStopLoading());
            }
    }
    next(action);
}
export default apiInterceptor;