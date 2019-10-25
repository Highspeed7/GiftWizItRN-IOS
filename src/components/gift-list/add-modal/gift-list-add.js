import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Picker
} from 'react-native';

class GiftListAdd extends Component {
    picker_options = [
        {label: "Yes", value: true},
        {label: "No", value: false}
    ];
    state = {
        restrictChat: false,
        allowAdds: true
    }
    setPickerValue = (value) => {
        this.setState({
            restrictChat: value
        });
        this.props.restrictChatFlag(value);
    };
    setAllowAddValue = (value) => {
        this.setState({
            allowAdds: value
        });
        this.props.allowItemAdds(value);
    };
    render() {
        return (
            <View style={{padding: 10}}>
                <Text style={styles.pageHeader}>Add a gift list!</Text>
                <TextInput
                    style={{borderBottomWidth: 1, borderBottomColor: '#eeeeee', marginBottom: 15}} 
                    placeholder="Name" 
                    onChangeText={this.props.addedGiftNameHandler} 
                />

                <Text style={styles.formLabel}>Will the items in this list be for you?</Text>
                <Picker
                    selectedValue={this.state.restrictChat}
                    onValueChange={this.setPickerValue}
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
                <Button title="Submit" onPress={this.props.newGiftListAdded} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageHeader: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    formLabel: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default GiftListAdd;