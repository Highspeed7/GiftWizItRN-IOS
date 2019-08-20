import React, { Component } from 'react';

import * as scripts from '../scripts/scripts';
import GWWebView from '../../web-view/gw-web-view';

class AmazonView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: scripts.amazonProductView1Script
        }
        return (
            <GWWebView
                config={config}
                url={{uri: 'https://www.amazon.com'}}
            />
        )
    }
}

export default AmazonView;