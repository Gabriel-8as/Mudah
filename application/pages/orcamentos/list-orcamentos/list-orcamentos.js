import React from 'react';
import {FlatList} from 'react-native';
import ListItemOrcamentos from "../list-item-orcamentos/list-item-orcamentos";

const ListOrcamentos = props => {

    const {lista_orcamentos, go_to_chat} = props;

    return (
        <FlatList data={lista_orcamentos} renderItem={({item}) => (
            <ListItemOrcamentos lista_orcamentos={item} go_to_chat={go_to_chat}/>
        )}
                  keyExtractor={item => item.id}/>
    );
};

export default ListOrcamentos;