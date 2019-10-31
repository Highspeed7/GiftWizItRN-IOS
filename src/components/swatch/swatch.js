import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Swatch extends Component {
    render() {
        return (
            <LinearGradient colors={['#e6e6e6', '#ffffff', '#e6e6e6']} style={[styles.swatchContainer, this.props.style]}>
                {this.props.children}
            </LinearGradient>
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