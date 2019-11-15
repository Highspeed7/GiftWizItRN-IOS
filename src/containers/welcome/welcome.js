import React, {Component} from 'react';
import {
     ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import IntroStep1 from '../../components/intro-modal/step-1';
import IntroStep2 from '../../components/intro-modal/step-2';
import IntroStep3 from '../../components/intro-modal/step-3';
import InfoCard from '../../components/welcome/info-card';
import IntroductionCard from '../../components/info-content/introduction-card/introduction-card';
import NextHolidayCard from '../../components/info-content/next-holiday-card/next-holiday-card';
import GiftIdeasCard from '../../components/info-content/gift-ideas-card/gift-ideas-card';
import ListsViewed from '../../components/info-content/lists-viewed-card';
import * as actions from '../../store/actions/index';
import LinearGradient from 'react-native-linear-gradient';
import SearchCard from '../../components/search/search-card';

class Welcome extends Component {
    openStoreFront = () => {
        this.props.uiStartLoading();
        this.props.navigation.navigate("Store");
    }
    searchCardPressed = () => {
        this.props.navigation.navigate("SearchLists");
    }
    render() {
        renderModal = () => {
            switch(this.props.introStep) {
                case 1:
                    return <IntroStep1 />
                case 2:
                    return <IntroStep2 />
                case 3:
                    return <IntroStep3 />
            }
        }
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <InfoCard>
                        <IntroductionCard />
                    </InfoCard>
                    <InfoCard>
                        <NextHolidayCard />
                    </InfoCard>
                    <InfoCard>
                        <TouchableOpacity style={styles.infoCard} onPress={this.openStoreFront}>
                            <Text style={[styles.cardText, {color: "black"}]}>Shop Our Store</Text>
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <LinearGradient colors={['#ffffff', '#00ffff']} style={{flex: 1, height: 100, width: '100%'}}>
                            <GiftIdeasCard authed={false} />
                        </LinearGradient>
                    </InfoCard>
                    <InfoCard>
                        <SearchCard searchCardPressed={this.searchCardPressed} />
                    </InfoCard>
                    {/* <Modal
                        visible={this.props.introComplete === null}
                    >
                        {renderModal()}
                    </Modal> */}
                </ScrollView>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    infoCard: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    cardText: {
        color: 'black',
        fontFamily: 'Graciela-Regular',
        fontSize: 22
    }
})

const mapStateToProps = state => {
    return {
        introStep: state.preAuthReducer.introStep,
        introComplete: state.preAuthReducer.introComplete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClosed: () => dispatch({type: "MODAL_CLOSED"}),
        uiStartLoading: () => dispatch(actions.uiStartLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);