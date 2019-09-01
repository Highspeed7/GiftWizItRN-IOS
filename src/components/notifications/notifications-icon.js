import React, {Component} from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

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
                    containerStyle={{ position: 'absolute', top: -4, right: -10 }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        counter: state.notificationsReducer.notificationCount
    }
}

export default connect(mapStateToProps)(NotificationsIcon);