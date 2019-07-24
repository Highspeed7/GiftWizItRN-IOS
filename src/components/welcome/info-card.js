import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

class InfoCard extends Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 150,
        borderColor: "transparent",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginTop: 15,
        padding: 10
    }
});

export default InfoCard;