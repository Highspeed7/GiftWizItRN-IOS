import React, { Component } from 'react';

import * as scripts from '../scripts/walmartScripts';
import GWWebView from '../../web-view/gw-web-view';

class WalmartView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: scripts.walmartProductViewScript
        }
        return (
            <GWWebView
                setRef={this.props.setRef}
                canGoBack={this.props.canGoBack}
                config={config}
                url={this.props.url}
                onWebClose={this.props.onWebClose}
            ></GWWebView>
        )
    }
}

export default WalmartView;