import { StyleSheet } from 'react-native';

const stylesMinhasMudancas = StyleSheet.create({

    container_input_search: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    icon_input: {
        width: 25,
        height: 25,
        tintColor: '#ababab'
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

    container_footer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#dadada',
        borderTopWidth: 1,
        bottom: 0
    },

    touch_footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },



});

export default stylesMinhasMudancas;