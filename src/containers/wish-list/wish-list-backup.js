INJECTED_JAVASCRIPT = null;
    constructor() {
        super();
        this.state = {
            addItem: false
        }

        this.INJECTED_JAVASCRIPT = scripts.amazonScript;
        console.log(this.INJECTED_JAVASCRIPT)
    }
    onMessage = (event) => {
        Alert.alert(event.nativeEvent.data);
    }
    runWebView = () => {
        var oldState = Object.assign({}, this.state);
        this.setState({
            addItem: !oldState.addItem
        });
    }
    render() {
        const webViewDisplay = (this.state.addItem)
            ?   <View style={{borderWidth: 2, borderColor: 'blue', height: '100%'}}>
                    <WebView
                        injectedJavaScript={this.INJECTED_JAVASCRIPT}
                        source={{uri: 'http://www.amazon.com'}}
                        onMessage={this.onMessage}
                    />
                </View>
            : null

        return (
            <View>
                <Text>Your Wish List</Text>
                <View style={{width: '24%'}}>
                    <TouchableOpacity onPress={this.runWebView}>
                        <Swatch>                    
                            <Icon 
                                name="md-add"
                                color="#ccc"
                                size={25}
                            />
                        </Swatch>
                    </TouchableOpacity>
                </View>
                {webViewDisplay}
            </View>
        )
    }