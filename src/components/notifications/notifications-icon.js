import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

class NotificationsIcon extends Component {
    render() {
        return (
            <View>
                <Icon 
                    name="md-list-box"
                    color="black"
                    size={25}
                />
                <Badge
                    value={this.props.counter}
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
            </View>
        )
    }
}

export default NotificationsIcon;