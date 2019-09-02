import React, { Component } from 'react';

import GWWebView from '../../web-view/gw-web-view';
import * as scripts from '../scripts/scripts';

class TargetView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: scripts.targetProductViewScript
        }
        return (
            <GWWebView
                setRef={this.props.setRef}
                canGoBack={this.props.canGoBack}
                config={config}
                url={{uri: 'https://www.target.com'}}
            />
        )
    }
}

export default TargetView;