import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Swatch from '../swatch/swatch';

class WebViewNav extends Component {
    render() {
        return (
            <View style={styles.browserActionContainer}>
                <TouchableOpacity onPress={() => this.props.onBack()}>
                    <Swatch>
                        <FontAwesome5
                            name="chevron-left"
                            color="black"
                            size={25}
                        />
                    </Swatch>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onForward()}>
                    <Swatch>
                        <FontAwesome5
                            name="chevron-right"
                            color="black"
                            size={25}
                        />
                    </Swatch>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    browserActionContainer: {
        flexDirection: 'row',
        maxHeight: 40
    }
})

export default WebViewNav;