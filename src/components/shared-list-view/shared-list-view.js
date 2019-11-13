import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Modal
} from 'react-native';
import { Badge, Overlay } from 'react-native-elements';

import * as actions from '../../store/actions/index';
import Swatch from '../../components/swatch/swatch';
import SharedListItem from './shared-list-item';
import ListAction from '../list-actions/list-action';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListChat from '../list-chat/list-chat';

class SharedListView extends Component {
    state = {
        activeItem: null,
        chatModalActive: null
    }
    componentDidMount = async () => {
        await this.props.connectToListChatChannel(this.props.list.giftListId);
        await this.props.getListMessageCount(this.props.list.giftListId);
    }
    componentWillUnmount = () => {
        this.props.disconnectFromListChatChannel(this.props.list.giftListId);
    }
    setChatModalActive = () => {
        this.setState({
            chatModalActive: true
        });
    }
    setChatModalInactive = async () => {
        this.props.clearChatMessages();
        this.setState({
            chatModalActive: null
        });
        await this.props.getListMessageCount(this.props.list.giftListId);
    }
    itemLongPressed = (item) => {

    }
    render() {
        let {listItems} = this.props.list;
        listItems = (listItems != null && listItems.length > 0)
            ? this.props.list.listItems.map((item) => 
                (
                    <TouchableOpacity onLongPress={() => this.itemLongPressed(item)} key={item.item_Id} style={styles.touchableSwatch} onPress={() => {this.props.itemSelected(item)}}>
                        <Swatch style={{justfiyContent: 'center'}}>
                            <Image style={styles.itemImage} source={{uri: item.image}} />
                        </Swatch>
                        <Overlay
                            overlayStyle={{height: '90%'}}
                            isVisible={item.active != null}
                            onBackdropPress={() => this.props.itemClosed(item.item_Id)}
                        >
                            <SharedListItem 
                                onStoreProductClicked={this.props.onStoreProductClicked}
                                item={item} />
                        </Overlay>
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
                            <ListChat
                                listTitle={this.props.list.giftListName} 
                                activeList={this.props.list}
                            />
                        </Modal>
                        <Badge
                            value={this.props.sessionListMessageCount}
                            containerStyle={{position: 'absolute', top: 20, left: '53%'}}
                        />
                    </ListAction>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
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
        clearChatMessages: () => dispatch(actions.clearChatMessages()),
        connectToListChatChannel: (list_id) => dispatch(actions.connectToListChat(list_id)),
        disconnectFromListChatChannel: (list_id) => dispatch(actions.disconnectFromListChat(list_id)),
        getListMessageCount: (list_id) => dispatch(actions.getListMessageCount(list_id))
    }
}

mapStateToProps = state => {
    return {
        sessionListMessageCount: state.giftListsReducer.sessionListMessageCount
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedListView);