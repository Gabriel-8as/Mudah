import React from 'react';
import global_styles from "../../global-styles/Global-styles";
import {Text, TouchableOpacity, View} from "react-native";

const Button = props => {
    const { text_button, color_button, on_press_button } = props;

    return(
        <View style={global_styles.container_btns}>
            <TouchableOpacity onPress={on_press_button} activeOpacity={0.8} style={[global_styles.btn_padrao, {backgroundColor: color_button}]}>
                <Text style={[global_styles.text_white, {fontSize: 18}]}>
                    {text_button}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;