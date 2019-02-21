import {StyleSheet} from 'react-native';

const stylesListItemMudancas = StyleSheet.create({

    container_list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    touch_item: {
        width: '90%',
        flexDirection: 'row',
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        paddingBottom: 5
    },

    container_text: {
        flex: 1
    },

    text_item: {
        color: '#5A5A5A'
    },

    container_icon: {
        width: 30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        width: 30,
        height: 30,
        tintColor: '#5A5A5A'
    }
});

export default stylesListItemMudancas;