import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, Button, SafeAreaView } from 'react-native';
import ShareGiftList from '../../../components/gift-list/share-modal/gift-list-share';

class ShareListScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Button title="Back to List" onPress={() => this.props.navigation.goBack()} />
                <ShareGiftList activeList={this.props.activeList} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeList: state.giftListsReducer.currentActiveGiftList
    }
}

export default connect(mapStateToProps)(ShareListScreen);