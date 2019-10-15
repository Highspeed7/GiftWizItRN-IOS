import React, { Component } from 'react';

import * as scripts from '../scripts/scripts';
import GWWebView from '../../web-view/gw-web-view';

class BBBYondView extends Component {
    render() {
        let config = {
            caseHandlers: [
                {
                    case: "add_item",
                    handler: this.props.onItemAdded
                }
            ],
            initial_js: scripts.bbbYondProductViewScript
        }
        return (
            <GWWebView
                setRef={this.props.setRef}
                canGoBack={this.props.canGoBack}
                config={config}
                url={{uri: 'https://www.bedbathandbeyond.com'}}
                onWebClose={this.props.onWebClose}
            />
        )
    }
}

export default BBBYondView;