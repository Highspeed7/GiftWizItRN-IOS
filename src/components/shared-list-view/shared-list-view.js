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
    Alert 
} from 'react-native';

import * as actions from '../../store/actions/index';
import Swatch from '../../components/swatch/swatch';
import SharedListItem from './shared-list-item';

class SharedListView extends Component {
    state = {
        activeItem: null
    }
    componentDidMount = () => {
        this.props.connectToListChatChannel(this.props.list.giftListId);
    }
    componentWillUnmount = () => {
        this.props.disconnectFromListChatChannel(this.props.list.giftListId);
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
                <View>
                    <Button title="Test Chat" onPress={this.testChat} />
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