import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions, StackActions, ScrollView, FlatList } from 'react-navigation';
import { Card } from 'react-native-elements';
import { getGiftIdeaNavigationRoute } from '../../utils/giftIdea-utils';

import * as actions from '../../store/actions/index';
import LinearGradient from 'react-native-linear-gradient';

class GiftIdeasHome extends Component {
    // inAuthView = false;
    // componentDidMount = () => {
    //     this.inAuthView = (this.props.navigation.dangerouslyGetParent().state.routeName == "GiftIdeasAuthed");
    // }
    // openStoreFront = () => {
    //     this.props.uiStartLoading();
    //     if(this.inAuthView) {
    //         this.props.navigation.navigate("Store", {getPrevCheckout: true})
    //     }else {
    //         this.props.navigation.navigate("Store");
    //     }
    // }
    componentDidMount = async () => {
        await this.props.getAllPromoCollections();
    }
    navigateToIdeaPage = (collName, collectionId) => {
        this.props.setIdeaCollectionActive(collectionId);
        var route = getGiftIdeaNavigationRoute(collName)
        this.props.navigation.navigate(route);
    }
    render(){
        const promo_collections = (this.props.promoCollections && this.props.promoCollections.length > 0)
            ? <FlatList
                data={this.props.promoCollections}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.navigateToIdeaPage(item.name, item.id)}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.contentContainer}>
                <Text style={styles.titleText}>Gift Ideas</Text>
                {promo_collections}
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#9FC8E8'
    }
});

mapDispatchToProps = dispatch => {
    return {
        uiStartLoading: () => dispatch(actions.uiStartLoading()),
        getAllPromoCollections: () => dispatch(actions.getAllPromoCollections()),
        setIdeaCollectionActive: (collectionId) => dispatch(actions.setIdeaCollectionActive(collectionId))
    };
};

mapStateToProps = state => {
    return {
        promoCollections: state.giftIdeasReducer.promoCollections
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftIdeasHome);
