import * as actionTypes from "../actions/actionTypes";
import axios from 'axios';

const apiInterceptor = store => next => async action => {
    switch(action.type) {
        case actionTypes.SET_GIFTLISTS:
            let token = store.getState().authReducer.accessToken;
            try {
                await axios.get('https://giftwizitapi.azurewebsites.net/api/GiftLists', {headers: {'Authorization': `bearer ${token}`}}).then((response) => {
                    action.giftLists = response.data;     
                })
            }catch(error) {
                console.log(error);
                action.type = "LIST_FAIL";
            }
        default: next(action);
    }
}

export default apiInterceptor;