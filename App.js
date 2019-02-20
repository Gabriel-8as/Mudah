import React from 'react';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import {
    Main,
    Login,
    CriarConta,
    CadastroMudanca,
    CadastroTransportadora,
    MinhasMudancas
} from "./application/pages";

export default createAppContainer(
    createSwitchNavigator({
            'Main': {
                screen: Main,
            },
            'Login': {
                screen: Login,
            },
            'CriarConta': {
                screen: CriarConta,
            },
            'CadastroMudanca': {
                screen: CadastroMudanca,
            },
            'CadastroTransportadora': {
                screen: CadastroTransportadora,
            },
            'MinhasMudancas': {
                screen: MinhasMudancas,
            },
        },
        {
            initialRouteName: 'Main',
            navigationOptions:
                {
                    header: null
                }
        }
    ));