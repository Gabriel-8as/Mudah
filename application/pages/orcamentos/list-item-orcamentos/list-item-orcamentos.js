import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import list_item_styles from './list-item-orcamentos-styles';

export default class ListItemOrcamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lista_orcamentos: props.lista_orcamentos,
        }
    }

    componentWillMount() {
        console.log('lista_orcamentos: ', this.state.lista_orcamentos);
    }

    render_item_orcamentos() {
        return (
            <View key={this.state.lista_orcamentos.id} style={list_item_styles.container_list}>
                <TouchableOpacity style={list_item_styles.touch_item}>
                    <View style={list_item_styles.container_img_empresa}>
                        <Image style={list_item_styles.img_empresa} resizeMode={'contain'}
                               source={{uri: 'http://www.abamotors.com.br/themes/aba-motors-embu-homolog/assets/images/client-company.png'}}/>
                    </View>

                    <View style={list_item_styles.container_text}>
                        <Text style={[list_item_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                            {this.state.lista_orcamentos.empresa}
                        </Text>

                        <Text style={[list_item_styles.text_item, {fontSize: 16}]}>
                            {this.state.lista_orcamentos.valor}
                        </Text>
                    </View>

                    <View style={list_item_styles.container_icon}>
                        <Image style={list_item_styles.icon}
                               source={{uri: 'https://static.thenounproject.com/png/1916331-200.png'}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            this.render_item_orcamentos()
        )
    }
}