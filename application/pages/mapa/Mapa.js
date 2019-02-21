import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    NativeModules,
    TextInput,
    ImageBackground,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import MapView from 'react-native-maps';
import mapa_styles from './Mapa-styles';
import type {ImageSource} from "react-native/Libraries/Image/ImageSource";
import orcamentos_styles from "../orcamentos/Orcamentos-styles";

const {StatusBarManager} = NativeModules;

export default class Mapa extends React.Component {

    constructor(props) {
        super(props);

        let {width, height} = Dimensions.get('window');

        this.state = {
            statusBarHeight: 0,
            screen_width: width,
            screen_height: height,
            region: null,
            details_mudanca: false,
            place: null,
            height_details: 0,
            animation: new Animated.Value(0),
            valor_proposta: 0,

            places: [
                {
                    id: 1,
                    name: 'Gabriel',
                    description: 'Preciso fazer uma mudança de Curitiba para São Paulo!',
                    latitude: -23.531942,
                    longitude: -46.645147,
                    origem: 'Rua Javaés, 335',
                    destino: 'Rua dos Gumões, 277',
                    data: '14/09/2019',
                    status: 'Aguardando orçamentos',
                    qtdOrcamentos: 125,
                    itens: 'Guarda roupas, cama, geladeira, sofá, microondas'
                },
                {
                    id: 2,
                    name: 'Roberto',
                    description: 'Carregar 6 gaveteiros do Bom Retiro até o Itaim Bibi.',
                    latitude: -23.530289,
                    longitude: -46.636156,
                    origem: 'Rua Anhaia, 185',
                    destino: 'Rua Silva Pinto, 355',
                    data: '21/02/2019',
                    status: 'Aguardando orçamentos',
                    qtdOrcamentos: 100,
                    itens: 'Guarda roupas, cama, geladeira, sofá, microondas'
                },
                {
                    id: 3,
                    name: 'Katia',
                    description: 'Transportar uma geladeira do Brás até Vila Mariana.',
                    latitude: -23.533584,
                    longitude: -46.640780,
                    origem: 'Rua teste, 335',
                    destino: 'Rua dos testessss, 277',
                    data: '14/09/2019',
                    status: 'Aguardando orçamentos',
                    qtdOrcamentos: 125,
                    itens: 'Guarda roupas, cama, geladeira, sofá, microondas'
                },
            ]
        }
    }

    componentWillMount() {
        this.get_status_bar_height();
    }

