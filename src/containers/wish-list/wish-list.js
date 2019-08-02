import React, {Component} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

import * as scripts from '../../web-scripts/amazon';
import Swatch from '../../components/swatch/swatch';
import StoreSelector from '../../components/store-selector/store-selector';

class WishList extends Component {
    state = {
        openStoreSelector: null
    }
    addNewItemPressed = () => {
        this.setState({
            openStoreSelector: true
        });
    }
    render() {
        return (
            <ScrollView>
                <Text>Your Wish List</Text>
                <View style={{width: '24%'}}>
                    <TouchableOpacity onPress={this.addNewItemPressed}>
                        <Swatch>                    
                            <Icon 
                                name="md-add"
                                color="#ccc"
                                size={25}
                            />
                        </Swatch>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.openStoreSelector}
                    onRequestClose={() => this.setState({openStoreSelector: null})}
                >
                    <StoreSelector onClose={() => this.setState({openStoreSelector: null})} />
                </Modal>
            </ScrollView>
        )
    }
}

export default WishList;