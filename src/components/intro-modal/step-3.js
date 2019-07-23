import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class IntroStep3 extends Component {
    render() {
        return (
            <View>
                <Text>Step 3</Text>
                <Button title="Continue" onPress={this.props.onNextStep} />
                <Button title="Close" onPress={this.props.onModalClose} />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNextStep: () => dispatch({type: "STEP_UP"}),
        onModalClose: () => dispatch({type: "MODAL_CLOSED"})
    }
}

export default connect(null, mapDispatchToProps)(IntroStep3) 