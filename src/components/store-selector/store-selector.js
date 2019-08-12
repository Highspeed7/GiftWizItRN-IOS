import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';

import * as actions from '../../store/actions/index';
import Swatch from '../swatch/swatch';
import AmazonView from './amazon/amazon-view';
import WalmartView from './walmart/walmart-view';
import TargetView from './target/target-view';

class StoreSelector extends Component {
    state = {
        amazonModalOpen: null,
        targetModalOpen: null,
        walmartModalOpen: null
    }
    openStoreModal = (store) => {
        switch(store) {
            case "Amazon":
                this.setState({
                    amazonModalOpen: true,
                    targetModalOpen: null,
                    walmartModalOpen: null
                });
                break;
            case "Walmart":
                this.setState({
                    amazonModalOpen: null,
                    targetModalOpen: null,
                    walmartModalOpen: true
                });
                break;
            case "Target":
                this.setState({
                    amazonModalOpen: null,
                    targetModalOpen: true,
                    walmartModalOpen: null
                });
                break;
        }
    }
    closeModal = () => {
        this.setState({
            amazonModalOpen: null,
            targetModalOpen: null,
            walmartModalOpen: null
        })
    }
    onItemAdded = async(data) => {
        await this.props.onItemAdded(data);
    }
    render() {
        return (
            <View>
                <View>
                    <Button title="Close" onPress={this.props.onClose} />
                </View>
                <ScrollView style={{marginTop: 10, paddingLeft: 10}}>
                    <View style={styles.listsContainer}>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Amazon")}>
                            <Swatch>
                                <Text>Amazon</Text>
                                <Modal
                                    visible={this.state.amazonModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <AmazonView
                                        url={{uri: 'https://www.amazon.com'}}
                                        onItemAdded={this.onItemAdded}
                                    />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Target")}>
                            <Swatch>
                                <Text>Target</Text>
                                <Modal
                                    visible={this.state.targetModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <TargetView 
                                        url={{uri: 'https://www.target.com'}} />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Walmart")}>
                            <Swatch>
                                <Text>Walmart</Text>
                                <Modal
                                    visible={this.state.walmartModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <WalmartView url={{uri: 'https://www.walmart.com'}} />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: '24%',
        margin: 1
    }, 
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onItemAdded: (data) => dispatch(actions.addWishListItem(data))
    }
}

export default connect(null, mapDispatchToProps)(StoreSelector);