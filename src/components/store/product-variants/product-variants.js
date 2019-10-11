import React, { Component } from 'react';
import { 
    Text,
    TextInput,
    Picker,
    View,
    Alert
} from 'react-native';

import { shallowCompare, goclone } from '../../../utils/utils';

class ProductVariants extends Component {
    pickerObj = {};
    newActiveVariant = null;
    state = {
        pickerConfig: {}
    }
    setSelectedOptions = (option) => {
        this.props.activeVariant.selectedOptions.forEach((opt) => {
            if(opt.name == option) {
                this.pickerObj[option] = opt.value
            }
        });

        this.setState({
            pickerConfig: this.pickerObj
        })
    }
    variantChanged = (itemValue, option) => {
        this.pickerObj[option] = itemValue

        this.setState({
            pickerConfig: this.pickerObj
        }, () => {
            this.checkVariantAvailability();
        })
    }
    checkVariantAvailability = () => {
        let variantAvailable = false;
        let chosenVariant = null;
        this.props.activeProduct.variants.forEach((variant, i) => {
            let available = variant.selectedOptions.map((opt) => {
                return this.pickerObj[opt.name] == opt.value
            })
            if(!available.includes(false)) {
                chosenVariant = variant;
                variantAvailable = true;
            }
        })
        this.props.onVariantChanged(variantAvailable, chosenVariant)
    }
    render(){
        const pickers = this.props.activeVariant != null 
            ? this.props.activeProduct.options.map((option) => {
                if(this.state.pickerConfig[option.name] == null) {
                    this.setSelectedOptions(option.name);
                }
                const pickerItems = option.values.map((v) => (
                    <Picker.Item
                        label={v.value}
                        value={v.value}
                    />
                ))
                return [
                    <Text>{option.name}</Text>,
                    <Picker
                        selectedValue={this.state.pickerConfig != null ? this.state.pickerConfig[option.name] : null}
                        ref={option.name}  
                        onValueChange={(itemValue) => this.variantChanged(itemValue, option.name)}
                    >
                        {pickerItems}
                    </Picker>
                ]
            })
            : null
        return (
            <View>
                {pickers}
            </View>
        )
    }
}

export default ProductVariants;