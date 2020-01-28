import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class GentlemenGiftPage extends Component {
    render(){
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Gentlemen Gift Ideas Page" />
        )
    }
}

export default GentlemenGiftPage;