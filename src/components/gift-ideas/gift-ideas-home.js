import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions, StackActions, ScrollView, FlatList } from 'react-navigation';
import { Card } from 'react-native-elements';
import { getGiftIdeaNavigationRoute } from '../../utils/giftIdea-utils';

import * as actions from '../../store/actions/index';

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
    navigateToIdeaPage = (collName) => {
        var route = getGiftIdeaNavigationRoute(collName)
        this.props.navigation.navigate(route);
    }
    render(){
        const promo_collections = (this.props.promoCollections.length > 0)
            ? <FlatList
                data={this.props.promoCollections}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.navigateToIdeaPage(item.name)}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <ScrollView style={styles.contentContainer}>
                <Text>Gift Ideas Home</Text>
                {promo_collections}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10
    }
});

mapDispatchToProps = dispatch => {
    return {
        uiStartLoading: () => dispatch(actions.uiStartLoading()),
        getAllPromoCollections: () => dispatch(actions.getAllPromoCollections())
    };
};

mapStateToProps = state => {
    return {
        promoCollections: state.giftIdeasReducer.promoCollections
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftIdeasHome);