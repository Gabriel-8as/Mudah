import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform,
    NativeModules,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import global_styles from '../../global-styles/Global-styles';
import minhas_mudancas_styles from './MinhasMudancas-styles';
import Header from "../../components/header/Header";

const {StatusBarManager} = NativeModules;

export default class MinhasMudancas extends React.Component {

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

    search_mudancas = ((value) => {

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
            <View style={[global_styles.container_padrao, {borderTopColor: '#dadada', borderTopWidth: 1, paddingTop: 10}]}>
                <View style={[minhas_mudancas_styles.container_tabs]}>
                    <TouchableOpacity style={[minhas_mudancas_styles.touch_tabs, {backgroundColor: '#b0bec5', borderRightColor: '#b0bec5', borderRightWidth: 1}]}>
                        <Text style={global_styles.text_white}>
                            Todas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[minhas_mudancas_styles.touch_tabs, {borderRightColor: '#b0bec5',  borderRightWidth: 1}]}>
                        <Text style={{color: '#b0bec5'}}>
                            Aguardando
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[minhas_mudancas_styles.touch_tabs, {borderRightColor: '#b0bec5', borderRightWidth: 1}]}>
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

    render_list_mudancas(){
        return(
            <View>

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

            </View>
        );
    }

    render() {
        return (
            this.render_page()
        );
    }
}