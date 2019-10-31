import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import * as actions from '../../store/actions/index';
import { Card } from 'react-native-elements';

class GiftIdeasPage extends Component {
    componentDidMount = () => {
        this.props.setIdeaCollectionItems(this.props.activeCollection);
    }
    render() {
        const collectionsItems = (this.props.collectionItems && this.props.collectionItems.length > 0)
            ? <FlatList
                data={this.props.collectionItems}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {}}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <View style={styles.contentContainer}>
                <Text>{this.props.title}</Text>
                {collectionsItems}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#9FC8E8'
    }
});

mapDispatchToProps = dispatch => {
    return {
        setIdeaCollectionItems: (collectionId) => dispatch(actions.setIdeaCollectionItems(collectionId))
    }
};

mapStateToProps = state => {
    return {
        activeCollection: state.giftIdeasReducer.activeCollection,
        collectionItems: state.giftIdeasReducer.collectionItems
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftIdeasPage);