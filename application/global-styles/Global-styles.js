import { StyleSheet } from 'react-native';

const stylesGlobal = StyleSheet.create({

    container_page: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },

    container_padrao: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    img_logo: {
        width: 50,
        height: 50,
        tintColor: '#fff'
    },

    text_title: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#fff'
    },

    container_text_subtitle: {
        marginTop: -10
    },

    text_subtitle: {
        fontSize: 16,
        color: '#fff'
    },

    btn_padrao: {
        width: '100%',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    color_green: {
        backgroundColor: '#5dcc3a'
    },

    color_blue: {
        backgroundColor: '#0e95ff'
    },

    text_white: {
        color: '#fff'
    },

    text_gray: {
        color: '#ababab'
    },

    container_btns: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    container_input: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderColor: '#ababab',
        borderWidth: 1,
    },

    inputs: {
        width: '100%',
        backgroundColor: '#fff',
        color: '#ababab',
        fontSize: 18,
        padding: 10,
    }

});

export default stylesGlobal;