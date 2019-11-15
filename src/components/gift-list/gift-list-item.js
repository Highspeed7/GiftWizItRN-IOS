import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    ScrollView, 
    View, 
    TouchableOpacity, 
    Button,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class GiftListItem extends Component {
    claimItem = () => {
        var item = this.props.item;
        var itemId = item.item_Id;
        var listId = item.gift_List_Id

        this.props.claimItem({item_Id: itemId, list_Id: listId});
    }
    unclaimItem = () => {
        var item = this.props.item;
        var itemId = item.item_Id;
        var listId = item.gift_List_Id

        this.props.unClaimItem({item_Id: itemId, list_Id: listId});
    }
    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View>
                    <TouchableOpacity onPress={this.openModal}>
                        <View style={styles.listImageContainer}>
                            <Image style={styles.listImage} source={{uri: this.props.item.image}} />
                        </View>
                        <Text style={styles.itemText}>{this.props.item.itm_Name}</Text> 
                    </TouchableOpacity>
                </View>
                    <View style={{marginTop: 35}}>
                        {
                            (this.props.item.claimedBy != null) 
                                ? (this.props.userData.id == this.props.item.claimedById)
                                    ? [<Text>You've claimed you plan to buy this item...</Text>,
                                    <Button onPress={this.unclaimItem} title="Actually I've changed my mind" />]
                                    : <Text>
                                        {`${this.props.item.claimedBy} has indicated that they either have or intend to purchase this item.`}
                                    </Text>
                                : <Button onPress={this.claimItem} title="I'm buying this... no touchy!" />
                        }
                    </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listImageContainer: {
        minHeight: 250
    },
    listImage: {
        width: 150,
        height: 'auto',
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});

const mapStateToProps = state => {
    return {
        userData: state.authReducer.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        claimItem: (claimData) => dispatch(actions.claimListItem(claimData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListItem);