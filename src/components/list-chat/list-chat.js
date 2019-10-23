import React, { Component } from 'react';
import {StyleSheet, TextInput, Button, View, Text } from 'react-native';

class ListChat extends Component {
    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10}}>

                </View>
                <View style={styles.inputArea}>
                    <View style={{flex: 3}}>
                        <TextInput
                            style={{minWidth: '85%', maxWidth: '85%', maxHeight: 150, textAlignVertical: "top"}} 
                            placeholder="Enter your message..." 
                            multiline={true}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button style={{justifyContent: 'center'}} title="Send" />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    },
    inputArea: {
        flexDirection: 'row',
        position: 'relative',
        bottom: 0
    }
});

export default ListChat;