import React from 'react';
import global_styles from "../../global-styles/Global-styles";
import {TextInput, View} from "react-native";

const Input = props => {
    const {placeholder_input, secure_text_entry_input, value_input, on_change_text, multiline_input, number_of_lines_input} = props;

    return (
        <View style={global_styles.container_input}>
            <TextInput
                style={global_styles.inputs}
                placeholder={placeholder_input}
                numberOfLines={number_of_lines_input}
                multiline={multiline_input}
                placeholderTextColor="#ababab"
                underlineColorAndroid='transparent'
                secureTextEntry={secure_text_entry_input}
                // value={value_input}
                onChangeText={(text) => on_change_text(text)}
            />
        </View>
    );
};

export default Input;