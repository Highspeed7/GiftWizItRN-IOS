import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Picker,
    Switch
} from 'react-native';

class GiftListAdd extends Component {
    picker_options = [
        {label: "Yes", value: true},
        {label: "No", value: false}
    ];
    state = {
        restrictChat: false,
        allowAdds: true,
        isPublic: false
    }
    setIsPublic = (value) => {
        this.setState({
            isPublic: value
        });

        this.props.listIsPublic(value);
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
                <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center'}}>
                    <View style={{width: '50%'}}>
                        <Text style={styles.formLabel}>Public</Text>
                    </View>
                    <View style={{width: '50%', justifyContent: 'flex-end'}}>
                        <Switch
                            onValueChange={this.setIsPublic}
                            value={this.state.isPublic}
                        />
                    </View>
                </View>
                {(this.state.isPublic == false) 
                    ? [<Text style={styles.formLabel}>Gift List Password: </Text>,
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={this.props.addedGiftPassHandler}
                        placeholder="Password"
                    />]
                    : null}
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