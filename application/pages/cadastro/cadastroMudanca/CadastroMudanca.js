import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    NativeModules,
} from 'react-native';
import global_styles from '../../../global-styles/Global-styles';
import criar_conta_styles from '../CriarConta-styles';
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";

const {StatusBarManager} = NativeModules;

export default class CadastroMudanca extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0,
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

    create_mudanca = (() => {
        this.props.navigation.navigate('MinhasMudancas');
    });

    render_top() {
        return (
            <View style={criar_conta_styles.container_top}>
                <View style={[global_styles.container_padrao]}>
                    <View style={[global_styles.container_padrao]}>
                        <Text style={[criar_conta_styles.text_title]}>
                            Cadastre a sua
                        </Text>
                        <Text style={[criar_conta_styles.text_title]}>
                            mudança
                        </Text>
                    </View>

                    <View style={[global_styles.container_btns, {marginTop: 10}]}>
                        <Text style={[criar_conta_styles.text_subtitle, {textAlign: 'center'}]}>
                            Procure detalhar o máximo possível sobre os itens e trajeto que serão transportados
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render_form_cadastro() {
        return (
            <ScrollView style={[{height: '80%', marginTop: 20}]}>
                <View style={[global_styles.container_padrao]}>
                    <Input placeholder_input={'Local da retirada'} multiline_input={false}
                           secure_text_entry_input={false} number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_email}/>

                    <Input placeholder_input={'Local da entrega'} multiline_input={false}
                           secure_text_entry_input={false} number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Data do transporte'} multiline_input={false}
                           secure_text_entry_input={false} number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Informe os itens que serão transportados'} multiline_input={true}
                           number_of_lines_input={3}
                           secure_text_entry_input={false} value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Observações'} secure_text_entry_input={false} multiline_input={true}
                           number_of_lines_input={3}
                           value_input={''} on_change_text={this.change_senha}/>
                </View>
            </ScrollView>
        );
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {
                marginTop: this.state.statusBarHeight
            }]}>
                {this.render_top()}
                {this.render_form_cadastro()}

                <View style={criar_conta_styles.button_footer}>
                    <Button text_button={'Cadastrar e aguardar orçamentos'} color_button={'#5dcc3a'}
                            on_press_button={this.create_mudanca}/>
                </View>
            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}