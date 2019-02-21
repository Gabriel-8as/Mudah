import {StyleSheet} from 'react-native';

const stylesListItemOrcamentos = StyleSheet.create({

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
    },

    container_img_empresa: {
        width: 40,
        height: 40,
        borderRadius: 3,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },

    img_empresa: {
        width: '100%',
        height: '100%'
    }

});

export default stylesListItemOrcamentos;