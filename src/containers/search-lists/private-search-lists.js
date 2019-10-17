import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    ScrollView, 
    TextInput,
    Button,
    Alert
} from 'react-native';

class SearchPrivateLists extends Component {
    state = {
        searchTerm: null,
        userEmail: null,
        password: null
    }
    setSearchTerm = (value) => {
        this.setState({
            searchTerm: value
        });
    }
    setUserEmail = (value) => {
        this.setState({
            userEmail: value
        });
    }
    setPassword = (value) => {
        this.setState({
            password: value
        });
    }
    onPerformSearch = () => {
        if(this.state.searchTerm == null) {
            Alert.alert("No search term entered");
            return;
        }
        if(this.state.userEmail == null) {
            Alert.alert("No user email entered");
            return;
        }
        if(this.state.password == null) {
            Alert.alert("No password provided");
            return;
        }

        Alert.alert("This search feature coming soon!");
    }
    render() {
        return (
            <View style={styles.viewContainer}>
                <View>
                    <Text>Search Private Lists! You will need to provide 
                        the password and the email of the person who created the list for these lists.
                        {"\n\n"}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>NOTE: Feature not yet implemented; Coming Soon!</Text>
                    <TextInput style={styles.textInput} placeholder="List Name" onChangeText={this.setSearchTerm} value={this.state.searchTerm} />
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.setUserEmail} value={this.state.userEmail} />
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={this.setPassword} value={this.state.password} />
                    <Button title="Search" onPress={this.onPerformSearch} />
                </View>
                <ScrollView>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    }
});

export default SearchPrivateLists;