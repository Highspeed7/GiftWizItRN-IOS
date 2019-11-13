import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    StyleSheet, 
    Linking, 
    Button} from 'react-native';

import Auxiliary from '../../hoc/auxiliary';


class SharedListItem extends Component {
    openModal = () => {
        var item = this.props.item;
        if(item.afflt_Link == null) {
            this.props.onStoreProductClicked(item);
        }else {
            Linking.openURL(this.props.item.afflt_Link);
        }
    }
    render() {
        return (
            <Auxiliary>
            <ScrollView style={styles.scrollView}>
                <View>
                    <TouchableOpacity onPress={this.openModal}>
                        <View style={styles.listImageContainer}>
                            <Image style={styles.listImage} source={{uri: this.props.item.image}} />
                        </View>
                        <Text style={styles.itemText}>{this.props.item.itm_Name}</Text> 
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 35}}>
                    <Button title="I'm buying this... no touchy!" />
                </View>
            </ScrollView>
        </Auxiliary>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listImageContainer: {
        minHeight: 250
    },
    listImage: {
        width: 150,
        height: 'auto',
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});

export default SharedListItem;