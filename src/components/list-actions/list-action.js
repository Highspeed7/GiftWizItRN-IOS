import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import Swatch from '../swatch/swatch';

class ListAction extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchableSwatch} onPress={this.props.onPressed}>
                <Swatch> 
                    <View style={styles.iconContainer}>
                        {this.props.icon()}
                        <Text style={{color: "black"}}>{this.props.title}</Text>
                    </View>   
                    {this.props.children}                
                </Swatch>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        minWidth: 90,
        maxWidth: 90,
        margin: 1
    },
    iconContainer: {justifyContent: 'center', height: '100%', flex: 1, alignItems: 'center', paddingTop: '24%' }
});

export default ListAction;