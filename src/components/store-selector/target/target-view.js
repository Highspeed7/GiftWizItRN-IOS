import React, { Component } from 'react';

import GWWebView from '../../web-view/gw-web-view';
import targetProductViewScript from '../scripts/targetScript';

class TargetView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: targetProductViewScript
        }
        return (
            <GWWebView
                config={config}
                url={{uri: 'https://www.target.com'}}
            />
        )
    }
}

export default TargetView;