import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';
import * as actions from '../actions/index';

const apiInterceptor = store => next => async action => {
    let token = null;
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            try {
                token = await store.dispatch(actions.getAuthToken());

                let commonHeaders = {
                    'Authorization': `bearer ${token}`
                }

                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists', {headers: commonHeaders}).then((response) => {
                    action.giftLists = response.data;     
                })
            }catch(error) {
                console.log(error);
                action.type = "LIST_FAIL";
            }
            break;
        case actionTypes.SET_GLIST_ITEMS:
            try {
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
                });
                break;
            }catch(error) {

            }
        case actionTypes.AUTH_START:
            console.log("Authentication Started");
            break;
        case actionTypes.SET_CONTACTS:
            try {
                token = await store.dispatch(actions.getAuthToken());
                let headerObj = {
                    'Authorization': `bearer ${token}`
                }
                await axios.get('http://giftwizitapi.azurewebsites.net/api/Contacts/Get', {headers: headerObj}).then((response) => {
                    action.contacts = response.data;
                });
            }catch(error) {
                console.log(error);
                action.type = "SET_CONTACTS_FAILED";
            }
            break;
        case actionTypes.AUTH_SUCCESS:
            next(action)
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
                    store.dispatch(actions.setGiftLists());
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
                });
            }catch(error) {

            }
            break;
        case actionTypes.SHARE_GIFT_LIST:
            try {
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
                    // Do nothing yet...
                });

            }catch(error) {
                console.log(error);
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
        default: next(action);
    }
    next(action);
}
export default apiInterceptor;