import React, {Component} from 'react'
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { SafeAreaView } from 'react-native';

class MaterialTopTabBarWrapper extends Component {
    render() {
      return (
        <SafeAreaView
          style={{ backgroundColor: '#2196f3' }}
          forceInset={{ top: 'always', horizontal: 'never', bottom: 'never' }}>
          <MaterialTopTabBar {...this.props} />
        </SafeAreaView>
      );
    }
  }

  export default MaterialTopTabBarWrapper;