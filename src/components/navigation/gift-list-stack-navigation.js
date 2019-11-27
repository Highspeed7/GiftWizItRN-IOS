import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import GiftListsModal from '../../components/navigation/modal-screens/gift-lists-modal';


export default GiftListModalStackNavigator = createStackNavigator({
    "GiftListDetailModal": {
        screen: GiftListsModal
    }
},
{
    headerMode: 'none',
    mode: 'modal'
})