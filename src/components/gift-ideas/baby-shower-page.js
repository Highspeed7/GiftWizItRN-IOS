import React, {Component} from 'react';
import { Text, Button } from 'react-native';

class BabyShowerPage extends Component {
    render(){
        return ([
            <Text>Baby Shower Page</Text>,
            <Button title="Back to Gift Ideas page" onPress={this.props.navigation.pop}/>
        ])
    }
}

export default BabyShowerPage;