import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions, ScrollView } from 'react-navigation';
import { Card } from 'react-native-elements';

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
    render(){
        console.log(this.props.navigation.dangerouslyGetParent().state);
        return (
            <ScrollView>
                <Text>Gift Ideas Home</Text>
                {/* <TouchableOpacity onPress={this.openStoreFront}>
                    <Card>
                        <Text>Visit Our Store</Text>
                    </Card>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() =>  this.props.navigation.navigate("BabyShowerPage")}>
                    <Card>
                        <Text>Baby Showers</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.babyShowerNavigate}>
                    <Card>
                        <Text>Wedding Stuff</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.babyShowerNavigate}>
                    <Card>
                        <Text>For Him</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.babyShowerNavigate}>
                    <Card>
                        <Text>For Her</Text>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

mapDispatchToProps = dispatch => {
    return {
        uiStartLoading: () => dispatch(actions.uiStartLoading())
    };
};

export default connect(null, mapDispatchToProps)(GiftIdeasHome);