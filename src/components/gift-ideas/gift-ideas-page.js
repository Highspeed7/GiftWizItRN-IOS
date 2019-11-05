import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';

import * as actions from '../../store/actions/index';
import { Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class GiftIdeasPage extends Component {
    componentDidMount = () => {
        this.props.setIdeaCollectionItems(this.props.activeCollection);
    }
    render() {
        const collectionsItems = (this.props.collectionItems && this.props.collectionItems.length > 0)
            ? <FlatList
                horizontal={false}
                style={styles.listContainer}
                numColumns={2}
                columnWrapperStyle={{maxWidth: '50%'}}
                horizontal={false}
                data={this.props.collectionItems}
                renderItem={({item, index}) => (
                    <TouchableOpacity style={{margin: 1, padding: 10, maxHeight: 250, backgroundColor: 'white'}} onPress={() => {}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
                        </View>
                        <View>
                            <Text 
                                style={{fontSize: 12}}
                                ellipsizeMode="tail"
                                numberOfLines={3}
                            >{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.contentContainer}>
                <Text style={{color: 'white', fontSize: 18}}>{this.props.title}</Text>
                {collectionsItems}
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#9FC8E8'
    },
    productThumb: {
        maxHeight: 250,
        backgroundColor: 'white'
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