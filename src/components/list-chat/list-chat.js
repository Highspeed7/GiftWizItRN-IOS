import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, TextInput, Button, View, Text, FlatList, ScrollView, Keyboard, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

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
    componentDidMount = async () => {
        await this.props.getListMessages(this.props.activeList.giftListId);
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
        messages = (this.props.sessionChatMessages.length > 0) 
            ? <FlatList
                keyboardShouldPersistTaps="always"
                inverted={true}
                data={this.props.sessionChatMessages}
                renderItem={(messageData, i) => (
                    <Card key={i}>
                            <Text style={{fontWeight: 'bold', marginBottom: 5}}>{(messageData.item.fromUser || messageData.item.userName) + ' said: '}</Text>
                            <Text>{messageData.item.message}</Text>
                    </Card>
                )}
            />
            : null
        return (
            <KeyboardAvoidingView style={styles.viewContainer}>
                <View
                    style={{paddingBottom: 25, flex: 1, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Let's talk about the list '{this.props.activeList.giftListName}'</Text>
                    {messages}
                </View>
                <View style={styles.inputArea}>
                    <View style={{flex: 3}}>
                        <TextInput
                            blurOnSubmit={false}
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
            </KeyboardAvoidingView>
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
    },
    buttonText: {
        fontSize: 18,
        color: 'grey'
    }
});

mapDispatchToProps = dispatch => {
    return {
        sendMessageToList: (messageData) => dispatch(actions.sendMessageToList(messageData)),
        getListMessages: (giftListId) => dispatch(actions.getListMessages(giftListId))
    }
}

mapStateToProps = state => {
    return {
        sessionChatMessages: state.giftListsReducer.sessionChatMessages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChat);