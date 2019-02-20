import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    NativeModules,
    TextInput,
    ImageBackground
} from 'react-native';
import login_styles from './Login-styles';
import global_styles from '../../global-styles/Global-styles';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const {StatusBarManager} = NativeModules;

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0
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

    go_to_cadastro = (() => {
        this.props.navigation.navigate('Main');
    });

    entrar() {
        console.log('entrar')
    }

    change_email = ((value) => {
        console.log('VALUE: ', value)
    });

    change_senha = ((value) => {
        console.log('VALUE: ', value)
    });

    render_form_login() {
        return (
            <View style={[global_styles.container_padrao, login_styles.container_form]}>
                <Input placeholder_input={'E-mail'} multiline_input={false} secure_text_entry_input={false} value_input={''} number_of_lines_input={1}
                       on_change_text={this.change_email}/>
                <Input placeholder_input={'Senha'} multiline_input={false} secure_text_entry_input={true} value_input={''} number_of_lines_input={1}
                       on_change_text={this.change_senha}/>

                <Button text_button={'Entrar'} color_button={'#5dcc3a'} on_press_button={this.entrar}/>

                <View style={global_styles.container_btns}>
                    <TouchableOpacity activeOpacity={0.8} style={global_styles.container_padrao}>
                        <Text style={global_styles.text_white}>
                            Esqueci a minha senha
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={global_styles.container_btns}>
                    <TouchableOpacity onPress={() => this.go_to_cadastro()} activeOpacity={0.8}
                                      style={global_styles.container_padrao}>
                        <Text style={global_styles.text_white}>
                            Não tem cadastro ainda? Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {
                marginTop: this.state.statusBarHeight,
            }]}>

                <Image style={global_styles.container_page}
                       source={require('../../assets/imgs/jpg/background_logo.jpeg')}/>

                {this.render_form_login()}
            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}