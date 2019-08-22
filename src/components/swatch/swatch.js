import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Swatch extends Component {
    render() {
        return (
            <View style={[styles.swatchContainer, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swatchContainer: {
        padding: 3,
        minHeight: 80,
        maxHeight: 80,
        width: '100%',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: 'transparent',
        elevation: 1,
        justifyContent: 'center',
    }
});

export default Swatch;