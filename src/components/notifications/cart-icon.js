import React, {Component} from 'react'
import { View, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

class CartIcon extends Component {
    render() {
        return (
            <View>
                <FontAwesome5
                    name="shopping-cart"
                    color="black"
                    size={25}
                    style={{marginRight: 10}}
                />
                <Badge
                    value={this.props.cartCount}
                    containerStyle={{position: 'absolute', bottom: -4, left: -5 }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartCount: state.storeFrontReducer.cartCount
    }
}

export default connect(mapStateToProps)(CartIcon);