    async componentDidMount() {
        // Pegar a localização do usuário
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.01042,
                        longitudeDelta: 0.0231,
                    }
                });

                console.log('region: ', this.state.region);
            },
            (e) => {
                console.log('Error: ', e);
            },
            {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

    get_status_bar_height() {
        let statusBarHeight = 0;

        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((height) => {
                statusBarHeight = height.height;
                this.setState({
                    statusBarHeight: statusBarHeight,
                });
            });
        }
    }

    exit = (() => {
        this.props.navigation.navigate('Main')
    });

    _mapReady = () => {
        // this.state.places.map((place) => {
        //     place.mark.showCallout();
        // });

        // this.state.places[0].mark.showCallout();
    };

    // render_footer_map() {
    //     return (
    //         <ScrollView style={mapa_styles.container_places}
    //                     horizontal={true}
    //                     showsHorizontalScrollIndicator={false}
    //                     pagingEnabled
    //                     onMomentumScrollEnd={e => {
    //                         const scrolled = e.nativeEvent.contentOffset.x;
    //                         const place = (scrolled > 0) ?
    //                             scrolled / this.state.screen_width : 0;
    //
    //                         const {latitude, longitude, mark} = this.state.places[place];
    //
    //                         this.mapView.animateToCoordinate({
    //                             latitude: latitude,
    //                             longitude: longitude,
    //                         }, 1000);
    //
    //                         setTimeout(() => {
    //                             mark.showCallout();
    //                         }, 1000);
    //                     }}>
    //
    //             {this.state.places.map((place, index) => (
    //                 <View key={index} style={[mapa_styles.places, {width: this.state.screen_width - 40}]}>
    //                     <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
    //                         {place.name}
    //                     </Text>
    //                     <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
    //                         {place.description}
    //                     </Text>
    //                 </View>
    //             ))}
    //         </ScrollView>
    //     )
    // }

    render_details_mudanca() {

        let show_dados = this.state.animation.interpolate({
            inputRange: [ 0, 100 ],
            outputRange: [ 400, 0 ]
        });

        if (this.state.details_mudanca) {
            return (
                <Animated.View style={[mapa_styles.container_place, {transform: [{translateY: show_dados}]}]}>
                    <View style={[mapa_styles.place]}>
                        <TouchableOpacity onPress={() => {
                            Animated.timing(this.state.animation, {
                                toValue: 0,
                                duration: 400
                            }).start(() => {
                                this.setState({details_mudanca: false});
                            });

                        }}
                                          style={mapa_styles.container_icon}>
                            <View
                                style={mapa_styles.touch_icon}>

                                <Image style={mapa_styles.icon_close_details}
                                       source={{uri: 'https://cdn3.iconfinder.com/data/icons/modifiers-add-on-2/48/v-11-512.png'}}/>

                            </View>
                        </TouchableOpacity>

                        <View style={mapa_styles.details_mudanca}>
                            <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                Origem: {this.state.place.origem}
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                Destino: {this.state.place.destino}
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
                                Data: {this.state.place.data}
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
                                Já recebeu {this.state.place.qtdOrcamentos} orçamentos
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[mapa_styles.details_mudanca, {flexDirection: 'row', alignItems: 'center'}]}>
                            <View style={{flex: 1}}>
                                <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                    Lista de itens
                                </Text>
                                <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
                                    {this.state.place.itens}
                                </Text>
                            </View>

                            <View style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                                <Image style={{tintColor: '#5A5A5A', width: 30, height: 30,}}
                                       source={{uri: 'https://static.thenounproject.com/png/1916331-200.png'}}/>
                            </View>
                        </TouchableOpacity>

                        <View style={[mapa_styles.details_mudanca, {borderBottomWidth: 0}]}>
                            <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                Enviar Orçamento
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 12}]}>
                                Lembre-se que você pode enviar apenas uma estimativa e negociar o preço final depois!
                            </Text>

                            <View style={[mapa_styles.container_icon, {marginTop: 10, flexDirection: 'row'}]}>
                                <Text style={[mapa_styles.text_item, {fontSize: 34, fontWeight: 'bold'}]}>
                                    R$ {this.state.valor_proposta}
                                </Text>

                                {/*<Text style={[mapa_styles.text_item, {fontSize: 34, fontWeight: 'bold'}]}>*/}
                                    {/*R$*/}
                                {/*</Text>*/}

                                {/*<TextInput*/}
                                    {/*style={{backgroundColor: '#fff', textAlign: 'center', color: '#5A5A5A', fontSize: 34, fontWeight: 'bold'}}*/}
                                    {/*keyboardType='numeric'*/}
                                    {/*underlineColorAndroid="transparent"*/}
                                    {/*value={this.state.valor_proposta != null || this.state.valor_proposta != undefined ? this.state.valor_proposta.toString() : this.state.valor_proposta}*/}
                                    {/*onChangeText={(text) => {*/}
                                        {/*this.state.valor_proposta = text;*/}
                                        {/*this.setState({*/}
                                            {/*valor_proposta: this.state.valor_proposta*/}
                                        {/*});*/}
                                    {/*}}*/}
                                {/*/>*/}

                            </View>

                            <View style={[mapa_styles.container_icon, {marginTop: 10}]}>
                                <View style={{
                                    borderColor: '#5A5A5A',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity onPress={() => this.change_valor_proposta(false)}
                                        style={{
                                            width: 50,
                                            borderRightColor: '#5A5A5A',
                                            borderRightWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text style={[mapa_styles.text_item, {fontSize: 20}]}>
                                            -
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.change_valor_proposta(true)}
                                        style={{width: 50, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={[mapa_styles.text_item, {fontSize: 20}]}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[mapa_styles.container_icon, {marginTop: 10}]}>
                                <Text style={[mapa_styles.text_item, {fontSize: 14, fontWeight: 'bold'}]}>
                                    Patrocinar Proposta
                                </Text>
                            </View>

                            <View style={[mapa_styles.container_icon, {marginTop: 10}]}>
                                <TouchableOpacity style={{
                                    width: '80%',
                                    padding: 10,
                                    backgroundColor: '#5A5A5A',
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={mapa_styles.text_callout}>
                                        Enviar Proposta
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            )
        } else {
            return null;
        }
    }

    change_valor_proposta(add){
        if (add) {
            this.state.valor_proposta++;
            this.setState({
                valor_proposta: this.state.valor_proposta
            });
        } else if (!add && this.state.valor_proposta > 0) {
            this.state.valor_proposta--;
            this.setState({
                valor_proposta: this.state.valor_proposta
            });
        }
    }

    render() {
        return (
            <View style={mapa_styles.container_maps}>
                <MapView
                    style={mapa_styles.map_view}
                    ref={map => this.mapView = map}
                    initialRegion={this.state.region}
                    showsUserLocation
                    loadingEnabled
                    onMapReady={this._mapReady}
                >

                    {this.state.places.map((place, index) => (

                        <MapView.Marker
                            ref={mark => place.mark = mark}
                            // title={place.name}
                            // description={place.description}
                            key={index}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                            }}
                        >

                            <Image style={mapa_styles.img_marker}
                                   source={{uri: 'https://png.pngtree.com/svg/20170919/place_787081.png'}}/>

                            <MapView.Callout onPress={() => {
                                this.setState({details_mudanca: true, place: place});
                                Animated.timing(this.state.animation, {
                                    toValue: 100,
                                    duration: 400
                                }).start();
                            }}
                                             tooltip={true}>
                                <View style={mapa_styles.container_callout}>

                                    <Text style={[mapa_styles.text_callout, {fontSize: 20, fontWeight: 'bold'}]}>
                                        {place.name}
                                    </Text>

                                    <Text style={[mapa_styles.text_callout, {fontSize: 16}]}>
                                        {place.description}
                                    </Text>

                                    <View style={mapa_styles.container_button}>
                                        <View style={mapa_styles.button}>
                                            <Text style={mapa_styles.text_callout}>
                                                Enviar Proposta
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>

                <View style={{top: 10, left: 10, position: 'absolute', zIndex: 99}}>
                    <TouchableOpacity onPress={() => this.exit()}
                                      style={{padding: 10, backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <Text style={{color: '#fff'}}>
                            SAIR
                        </Text>
                    </TouchableOpacity>
                </View>

                {this.render_details_mudanca()}
            </View>
        );
    }
}