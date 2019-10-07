import React, { Component } from 'react';
import { 
    Text,
    TextInput,
    Picker,
    View
} from 'react-native';

import {goclone} from '../../../utils/utils';

class ProductVariants extends Component {
    state = {
        selectedColor: null,
        selectedSize: null,
        pickerConfig: null
    }
    variantChanged = (itemValue, option) => {
        this.props.onVariantChanged(itemValue, option);
    }
    render(){
        const pickers = this.props.activeProduct.options.map((option) => {
            const pickerItems = option.values.map((v) => (
                <Picker.Item
                    label={v.value}
                    value={v.value}
                />
            ))
            return [
                <Text>{option.name}</Text>,
                <Picker
                    onValueChange={(itemValue) => this.variantChanged(itemValue, option.name)}
                >
                    {pickerItems}
                </Picker>
            ]
        })
        return (
            <View>
                {pickers}
            </View>
        )
    }
}

export default ProductVariants;