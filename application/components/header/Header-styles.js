import { StyleSheet } from 'react-native';

const stylesHeader = StyleSheet.create({

    containerHeader: {
        width: '100%',
        height: 60,
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    contentHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    imgBack: {
        width: 25,
        height: 25
    },

    titleHeader: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textTitleHeader: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },

    containerImgMarca: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgMarca: {
        width: 30,
        height: 30,
    },

});

export default stylesHeader;