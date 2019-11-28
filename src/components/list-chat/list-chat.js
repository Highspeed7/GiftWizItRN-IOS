import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, TextInput, Button, View, Text, FlatList, ScrollView, Keyboard, Alert, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import * as actions from '../../store/actions/index';
import { Card } from 'react-native-elements';
import { timestampUTCToLocalReadable } from '../../utils/utils';

class ListChat extends Component {
    activeListId = null;
    state = {
        messageText: "",
    }
    textEntered = (value) => {
        this.setState({
            messageText: value
        });
    }
    componentDidMount = async () => {
        if(this.props.activeList != null) {
            this.activeListId = this.props.activeList.giftListId || this.props.activeList.id
        }else {
            this.activeListId = this.props.activeSharedList.giftListId;
        }
        await this.props.getListMessages(this.activeListId);
    }
    componentFocused = () => {

    }
    sendMessage = async () => {
        var date = Date.now();
        const messageData = {
            message: this.state.messageText,
            giftListId: this.activeListId
        };

        await this.props.sendMessageToList(messageData)
        this.setState({
            messageText: ""
        });
    }
    fetchNextPage = async () => {
        if(this.props.messagePagingData.rowCount > this.props.sessionChatMessages.length) {
            await this.props.getListMessages(this.activeListId);
        }
        return;
    }
    render() {
        messages = (this.props.sessionChatMessages.length > 0) 
            ? <FlatList
                onEndReached={this.fetchNextPage}
                onEndReachedThreshold={1}
                keyboardShouldPersistTaps="always"
                inverted={true}
                data={this.props.sessionChatMessages}
                renderItem={(messageData, i) => {
                    var timestamp = timestampUTCToLocalReadable(messageData.item.createdAt);
                    return (<Card key={i}>
                                <View>
                                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{(messageData.item.fromUser || messageData.item.userName) + ` said: (${timestamp})`}</Text>
                                </View>
                                <View>
                                    <Text>{messageData.item.message}</Text>
                                </View>
                            </Card>)
                    }}
            />
            : null
        return (
            <SafeAreaView style={{flex: 1}}>
                <NavigationEvents onDidFocus={this.componentFocused} />
                <KeyboardAvoidingView style={styles.viewContainer}>
                    <View
                        style={{paddingBottom: 25, flex: 1, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10}}>
                        <Button title="Leave" onPress={() => this.props.navigation.goBack()} />
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Let's talk about the list '{this.props.listTitle}'</Text>
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
            </SafeAreaView>
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
        sessionChatMessages: state.giftListsReducer.sessionChatMessages,
        messagePagingData: state.giftListsReducer.messagePagingData,
        activeList: state.giftListsReducer.currentActiveGiftList,
        activeSharedList: state.sharedListsReducer.currentActiveSharedList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChat);