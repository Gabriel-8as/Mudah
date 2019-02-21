import React from 'react';
import {FlatList} from 'react-native';
import ListItemMudancas from "../list-item-mudancas/list-item-mudancas";

const ListMudancas = props => {

    const {lista_mudanca, go_to_orcamentos} = props;

    return (
        <FlatList data={lista_mudanca} renderItem={({item}) => (
            <ListItemMudancas item_mudanca={item} go_to_orcamentos={go_to_orcamentos}/>
        )}
                  keyExtractor={item => item.id}/>
    );
};

export default ListMudancas;