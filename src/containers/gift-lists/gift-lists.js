import React, {Component} from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class GiftLists extends Component {
    componentDidMount() {
        this.props.getLists();
    }
    render() {
        const giftLists = (this.props.giftLists !== null)
            ? <ScrollView>
                <FlatList
                    horizontal={false}
                    data={this.props.giftLists}
                    renderItem={(list) => (
                        <Text>{list.item.name}</Text>
                    )}
                />
            </ScrollView>
            : <Text>No gift lists yet...</Text>
        return (
            <View>
                <View>
                    <Text>Your Gift Lists</Text>
                </View>
                {giftLists}
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLists: () => dispatch(actions.setGiftLists())
    }
}

const mapStateToProps = state => {
    return {
        giftLists: state.giftListsReducer.giftLists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftLists);