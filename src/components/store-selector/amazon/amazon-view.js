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
                setRef={this.props.setRef}
                canGoBack={this.props.canGoBack}
                config={config}
                url={{uri: 'https://www.amazon.com'}}
                onWebClose={this.props.onWebClose}
            />
        )
    }
}

export default AmazonView;