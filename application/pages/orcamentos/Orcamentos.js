import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    NativeModules,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import global_styles from '../../global-styles/Global-styles';
import orcamentos_styles from './Orcamentos-styles';
import Header from "../../components/header/Header";
import minhas_mudancas_styles from "../mudancas/MinhasMudancas-styles";
import ListOrcamentos from "./list-orcamentos/list-orcamentos";

const {StatusBarManager} = NativeModules;

export default class Orcamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0,
            item_mudanca: props.navigation.getParam('item_mudanca'),
        }
    }

    componentWillMount() {
        this.get_status_bar_height();
    }

    get_status_bar_height() {
        let statusBarHeight = 0;

        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((height) => {
                statusBarHeight = height.height;
                this.setState({
                    statusBarHeight: statusBarHeight,
                });
            });
        }
    }

    go_back = (() => {
        this.props.navigation.navigate('MinhasMudancas')
    });

    render_item_mudanca() {
        return (
            <View key={this.state.item_mudanca.id} style={orcamentos_styles.container_item_mudanca}>
                <View style={orcamentos_styles.item}>
                    <View style={orcamentos_styles.container_text}>
                        <Text style={[orcamentos_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                            Origem: {this.state.item_mudanca.origem}
                        </Text>

                        <Text style={[orcamentos_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                            Destino: {this.state.item_mudanca.destino}
                        </Text>

                        <Text style={[orcamentos_styles.text_item, {fontSize: 16}]}>
                            Data: {this.state.item_mudanca.data}
                        </Text>

                        <Text style={[orcamentos_styles.text_item, {fontSize: 16}]}>
                            Status: {this.state.item_mudanca.status}
                        </Text>

                        <Text style={[orcamentos_styles.text_item, {fontSize: 16}]}>
                            {this.state.item_mudanca.qtdOrcamentos} orçamentos
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render_tabs() {
        return (
            <View style={[global_styles.container_padrao, {
                paddingTop: 10,
                marginBottom: 10
            }]}>
                <View style={[orcamentos_styles.container_tabs]}>
                    <TouchableOpacity style={[orcamentos_styles.touch_tabs, {
                        backgroundColor: '#b0bec5',
                        borderRightColor: '#b0bec5',
                        borderRightWidth: 1
                    }]}>
                        <Text style={global_styles.text_white}>
                            Mais barato
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={orcamentos_styles.touch_tabs}>
                        <Text style={{color: '#b0bec5'}}>
                            Mais perto
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render_list_orcamentos(){
        return(
            <ListOrcamentos lista_orcamentos={this.state.item_mudanca.orcamentos} />
        )
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {
                marginTop: this.state.statusBarHeight
            }]}>

                <Header title={'Orçamentos'} on_press={this.go_back} btn_back={true} img={false}/>

                {this.render_item_mudanca()}
                {this.render_tabs()}
                {this.render_list_orcamentos()}

            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}