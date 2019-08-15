import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    ScrollView,
    TextInput,
    Switch
} from 'react-native';

import { goclone } from '../../../utils/utils';

class GiftListEdit extends Component {
    state = {
        ...this.props.activeList,
        newPass: null
    };
    setIsPublic = () => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                isPublic: !prevState.isPublic
            };
        })
    }
    setGiftListName = (val) => {
        this.setState((prevState, props) => {
           return {
               ...prevState,
               name: val
           } 
        });
    }
    render() {
        return (
            <View style={styles.viewContainer}>
                <View>
                    <View style={{width: '100%'}}>
                        <Text style={styles.headerTitle}>Edit {this.props.activeList.name}</Text>
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center'}}>
                        <View style={{width: '50%'}}>
                            <Text>Public</Text>
                        </View>
                        <View style={{width: '50%', justifyContent: 'flex-end'}}>
                            <Switch
                                onValueChange={this.setIsPublic}
                                value={this.state.isPublic}
                            />
                        </View>
                    </View>
                    <Text>Gift List Name: </Text>
                    <TextInput
                        style={styles.input} 
                        onChangeText={this.setGiftListName}
                        placeholder={this.props.activeList.name}
                    />
                    {(this.state.isPublic == false) 
                        ? [<Text>Gift List Password: </Text>,
                        <TextInput
                            style={styles.input}
                            onChangeText={this.setGiftListPass}
                            placeholder="Password"
                        />]
                        : null}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    headerTitle: {
        fontSize: 25
    },
    input: {
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    content: {
        marginTop: 40,
        paddingTop: 10
    }
})

export default GiftListEdit;