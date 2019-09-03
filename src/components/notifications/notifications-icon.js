import React, {Component} from 'react'
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

class NotificationsIcon extends Component {
    render() {
        return (
            <View>
                <FontAwesome5
                    name="bell"
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