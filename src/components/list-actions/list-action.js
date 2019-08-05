import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Swatch from '../swatch/swatch';

class ListAction extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchableSwatch} onPress={this.props.onPressed}>
                <Swatch> 
                    <View style={styles.iconContainer}>
                        {this.props.icon()}
                    </View>                   
                </Swatch>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    iconContainer: {padding: '25%', height: '100%', flex: 1, alignItems: 'center'}
});

export default ListAction;