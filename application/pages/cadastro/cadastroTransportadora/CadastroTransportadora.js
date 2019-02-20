import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    NativeModules,
    TextInput
} from 'react-native';
import global_styles from '../../../global-styles/Global-styles';
import criar_conta_styles from '../CriarConta-styles';
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";

const {StatusBarManager} = NativeModules;

export default class CadastroTransportadora extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0,
            cadastro_passo_um: true,
            cadastro_passo_dois: false
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

    next = (() => {
       this.setState({
            cadastro_passo_um: false,
            cadastro_passo_dois: true
       });
    });

    render_top() {
        return (
            <View style={[criar_conta_styles.container_top, {marginTop: 0, marginBottom: 10}]}>
                <View style={[global_styles.container_padrao]}>
                    <View style={[global_styles.container_padrao]}>
                        <Text style={[criar_conta_styles.text_title]}>
                            Cadastre a sua
                        </Text>
                        <Text style={[criar_conta_styles.text_title]}>
                            transportadora
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render_form_cadastro(){
        if(this.state.cadastro_passo_um){
            return(
                this.render_form_cadastro_passo_um()
            )
        }else if(this.state.cadastro_passo_dois){
            return(
                this.render_form_cadastro_passo_dois()
            )
        }else{
            return null;
        }
    }

    render_form_cadastro_passo_um() {
        return (
            <ScrollView style={[{height: '80%'}]}>

                <View style={[global_styles.container_padrao]}>
                    <Input placeholder_input={'Nome da empresa'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_email}/>

                    <Input placeholder_input={'CEP'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Endereço'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>
                        <View style={[global_styles.container_input, {width: '48%'}]}>
                            <TextInput
                                style={[global_styles.inputs]}
                                placeholder={'Nº'}
                                placeholderTextColor="#ababab"
                                underlineColorAndroid='transparent'
                                // value={value_input}
                                // onChangeText={(text) => on_change_text(text)}
                            />

                        </View>

                        <View style={[global_styles.container_input, {width: '48%'}]}>
                            <TextInput
                                style={[global_styles.inputs]}
                                placeholder={'Complemento'}
                                placeholderTextColor="#ababab"
                                underlineColorAndroid='transparent'
                                // value={value_input}
                                // onChangeText={(text) => on_change_text(text)}
                            />

                        </View>

                    </View>

                    <Input placeholder_input={'Bairro'} multiline_input={false} number_of_lines_input={1}
                           secure_text_entry_input={false} value_input={''} on_change_text={this.change_senha}/>

                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>
                        <View style={[global_styles.container_input, {width: '68%'}]}>
                            <TextInput
                                style={[global_styles.inputs]}
                                placeholder={'Cidade'}
                                placeholderTextColor="#ababab"
                                underlineColorAndroid='transparent'
                                // value={value_input}
                                // onChangeText={(text) => on_change_text(text)}
                            />

                        </View>

                        <View style={[global_styles.container_input, {width: '28%'}]}>
                            <TextInput
                                style={[global_styles.inputs]}
                                placeholder={'UF'}
                                placeholderTextColor="#ababab"
                                underlineColorAndroid='transparent'
                                // value={value_input}
                                // onChangeText={(text) => on_change_text(text)}
                            />

                        </View>

                    </View>

                    <Input placeholder_input={'Fale sobre a sua empresa'} secure_text_entry_input={false}
                           multiline_input={true} number_of_lines_input={3}
                           value_input={''} on_change_text={this.change_senha}/>

                </View>
            </ScrollView>
        );
    }

    render_form_cadastro_passo_dois() {
        return (
            <ScrollView style={[{height: '80%'}]}>

                <View style={[global_styles.container_padrao]}>
                    <Input placeholder_input={'Qtd de veículos'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_email}/>

                    <Input placeholder_input={'Modelo/Marca'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Baú, Furgão, Tanque, Basculante ...'} multiline_input={false} secure_text_entry_input={false}
                           number_of_lines_input={1}
                           value_input={''} on_change_text={this.change_senha}/>

                    <Input placeholder_input={'Aceitar carreto Interestadual?'} multiline_input={false} number_of_lines_input={1}
                           secure_text_entry_input={false} value_input={''} on_change_text={this.change_senha}/>

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
                    {this.state.cadastro_passo_um ?
                        <Button text_button={'Avançar'} color_button={'#5dcc3a'}
                                on_press_button={this.next}/>
                        :
                        <Button text_button={'Finalizar e encontrar clientes'} color_button={'#5dcc3a'}
                                on_press_button={this.finalizar}/>
                    }
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