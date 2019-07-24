import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import { withNavigation } from 'react-navigation';

class Content2 extends Component {
    onNavigateButtonPressed = () => {
        this.props.navigation.navigate("Content3");
    }
    render() {
        return (
            <View>
                <Text>Content 2 Screen</Text>
                <Button title="Navigation to content 3" onPress={this.onNavigateButtonPressed} />
            </View>
        )
    }
}

export default withNavigation(Content2);