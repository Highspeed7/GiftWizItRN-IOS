import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Modal,
    Button,
    AppState, 
    Alert 
} from 'react-native';

import * as actions from '../../store/actions/index';
import Swatch from '../../components/swatch/swatch';
import SharedListItem from './shared-list-item';
import ListAction from '../list-actions/list-action';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListChat from '../list-chat/list-chat';

class SharedListView extends Component {
    state = {
        activeItem: null,
        appState: AppState.currentState,
        chatModalActive: null
    }
    componentDidMount = async () => {
        AppState.addEventListener('change', this.handleAppStateChange);
        await this.props.connectToListChatChannel(this.props.list.giftListId);
    }
    componentWillUnmount = () => {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.props.disconnectFromListChatChannel(this.props.list.giftListId);
    }
    handleAppStateChange = async (nextAppState) => {
        this.setState({
            appState: nextAppState
        });
        if(this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            await this.props.connectToListChatChannel(this.props.list.giftListId);
        }else if(nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            await this.props.disconnectFromListChat(this.props.list.giftListId);
        }
    }
    setChatModalActive = () => {
        this.setState({
            chatModalActive: true
        });
    }
    setChatModalInactive = () => {
        this.setState({
            chatModalActive: null
        });
    }
    testChat = () => {
        let chatContext = {
            message: 'Hello World',
            listId: this.props.list.giftListId
        };
        this.props.testChat(chatContext);
    }
    render() {
        let {listItems} = this.props.list;
        listItems = (listItems != null && listItems.length > 0)
            ? this.props.list.listItems.map((item) => 
                (
                    <TouchableOpacity key={item.item_Id} style={styles.touchableSwatch} onPress={() => {this.props.itemSelected(item)}}>
                        <Swatch style={{justfiyContent: 'center'}}>
                            <Image style={styles.itemImage} source={{uri: item.image}} />
                        </Swatch>
                        <Modal
                            visible={item.active != null}
                            onRequestClose={() => this.props.itemClosed(item.item_Id)}
                        >
                            <SharedListItem item={item} />
                        </Modal>
                    </TouchableOpacity>
                )
            )
            : null
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text style={styles.listTitleHeader}>{this.props.list.giftListName}</Text>
                </View>
                <View style={styles.listsContainer}>
                    <ListAction
                        title="Message"
                        icon={() => (
                            <FontAwesome5
                                name={'comment-alt'} solid
                                color="black"
                                size={25}
                            />
                        )}
                        onPressed = {this.setChatModalActive}
                    >
                        <Modal
                            visible={this.state.chatModalActive != null}
                            onRequestClose={() => this.setChatModalInactive()}
                        >
                            <ListChat />
                        </Modal>
                    </ListAction>
                </View>
                <ScrollView>
                    <View style={styles.listsContainer}>
                        {listItems}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    listTitleHeader: {
      fontSize: 24,
      fontWeight: 'bold'  
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    touchableSwatch: {
        width: '24%',
        margin: 1
    },
    listsContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

mapDispatchToProps = dispatch => {
    return {
        connectToListChatChannel: (list_id) => dispatch(actions.connectToListChat(list_id)),
        disconnectFromListChatChannel: (list_id) => dispatch(actions.disconnectFromListChat(list_id)),
        testChat: (chatContext) => dispatch({type: "TEST_CHAT", data: chatContext})
    }
}

export default connect(null, mapDispatchToProps)(SharedListView);