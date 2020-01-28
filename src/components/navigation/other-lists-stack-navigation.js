import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SharedListView from '../shared-list-view/shared-list-view';
import ListChat from '../list-chat/list-chat';

const SharedListStackNavigator = createStackNavigator({
    "SharedLists": {
        screen: SharedListView
    },
    "ChatScreen": {
        screen: ListChat
    }
},
{
    headerMode: 'none'
});

export default OtherListsNavigator = createStackNavigator({
    "SharedListView": {
        screen: SharedListStackNavigator
    }
},
{
    headerMode: 'none',
    mode: 'modal'
})