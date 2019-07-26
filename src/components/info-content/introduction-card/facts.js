import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

import testImage from '../../../../assets/images/wizard.png';

class Facts extends Component {
    // TODO: Move to an external file.
    factsList = [
        {
            key: Date.now(),
            content: "\u2022 3 out of 4 grandparents suffer from duplicate gift-giving."
        },
        {
            key: Date.now()+1,
            content: "\u2022 Children just don't understand and often simply toss duplicate gifts aside."
        },
        {
            key: Date.now()+2,
            content: "\u2022 Brides often wonder why you or the other person didn't just use the gift registry!"
        }
    ]
    render() {
        // TODO: Componentialize more.
        return (
            <ScrollView style={{backgroundColor: '#9FC8E8'}}>
                <View style={styles.viewContainer}>
                    <FlatList
                        data={this.factsList}
                        renderItem={(fact) => (
                            <Text style={styles.listTextItem}>{"\n" + fact.item.content}</Text>
                        )}
                    />
                    <Image source={testImage} style={styles.wizardImage} />
                </View>
                <View style={[styles.viewContainer, {marginTop: 60, marginBottom: 60, paddingTop: 30}]}>
                    <Text style={{fontFamily: 'SayItSoftly', fontSize: 26}}>Get with your gifts. . .{"\n"}</Text>
                    <Text style={styles.listTextItem}>
                        To solve this GiftWizIt allows you and your family members to share
                        any collection of gifts you might want for any given event.
                        {"\n\n"}
                        Now that you've downloaded and installed this application the next step
                        is to click on the "Get Started" tab below to get logged in and collaborating
                        with friends and family.
                    </Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    wizardImage: {
        position: 'absolute',
        top: -221
    },
    viewContainer: {
        backgroundColor: '#ede7cd',
        paddingTop: 65,
        paddingRight: 15,
        paddingBottom: 40,
        paddingLeft: 15,
        borderColor: 'transparent',
        elevation: 15,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 210
    },
    listTextItem: {
        fontSize: 20
    }
});

export default Facts;