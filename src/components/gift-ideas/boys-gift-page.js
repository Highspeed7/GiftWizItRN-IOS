import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class BoysGiftPage extends Component {
    render(){
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Boys Gift Ideas Page" />
        )
    }
}

export default BoysGiftPage;