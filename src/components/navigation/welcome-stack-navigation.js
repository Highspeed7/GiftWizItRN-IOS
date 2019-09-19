import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from '../../containers/welcome/welcome';
import Facts from '../info-content/introduction-card/facts';

export default WelcomeStackNavigator = createStackNavigator(
    {
      "Welcome": Welcome,
      "Facts": Facts
    },
    {
      defaultNavigationOptions: {
          headerTitle: (
            <View style={{width: '100%'}}>
              <Image
                style={{width: 150, height: '100%', alignSelf: 'center'}} 
                source={{uri: 'https://giftwizit.com/assets/images/gw_logo2.png'}}
              />
            </View>
          ),
          headerStyle: {
            height: 65
          }
      }
    }
  );