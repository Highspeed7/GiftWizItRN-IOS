import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {NavigationActions} from 'react-navigation';

import Welcome from '../../containers/welcome/welcome';
import Facts from '../info-content/introduction-card/facts';
import GiftIdeasStackNavigator from './gift-ideas-navigation';

export default WelcomeStackNavigator = createStackNavigator(
    {
      "Welcome": Welcome,
      "Facts": Facts,
      "GiftIdeasNoAuth": {
        screen: GiftIdeasStackNavigator
      }
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return {
          headerLeft: ((navigation.dangerouslyGetParent().state.index > 0)
          ? <TouchableOpacity
            style={{paddingLeft: 10}} 
            onPress={() => navigation.navigate("Welcome")}
            >
              <Text>Home</Text>
            </TouchableOpacity>
          : null),
          headerTitle: (
            (navigation.dangerouslyGetParent().state.index == 0)
            ?<View style={{width: '100%'}}>
              <Image
                style={{width: 150, height: '100%', alignSelf: 'center'}} 
                source={{uri: 'https://giftwizit.com/assets/images/gw_logo2.png'}}
              />
            </View>
            : null
          ),
          headerStyle: {
            height: 65
          }
        }
      }
    }
  );