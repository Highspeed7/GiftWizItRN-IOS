import React, { Component } from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class CustomHeaderButton extends Component {
    render() {
        return <HeaderButton {...this.props} 
                    IconComponent={FontAwesome5} 
                    iconSize={23}
                />
    }
}

export default CustomHeaderButton;