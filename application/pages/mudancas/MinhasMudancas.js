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
import minhas_mudancas_styles from './MinhasMudancas-styles';
import Header from "../../components/header/Header";
import ListMudancas from "./mudancasComponents/list-mudancas/list-mudancas";

const {StatusBarManager} = NativeModules;

export default class MinhasMudancas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0,
            lista_mudanca: [],
            loading_list: false
        }
    }

    componentWillMount() {
        this.get_status_bar_height();
    }

    componentDidMount() {
        this.setState({
            loading_list: true
        });

        setTimeout(() => {
            this.get_lista_mudancas();
            this.setState({
                loading_list: false
            });
        }, 500);
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

    get_lista_mudancas = (() => {
        this.state.lista_mudanca = [
            {
                id: 1,
                origem: 'Rua Javaés, 335',
                destino: 'Rua dos Gumões, 277',
                data: '14/09/2019',
                status: 'Aguardando orçamentos',
                qtdOrcamentos: 125,

                orcamentos: [
                    {
                        id: 1,
                        empresa: 'Transportadora do Toninho',
                        valor: 'R$ 180,00'
                    },
                    {
                        id: 2,
                        empresa: 'Transportadora do Gabriel',
                        valor: 'R$ 100,00'
                    },
                    {
                        id: 3,
                        empresa: 'Luis Carretos',
                        valor: 'R$ 150,00'
                    },
                ]
            },
            {
                id: 2,
                origem: 'Rua Anhaia, 185',
                destino: 'Rua Silva Pinto, 355',
                data: '21/02/2019',
                status: 'Aguardando orçamentos',
                qtdOrcamentos: 100,

                orcamentos: [
                    {
                        id: 1,
                        empresa: 'Transportadora do Cleber',
                        valor: 'R$ 180,00'
                    },
                    {
                        id: 2,
                        empresa: 'Transportadora do Walter',
                        valor: 'R$ 100,00'
                    },
                    {
                        id: 3,
                        empresa: 'Vanger Carretos',
                        valor: 'R$ 150,00'
                    },
                ]
            },
        ];
        this.setState({
            list_mudancas: this.state.lista_mudanca
        });
    });

    search_mudancas = ((value) => {

    });

    go_to_orcamentos = ((item_mudanca) => {
        this.props.navigation.navigate('Orcamentos', {item_mudanca});
    });

    go_to_create_new_mudanca = (() => {
        this.props.navigation.navigate('CadastroMudanca');
    });

    render_input_search() {
        return (
            <View style={[global_styles.container_padrao]}>
                <View style={[minhas_mudancas_styles.container_input_search]}>

                    <Image style={minhas_mudancas_styles.icon_input}
                           source={{uri: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png'}}/>

                    <TextInput
                        style={[global_styles.inputs, {width: '90%', backgroundColor: '#f2f2f2'}]}
                        placeholder={'Buscar'}
                        placeholderTextColor="#ababab"
                        underlineColorAndroid='transparent'
                        // value={value_input}
                        onChangeText={(text) => this.search_mudancas(text)}
                    />
                </View>
            </View>
        );
    }

    render_tabs() {
        return (
            <View style={[global_styles.container_padrao, {
                borderTopColor: '#dadada',
                borderTopWidth: 1,
                paddingTop: 10,
                marginBottom: 10
            }]}>
                <View style={[minhas_mudancas_styles.container_tabs]}>
                    <TouchableOpacity style={[minhas_mudancas_styles.touch_tabs, {
                        backgroundColor: '#b0bec5',
                        borderRightColor: '#b0bec5',
                        borderRightWidth: 1
                    }]}>
                        <Text style={global_styles.text_white}>
                            Todas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[minhas_mudancas_styles.touch_tabs, {borderRightColor: '#b0bec5', borderRightWidth: 1}]}>
                        <Text style={{color: '#b0bec5'}}>
                            Aguardando
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[minhas_mudancas_styles.touch_tabs, {borderRightColor: '#b0bec5', borderRightWidth: 1}]}>
                        <Text style={{color: '#b0bec5'}}>
                            Finalizados
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={minhas_mudancas_styles.touch_tabs}>
                        <Text style={{color: '#b0bec5'}}>
                            Cancelados
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render_list_mudancas() {
        if(this.state.loading_list){
            return(
                <ActivityIndicator size="large" color="#cccccc"/>
            )
        }else {
            return (
                <ListMudancas go_to_orcamentos={this.go_to_orcamentos} lista_mudanca={this.state.lista_mudanca}/>
            );
        }
    }

    render_footer() {
        return (
            <View style={[minhas_mudancas_styles.container_footer, Platform.OS === 'ios' ? {bottom: 20} : null]}>
                <TouchableOpacity style={minhas_mudancas_styles.touch_footer}>
                    <Text style={global_styles.text_gray}>
                        Mensagens
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.go_to_create_new_mudanca()} style={minhas_mudancas_styles.touch_footer}>
                    <Text style={global_styles.text_gray}>
                        Nova Mudança
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {
                marginTop: this.state.statusBarHeight
            }]}>

                <Header title={'Minhas mudanças'} btn_back={false} img={true}/>

                {this.render_input_search()}
                {this.render_tabs()}
                {this.render_list_mudancas()}
                {this.render_footer()}
            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}