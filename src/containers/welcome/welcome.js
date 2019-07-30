import React, {Component} from 'react';
import {
     ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import IntroStep1 from '../../components/intro-modal/step-1';
import IntroStep2 from '../../components/intro-modal/step-2';
import IntroStep3 from '../../components/intro-modal/step-3';
import InfoCard from '../../components/welcome/info-card';
import IntroductionCard from '../../components/info-content/introduction-card/introduction-card';
import NextHolidayCard from '../../components/info-content/next-holiday-card/next-holiday-card';
import GiftIdeasCard from '../../components/info-content/gift-ideas-card/gift-ideas-card';
import ListsViewed from '../../components/info-content/lists-viewed-card';

class Welcome extends Component {
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
            <ScrollView style={styles.scrollContainer}>
                <InfoCard>
                    <IntroductionCard />
                </InfoCard>
                <InfoCard>
                    <NextHolidayCard />
                </InfoCard>
                <InfoCard>
                    <GiftIdeasCard />
                </InfoCard>
                <InfoCard>
                    <ListsViewed />
                </InfoCard>
                {/* <Modal
                    visible={this.props.introComplete === null}
                >
                    {renderModal()}
                </Modal> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#9FC8E8'
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
        onModalClosed: () => dispatch({type: "MODAL_CLOSED"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);