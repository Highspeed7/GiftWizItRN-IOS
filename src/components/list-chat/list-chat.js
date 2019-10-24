import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, TextInput, Button, View, Text } from 'react-native';

import * as actions from '../../store/actions/index';

class ListChat extends Component {
    state = {
        messageText: ""
    }
    textEntered = (value) => {
        this.setState({
            messageText: value
        });
    }
    sendMessage = async () => {
        const messageData = {
            message: this.state.messageText,
            giftListId: this.props.activeList.giftListId
        };

        await this.props.sendMessageToList(messageData)
        this.setState({
            messageText: ""
        });
    }
    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10}}>
                    <Text>Let's talk about the list '{this.props.activeList.giftListName}'</Text>
                </View>
                <View style={styles.inputArea}>
                    <View style={{flex: 3}}>
                        <TextInput
                            style={{minWidth: '85%', maxWidth: '85%', maxHeight: 150, textAlignVertical: "top"}} 
                            placeholder="Enter your message..."
                            onChangeText={this.textEntered} 
                            multiline={true}
                            value={this.state.messageText}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button 
                            disabled={this.state.messageText.length == 0} 
                            style={{justifyContent: 'center'}} 
                            title="Send" 
                            onPress={this.sendMessage}
                        />
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

mapDispatchToProps = dispatch => {
    return {
        sendMessageToList: (messageData) => dispatch(actions.sendMessageToList(messageData))
    }
}

mapStateToProps = state => {
    return {
        sessionChatMessages: state.giftListReducer.sessionChatMessages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChat);