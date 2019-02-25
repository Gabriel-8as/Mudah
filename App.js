import React from 'react';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import {
    Main,
    Login,
    CriarConta,
    CadastroMudanca,
    CadastroTransportadora,
    MinhasMudancas,
    Orcamentos,
    Mapa
} from "./application/pages";

export default createAppContainer(
    createStackNavigator({
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
            'Orcamentos': {
                screen: Orcamentos,
            },
            'Mapa': {
                screen: Mapa,
            },
        },
        {
            initialRouteName: 'Mapa',
            defaultNavigationOptions:
                {
                    header: null
                }
        }
    ));