import React, {Component} from 'react';
import { Text } from 'react-native';
import GiftIdeasPage from './gift-ideas-page';

class WeddingsPage extends Component {
    render() {
        return (
            <GiftIdeasPage navigation={this.props.navigation} title="Wedding Ideas Page" />
        )
    }
}

export default WeddingsPage;