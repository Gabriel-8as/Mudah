import React from 'react';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import {
    Teste
} from "./application/pages";

export default createAppContainer(
    createSwitchNavigator({
            'Teste': {
                screen: Teste,
            },
        },
        {
            initialRouteName: 'Teste',
            navigationOptions:
                {
                    header: null
                }
        }
    ));