import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { 
    Text, 
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';

import { timestampUTCToLocalReadable } from '../../utils/utils';

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
            <View style={{padding: 10, flex: 1}}>
                {this.props.notifications != null
                    ? <FlatList
                        ListFooterComponent={() => <View style={{height: 40}}></View>}
                        data={this.props.notifications.results}
                        extraData={this.props.notifications}
                        onEndReached={this.fetchNextPage}
                        onEndReachedThreshold={1}
                        renderItem={({item}) => {
                            const cardColor = this.getCardColor(item)
                            return (
                            <Card containerStyle={{backgroundColor: cardColor}} key={item.id}>
                                <TouchableOpacity>
                                    <View>
                                        <Text>{timestampUTCToLocalReadable(item.createdOn)}</Text>
                                    </View>
                                    <View style={{borderBottom: 1}}>
                                        <Text>{item.title}</Text>
                                    </View>
                                    {
                                        false 
                                        ? <View>
                                            <Text>{item.message}</Text>
                                        </View>
                                        : null                                
                                    }
                                    
                                </TouchableOpacity>
                            </Card>)
                        }}
                    />
                    : null
                }
               
            </View>
        )
    }
}

const styles = StyleSheet.create({

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