import React, {Component} from 'react';
import { View, Text, Button} from 'react-native';
import { withNavigation } from 'react-navigation';

class Content1 extends Component {
    navButtonPressed = () => {
        this.props.navigation.navigate("Content2");
    }
    render() {
        return (
            <View>
                <Text>Content 1 Screen</Text>
                <Button onPress={this.navButtonPressed} title="Navigate to Content 2" />
            </View>
        )
    }
}

export default withNavigation(Content1);