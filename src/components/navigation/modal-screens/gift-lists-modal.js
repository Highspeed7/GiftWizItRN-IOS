import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, SafeAreaView, Button } from 'react-native';
import GiftListDetail from '../../gift-list/gift-list-detail';

class GiftListsModal extends Component {
    render() {
        return (
            <SafeAreaView>
                <GiftListDetail
                    list={this.props.activeList}
                />
            </SafeAreaView>
        )
    }
}

mapStateToProps = (state, props) => {
    return {
        ...props.navigation.state.params,
        activeList: state.giftListsReducer.currentActiveGiftList
    }
}

export default connect(mapStateToProps)(GiftListsModal);