import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { 
    Text, 
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements';

import { timestampUTCToLocalReadable } from '../../utils/utils';
import LinearGradient from 'react-native-linear-gradient';

class Notifications extends Component {
    async componentDidMount() {
        await this.props.getNotifications();
    }
    getCardColor = (item) => {
        switch(item) {
            case "success":
                return "green";
            case "info":
                return "lightblue";
            case "warning":
                return "red";
        }
    }
    fetchNextPage = () => {
        const notifications = this.props.notifications;
        const currentPage = notifications.currentPage;
        const pageCount = notifications.pageCount;

        if(currentPage < pageCount){
            // Get the next page
            this.props.getNextPage();
        }
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{padding: 10, flex: 1}}>
                    {this.props.notifications != null
                        ? <FlatList
                            ListFooterComponent={() => <View style={{height: 40}}></View>}
                            data={this.props.notifications.results}
                            extraData={this.props.notifications}
                            onEndReached={this.fetchNextPage}
                            onEndReachedThreshold={1}
                            keyExtractor = {(item, index) => index.toString() }
                            renderItem={({item}) => {
                                const cardColor = this.getCardColor(item)
                                return (
                                <Card containerStyle={{backgroundColor: cardColor}}>
                                    <TouchableOpacity>
                                        <View>
                                            <Text style={styles.notificationText}>{timestampUTCToLocalReadable(item.createdOn)}</Text>
                                        </View>
                                        <View style={{borderBottom: 1}}>
                                            <Text style={styles.notificationText}>{item.title}</Text>
                                        </View>
                                        {
                                            false 
                                            ? <View>
                                                <Text style={styles.notificationText}>{item.message}</Text>
                                            </View>
                                            : null                                
                                        }
                                        
                                    </TouchableOpacity>
                                </Card>)
                            }}
                        />
                        : null
                    }
                
                </LinearGradient>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    notificationText: {
        color: 'white'
    }
})

mapDispatchToProps = dispatch => {
    return {
        getNotifications: () => dispatch(actions.getNotifications()),
        getNextPage: () => dispatch(actions.fetchNextNotificationsPage())
    }
}

mapStateToProps = state => {
    return {
        notifications: state.notificationsReducer.notifications
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);