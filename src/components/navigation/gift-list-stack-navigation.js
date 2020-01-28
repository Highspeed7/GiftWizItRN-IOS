import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import GiftListsModal from '../../components/navigation/modal-screens/gift-lists-modal';
import ShareListScreen from './screens/share-list-screen';
import ListChat from '../list-chat/list-chat';
import GiftListEdit from '../gift-list/edit-modal/gift-list-edit';
import GiftListAdd from '../gift-list/add-modal/gift-list-add';

const GiftListDetailStack = createStackNavigator({
    "GiftListDetails": {
        screen: GiftListsModal
    },
    "ShareScreen": {
        screen: ShareListScreen
    },
    "ChatScreen": {
        screen: ListChat
    },
    "EditScreen": {
        screen: GiftListEdit
    },
    "AddScreen": {
        screen: GiftListAdd
    }
},
{
    headerMode: 'none'
})

export default GiftListModalStackNavigator = createStackNavigator({
    "GiftListDetailModal": {
        screen: GiftListDetailStack
    }
},
{
    headerMode: 'none',
    mode: 'modal'
})