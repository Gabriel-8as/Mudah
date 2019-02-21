import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import list_item_styles from './list-item-mudancas-styles';

export default class ListItemMudancas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item_mudanca: props.item_mudanca
        }
    }

    render_item_mudanca(){
        return(
            <View key={this.state.item_mudanca.id} style={list_item_styles.container_list}>
                <TouchableOpacity onPress={() => this.props.go_to_orcamentos(this.state.item_mudanca)} style={list_item_styles.touch_item}>
                    <View style={list_item_styles.container_text}>
                        <Text style={[list_item_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                            Origem: {this.state.item_mudanca.origem}
                        </Text>

                        <Text style={[list_item_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                            Destino: {this.state.item_mudanca.destino}
                        </Text>

                        <Text style={[list_item_styles.text_item, {fontSize: 16}]}>
                            Data: {this.state.item_mudanca.data}
                        </Text>

                        <Text style={[list_item_styles.text_item, {fontSize: 16}]}>
                            Status: {this.state.item_mudanca.status}
                        </Text>

                        <Text style={[list_item_styles.text_item, {fontSize: 16}]}>
                            {this.state.item_mudanca.qtdOrcamentos} orçamentos
                        </Text>
                    </View>

                    <View style={list_item_styles.container_icon}>
                        <Image style={list_item_styles.icon} source={{uri: 'https://static.thenounproject.com/png/1916331-200.png'}} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        return(
          this.render_item_mudanca()
        );
    }

}