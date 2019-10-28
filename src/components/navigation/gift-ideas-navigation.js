import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import GiftIdeasHome from '../gift-ideas/gift-ideas-home';
import BabyShowerPage from '../gift-ideas/baby-shower-page';
import { TouchableOpacity, Text } from 'react-native';

export default GiftIdeasStackNavigator = createStackNavigator(
    {
        GiftIdeasHome:{
            screen: GiftIdeasHome
        },
        BabyShowerPage: {
            screen: BabyShowerPage
        }
    },
    {
        headerMode: 'none'
    }
);