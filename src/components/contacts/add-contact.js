import React, { Component } from 'react';
import { 
    Alert,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    SafeAreaView
 } from 'react-native';
 import { connect } from 'react-redux';

 import * as actions from '../../store/actions/index';

class AddContactModal extends Component {
    state = {
        name: null,
        email: null
    }
    setName = (val) => {
        this.setState({
            name: val
        });
    }
    setEmail = (val) => {
        this.setState({
            email: val
        });
    }
    confirmContactAdd = async () => {
        if(this.state.name == null || this.state.email == null) {
            Alert.alert("Please complete all fields before submitting.")
            return;
        }
        let contactObj = {...this.state}
        await this.props.addContact(contactObj);
        this.props.onContactAdded();
    }
    render() {
        return (
            <SafeAreaView style={styles.viewContainer}>
                <View style={styles.header}>
                    <Text style={styles.addContactHeading}>Add a Contact</Text>
                </View>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Name"
                    onChangeText={this.setName}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={this.setEmail}
                />
                <View style={styles.btnContainer}>
                    <Button title="Add" onPress={this.confirmContactAdd} />
                    <Button title="Cancel" onPress={this.props.onCancel} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    header: {
        height: 40
    },
    addContactHeading:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    btnContainer: {
        marginTop: 15
    }
})

const mapDispatchToProps = dispatch => {
    return {
        addContact: (contact) => dispatch(actions.addContact(contact))
    }
}

export default connect(null, mapDispatchToProps)(AddContactModal);