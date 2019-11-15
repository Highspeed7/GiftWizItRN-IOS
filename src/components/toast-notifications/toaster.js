import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Alert } from 'react-native';

class Toaster extends Component {
    componentDidUpdate(prevProps) {
        if(this.props.shouldPop != null && this.props.shouldPop !== prevProps.shouldPop) {
            this.refs.toast.show(this.props.shouldPop.message, DURATION.LENGTH_LONG);
        }
    }
    render() {
        return (
            <Toast
                style={{position: 'relative', zIndex: 100000}}
                ref="toast"
            />
        )
    }
}

mapStateToProps = state => {
    return {
        shouldPop: state.uiReducer.shouldPop
    }
}

export default connect(mapStateToProps)(Toaster);