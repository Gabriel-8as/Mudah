import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import header_styles from './Header-styles';

const Header = props => {

    const {on_press, title, btn_back, img} = props;

    return (
        <View>
            <View style={header_styles.containerHeader}>
                <View style={[header_styles.contentHeader]}>
                    {btn_back ?
                        <TouchableOpacity style={header_styles.btnBack} onPress={on_press}>
                            <Image style={[header_styles.imgBack, {tintColor: '#ababab'}]}
                                   source={{uri: 'https://cdn1.iconfinder.com/data/icons/general-ui-outlined-thick/24/chevron-left-512.png'}}/>
                            <Text style={{fontSize: 16, color: '#ababab'}}>
                                Voltar
                            </Text>
                        </TouchableOpacity>
                        :
                        <View style={header_styles.btnBack}/>
                    }

                    <View style={header_styles.titleHeader}>
                        <Text numberOfLines={1} ellipsizeMode="tail"
                              style={[header_styles.textTitleHeader]}>{title}</Text>
                    </View>

                    <View style={header_styles.containerImgMarca}>
                        {img ?
                            <Image resizeMode={'contain'}
                                   source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSsD6cvSs-lSROnOPY-Ocv27XtrgFrRSLuPekS58YCKCwFOXv'}}
                                   style={header_styles.imgMarca}/>
                            :
                            null
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Header;