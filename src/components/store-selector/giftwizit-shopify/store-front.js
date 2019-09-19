import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

import Auxiliary from '../../../hoc/auxiliary';
import * as actions from '../../../store/actions/index';

class StoreFront extends Component {
    componentDidMount() {
        this.props.initializeStore()
    }
    fetchCategoryProducts = async () => {
        await this.props.fetchCategoryProducts();
    }
    render() {
        if(this.props.activeCategory != null && this.props.products.length == 0) {
            this.fetchCategoryProducts();
        }
        productsList = (this.props.products.length > 0)
            ? <FlatList
                horizontal={false}
                data={this.props.products}
                renderItem={(product) => {
                    const images = product.item.images;
                    return <Card>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <View style={styles.productImageContainer}>
                                <Image style={styles.productImage} source={{uri: images[0].src}} />
                            </View>
                            <View>
                                <Text>{product.item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>
                }}
            />
            : null;
        return (
            <View style={{padding: 10, flex: 1}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{this.props.activeCategory != null ? this.props.activeCategory.title : null}</Text>
                <View style={{flex: 1}}>
                    {productsList}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    productImage: {
        height: 50,
        width: 50
    },
    productImageContainer: {
        marginRight: 5,
        resizeMode: 'contain'
    }
})

mapDispatchToProps = dispatch => {
    return {
        initializeStore: () => dispatch(actions.initializeStore()),
        fetchCategoryProducts: () => dispatch(actions.fetchCategoryProducts())
    }
}

mapStateToProps = state => {
    return {
        activeCategory: state.storeFrontReducer.activeCategory,
        client: state.storeFrontReducer.client,
        products: state.storeFrontReducer.displayedProducts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);