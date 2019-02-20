import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    NativeModules,
} from 'react-native';
import criar_conta_styles from './CriarConta-styles';
import global_styles from '../../global-styles/Global-styles';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const {StatusBarManager} = NativeModules;

export default class CriarConta extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0,
            type: props.navigation.getParam('type'),
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

    go_to_login = (() => {
        this.props.navigation.navigate('Login');
    });

    create_account = (() => {
        if (this.state.type === 1) {
            this.props.navigation.navigate('CadastroTransportadora');
        } else {
            this.props.navigation.navigate('CadastroMudanca');
        }
    });

    change_email = ((value) => {
        console.log('VALUE: ', value)
    });

    change_senha = ((value) => {
        console.log('VALUE: ', value)
    });

    render_top() {
        return (
            <View style={criar_conta_styles.container_top}>
                <View style={[global_styles.container_padrao]}>
                    <View style={[global_styles.container_padrao]}>
                        <Text style={[criar_conta_styles.text_title]}>
                            Vamos criar a sua
                        </Text>
                        <Text style={[criar_conta_styles.text_title]}>
                            conta
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render_form_cadastro() {
        return (
            <View style={[global_styles.container_padrao, {height: '80%'}]}>
                <Input placeholder_input={'Nome Completo'} multiline_input={false} secure_text_entry_input={false} number_of_lines_input={1}
                       value_input={''} on_change_text={this.change_email}/>

                <Input placeholder_input={'E-mail'} multiline_input={false} secure_text_entry_input={false} number_of_lines_input={1}
                       value_input={''} on_change_text={this.change_senha}/>

                <Input placeholder_input={'Telefone'} multiline_input={false} secure_text_entry_input={false} number_of_lines_input={1}
                       value_input={''} on_change_text={this.change_senha}/>

                <Input placeholder_input={'Senha'} multiline_input={false} secure_text_entry_input={true} number_of_lines_input={1}
                       value_input={''} on_change_text={this.change_senha}/>

                <Button text_button={'Criar conta'} color_button={'#5dcc3a'} on_press_button={this.create_account}/>

                <View style={global_styles.container_btns}>
                    <TouchableOpacity activeOpacity={0.8} style={global_styles.container_padrao}>
                        <Text style={[global_styles.text_gray, {textDecorationLine: 'underline'}]}>
                            Declaro que eu li e aceito os termos de uso
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={global_styles.container_btns}>
                    <TouchableOpacity onPress={() => this.go_to_login()} activeOpacity={0.8}
                                      style={global_styles.container_padrao}>
                        <Text style={global_styles.text_gray}>
                            Já possui uma conta? Acessar o sistema
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {
                marginTop: this.state.statusBarHeight
            }]}>
                {this.render_top()}
                {this.render_form_cadastro()}
            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}