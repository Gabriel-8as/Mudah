import {StyleSheet} from 'react-native';

const stylesOrcamentos = StyleSheet.create({

    container_item_mudanca: {
        width: '100%',
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    item: {
        width: '90%',
        height: '100%',
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        paddingBottom: 5
    },

    container_text: {
        flex: 1,
    },

    text_item: {
        color: '#5A5A5A'
    },

    container_tabs: {
        width: '90%',
        borderColor: '#b0bec5',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    touch_tabs: {
        flex: 1,
        padding: 5,
        paddingBottom: 8,
        paddingTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default stylesOrcamentos;