import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, TextInput, Button, View, Text, FlatList, ScrollView, Keyboard } from 'react-native';

import * as actions from '../../store/actions/index';
import { Card } from 'react-native-elements';

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
        Keyboard.dismiss();
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
        messages = (this.props.sessionChatMessages.length > 0) 
            // ? <FlatList
            //     style={{borderWidth: 1, borderColor: 'red'}}
            //     data={this.props.sessionChatMessages}
            //     renderItem={(messageData) => {
            //         <Text>{messageData.item.fromUser + ': ' + messageData.item.message}</Text>
            //     }}
            // />
            ? this.props.sessionChatMessages.map((message) => (
                <Card>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{message.fromUser + ' says: '}</Text>
                    <Text>{message.message}</Text>
                </Card>
            ))
            : null
        return (
            <View style={styles.viewContainer}>
                <ScrollView
                    keyboardShouldPersistTaps={"handled"}
                    keyboardDismissMode='on-drag' 
                    style={{flex: 1, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Let's talk about the list '{this.props.activeList.giftListName}'</Text>
                    {messages}
                </ScrollView>
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
        sessionChatMessages: state.giftListsReducer.sessionChatMessages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChat);