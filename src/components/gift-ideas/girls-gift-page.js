import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class GirlsGiftPage extends Component {
    render(){
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Girls Gift Ideas Page" />
        )
    }
}

export default GirlsGiftPage;