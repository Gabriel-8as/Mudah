import { StyleSheet } from 'react-native';

const stylesMaps = StyleSheet.create({

    container_maps: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    map_view: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    container_place: {
        width: '100%',
        maxHeight: '75%',
    },

    place: {
        height: '100%',
        backgroundColor: '#fff',
        padding: 10,
    },

    text_item: {
        color: '#5A5A5A'
    },

    img_marker: {
        tintColor: '#0e95ff',
        width: 50,
        height: 50
    },

    container_callout: {
        width: 250,
        padding: 10,
        backgroundColor: '#86cc6d',
        borderRadius: 5,
    },

    text_callout: {
        color: '#fff'
    },

    container_button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    button: {
        padding: 10,
        backgroundColor: '#525252',
        borderRadius: 5,
    },

    container_icon: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    touch_icon: {
        width: 40,
        height: 40,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon_close_details: {
        width: '100%',
        height: '100%',
        tintColor: '#000'
    },

    details_mudanca: {
        width: '100%',
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        padding: 10
    },

    buttons_menos_mais: {
        borderColor: '#5A5A5A',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row'
    },

    touch_buttons: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    touch_button_proposta: {
        width: '80%',
        padding: 10,
        backgroundColor: '#5A5A5A',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },



});

export default stylesMaps;