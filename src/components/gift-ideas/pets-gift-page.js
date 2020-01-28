import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class PetsGiftPage extends Component {
    render(){
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Pets Gift Ideas Page" />
        )
    }
}

export default PetsGiftPage;