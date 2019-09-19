import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class CategoryDrawerContent extends Component {
    setCollectionActive = (collection) => {
        this.props.clearCategoryProducts();
        this.props.setCollectionActive(collection);
        this.props.navigation.toggleDrawer();
    }
    render() {
        return (
            <FlatList
                horizontal={false}
                data={this.props.collections}
                renderItem={(collection) => (
                    <Button 
                        title={collection.item.title} 
                        type="clear"
                        onPress={() => this.setCollectionActive(collection.item)}
                    />
                )}
            />
        )
    }
}

mapDispatchToProps = dispatch => {
    return {
        setCollectionActive: (collection) => dispatch(actions.setCategoryActive(collection)),
        clearCategoryProducts: () => dispatch(actions.clearCategoryProducts())
    }
}

mapStateToProps = state => {
    return {
        collections: state.storeFrontReducer.collections
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDrawerContent);