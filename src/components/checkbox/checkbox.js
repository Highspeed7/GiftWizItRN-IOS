import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

class Checkbox extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.props.onSelected(this.props.item)}>
                {(this.props.isSelected) 
                    ? <View style={styles.selectedContainer}>
                            <FontAwesome5 
                                style={styles.selectedIcon}
                                name="check"
                                color="white"
                                size={20}
                            />
                        </View>
                    : null  
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 1,
        margin: 1
    },
    selectedIcon: {
        position: 'absolute',
        top: 1,
        alignSelf: 'center'
    },
    selectedContainer: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        width: '100%',
        justifyContent: 'center'
    }
})

export default Checkbox;