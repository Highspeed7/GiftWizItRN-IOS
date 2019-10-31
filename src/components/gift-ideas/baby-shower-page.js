import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import * as actions from '../../store/actions/index';
import GiftIdeasPage from './gift-ideas-page';

class BabyShowerPage extends Component {
    willBlur = () => {
        this.props.setIdeaCollectionInactive();
    }
    render(){
        return (
            [
                <NavigationEvents onWillBlur={this.willBlur} />,
                <GiftIdeasPage title="Baby Shower Ideas Page" />
            ]
        )
    }
}

mapDispatchToProps = dispatch => {
    return {
        setIdeaCollectionInactive: () => dispatch(actions.setIdeaCollectionInactive())
    }
}

export default connect(null, mapDispatchToProps)(BabyShowerPage);