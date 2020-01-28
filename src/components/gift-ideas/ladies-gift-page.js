import React, {Component} from 'react';
import { Text, Button } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class LadiesGiftPage extends Component {
    render(){
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Ladies Gift Ideas Page" />
        )
    }
}

export default LadiesGiftPage;