import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    NativeModules,
    ImageBackground
} from 'react-native';
import main_styles from './Main-styles';
import global_styles from '../../global-styles/Global-styles';
import Button from "../../components/button/Button";
const {StatusBarManager} = NativeModules;

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statusBarHeight: 0
        }
    }

    componentWillMount(){
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

    go_to_create_new_transportadora = (() => {
        let type = 1;
        this.props.navigation.navigate('CriarConta', {type});
    });

    go_to_create_new_mudanca = (() => {
        let type = 2;
        this.props.navigation.navigate('CriarConta', {type});
    });

    render_top() {
        return (
            <View style={main_styles.container_top}>
                <View style={global_styles.container_padrao}>
                    <Image style={global_styles.container_page}
                           source={require('../../assets/imgs/jpg/header_logo.jpeg')}/>
                </View>
            </View>
        );
    }

    render_buttons() {
        return (
            <View style={[global_styles.container_padrao, {height: '40%'}]}>

                <Button text_button={'Cadastrar Transportadora'} color_button={'#0e95ff'} on_press_button={this.go_to_create_new_transportadora} />

                <Button text_button={'Cadastrar minha mudança'} color_button={'#5dcc3a'} on_press_button={this.go_to_create_new_mudanca} />

                <View style={[global_styles.container_btns, {marginBottom: 0}]}>
                    <TouchableOpacity onPress={() => this.go_to_login()} activeOpacity={0.8} style={global_styles.container_padrao}>
                        <Text style={global_styles.text_gray}>
                            Você já tem uma conta? Clique aqui
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render_page() {
        return (
            <View style={[global_styles.container_page, {marginTop: this.state.statusBarHeight}]}>
                {this.render_top()}
                {this.render_buttons()}
            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}