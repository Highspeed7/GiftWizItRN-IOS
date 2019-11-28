import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    ScrollView,
    TextInput,
    Switch,
    Button,
    Picker,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';

import { goclone } from '../../../utils/utils';
import * as actions from '../../../store/actions/index';

class GiftListEdit extends Component {
    picker_options = [
        {label: "Yes", value: true},
        {label: "No", value: false}
    ];
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
    setGiftListPass = (val) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                newPass: val
            }
        });
    }
    saveListUpdates = () => {
        // Prepare the listData object
        let listData = {
            giftListId: this.state.id,
            newName: this.state.name,
            newPass: this.state.newPass,
            isPublic: this.state.isPublic,
            restrictChat: this.state.restrictChat,
            allowAdds: this.state.allowAdds
        }

        this.props.editGiftList(listData);
        this.props.navigation.goBack();
    }
    setChatRestrict = (value) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                restrictChat: value
            };
        });
    }
    setAllowAddValue = (value) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                allowAdds: value
            };
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.viewContainer}>
                <View>
                    <View>
                        <Button title="Back to List" onPress={() => this.props.navigation.goBack()} />
                    </View>
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
                    <Text style={styles.formLabel}>Will the items in this list be for you?</Text>
                    <Picker
                        selectedValue={this.state.restrictChat}
                        onValueChange={this.setChatRestrict}
                        mode="dropdown"
                    >
                        {this.picker_options.map((option, i) => (
                            <Picker.Item
                                key={i}
                                label={option.label}
                                value={option.value}
                            />  
                        ))}
                    </Picker>
                    <Text style={styles.formLabel}>Allow others to add items to this list?</Text>
                    <Picker
                        selectedValue={this.state.allowAdds}
                        onValueChange={this.setAllowAddValue}
                    >
                        {this.picker_options.map((option, i) => (
                            <Picker.Item
                                key={i}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </Picker>
                    <Button title="Save" onPress={this.saveListUpdates} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        flex: 1
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

mapDispatchToProps = dispatch => {
    return {
        editGiftList: (listData) => dispatch(actions.editGiftList(listData)),
        uiStopLoading: () => dispatch(actions.uiStopLoading())
    }
}

mapStateToProps = state => {
    return {
        activeList: state.giftListsReducer.currentActiveGiftList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListEdit);