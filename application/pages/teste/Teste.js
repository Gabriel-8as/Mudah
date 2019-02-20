import React from 'react';
import {View, Text} from 'react-native';

export default class Teste extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render(){
        return(
          <View style={{width: '100%', height: '100%'}}>
              <Text>
                  TESTE
              </Text>
          </View>
        );
    }

}