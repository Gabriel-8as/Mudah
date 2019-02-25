import React, {Fragment} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    NativeModules,
    ScrollView,
    Dimensions,
    Animated,
    PixelRatio,
    TextInput
} from 'react-native';
import MapView from 'react-native-maps';
import mapa_styles from './Mapa-styles';
import Directions from './mapaComponents/directions/Directions';
import GlobalService from "../../services/global/global-service";

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
            destination: null,
            details_mudanca: false,
            place: null,
            height_details: 0,
            animation: new Animated.Value(0),
            valor_proposta: 0,
            rota_ativa: false,
            duration: null,
            km: null,
            result_directions: null,

            places: [
                {
                    id: 1,
                    name: 'Gabriel',
                    description: 'Preciso fazer uma mudança de Curitiba para São Paulo!',

                    origem:
                        {
                            endereco: 'Rua Javaés, 335',
                            latitude: -23.531942,
                            longitude: -46.645147,
                        },
                    destino:
                        {
                            endereco: 'Avenida Presidente Affonso Camargo, 330 - Curitiba',
                            latitude: -25.4367565,
                            longitude: -49.259504
                        },
                    data: '14/09/2019',
                    status: 'Aguardando orçamentos',
                    qtdOrcamentos: 125,
                    itens: 'Guarda roupas, cama, geladeira, sofá, microondas'
                },
                {
                    id: 2,
                    name: 'Roberto',
                    description: 'Carregar 6 gaveteiros do Bom Retiro até o Itaim Bibi.',

                    origem: {
                        endereco: 'Rua Anhaia, 185',
                        latitude: -23.530289,
                        longitude: -46.636156,
                    },
                    destino:
                        {
                            endereco: 'Rua Silva Pinto, 355',
                            latitude: -23.4886262,
                            longitude: -46.7336627
                        },
                    data: '21/02/2019',
                    status: 'Aguardando orçamentos',
                    qtdOrcamentos: 100,
                    itens: 'Guarda roupas, cama, geladeira, sofá, microondas'
                },
                {
                    id: 3,
                    name: 'Katia',
                    description: 'Transportar uma geladeira do Brás até Vila Mariana.',

                    origem:
                        {
                            endereco: 'Rua teste, 335',
                            latitude: -23.533584,
                            longitude: -46.640780,
                        },
                    destino:
                        {
                            endereco: 'Rua dos testessss, 277',
                            latitude: -23.4886262,
                            longitude: -46.7336627
                        },
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
        // Pegar a localização atual do usuário
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.02042,
                        longitudeDelta: 0.0331,
                    }
                });
            },
            (e) => {
                console.log('Error: ', e);
            },
            {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
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

    get_pixel_size(pixels) {
        return Platform.select({
            ios: pixels,
            android: PixelRatio.getPixelSizeForLayoutSize(pixels),
        });
    }

    show_details = ((place) => {
        if (this.state.details_mudanca) {
            Animated.timing(this.state.animation, {
                toValue: 0,
                duration: 400
            }).start(() => {
                this.setState({
                    details_mudanca: false,
                    destination: null
                });
            });
            place.mark.hideCallout();
            this.mapView.animateToCoordinate(this.state.region);
        } else {

            this.state.destination = {
                latitude: place.destino.latitude,
                longitude: place.destino.longitude
            };

            this.setState({
                details_mudanca: true,
                destination: this.state.destination
            });

            Animated.timing(this.state.animation, {
                toValue: 100,
                duration: 400
            }).start();

            let coordinates = [
                {
                    latitude: place.origem.latitude,
                    longitude: place.origem.longitude,
                },
                {
                    latitude: place.destino.latitude,
                    longitude: place.destino.longitude
                }
            ];

            this.mapView.fitToCoordinates(coordinates, {
                edgePadding: {
                    top: this.get_pixel_size(50),
                    left: this.get_pixel_size(50),
                    right: this.get_pixel_size(50),
                    bottom: this.get_pixel_size(500)
                }
            });
        }
    });

    change_valor_proposta(add) {
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

    // Mostra a rota para entrega
    show_rota = () => {
        this.setState({rota_ativa: true, details_mudanca: false});
        this.mapView.fitToCoordinates(this.state.result_directions.coordinates, {
            edgePadding: {
                top: this.get_pixel_size(20),
                left: this.get_pixel_size(20),
                right: this.get_pixel_size(20),
                bottom: this.get_pixel_size(20)
            }
        });
    };

    get_result_directions = (result) => {
        this.state.result_directions = result;
        this.state.duration = Math.floor(result.duration);
        this.state.km = result.distance;
        this.setState({
            duration: this.state.duration,
            km: this.state.km,
            result_directions: this.state.result_directions
        });
    };

    render_details_mudanca() {
        let show_dados = this.state.animation.interpolate({
            inputRange: [0, 100],
            outputRange: [400, 0]
        });

        if (this.state.details_mudanca) {
            return (
                <Animated.View style={[mapa_styles.container_place, {transform: [{translateY: show_dados}]}]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.show_details(this.state.place)}
                                      style={mapa_styles.container_icon}>
                        <View style={mapa_styles.touch_icon}>
                            <Image style={mapa_styles.icon_close_details}
                                   source={{uri: 'https://cdn3.iconfinder.com/data/icons/modifiers-add-on-2/48/v-11-512.png'}}/>
                        </View>
                    </TouchableOpacity>

                    <ScrollView style={[mapa_styles.place]}>
                        <View style={mapa_styles.details_mudanca}>
                            <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                Origem: {this.state.place.origem.endereco}
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 20, fontWeight: 'bold'}]}>
                                Destino: {this.state.place.destino.endereco}
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
                                Duração: {this.state.duration} min
                            </Text>

                            <Text style={[mapa_styles.text_item, {fontSize: 16}]}>
                                KM: {this.state.km}
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
                                    R$
                                </Text>

                                <TextInput
                                    style={{
                                        backgroundColor: '#fff',
                                        borderColor: '#f2f2f2',
                                        borderWidth: 1,
                                        textAlign: 'center',
                                        color: '#5A5A5A',
                                        fontSize: 34,
                                        fontWeight: 'bold',
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        marginLeft: 5
                                    }}
                                    keyboardType='numeric'
                                    underlineColorAndroid="transparent"
                                    value={GlobalService.numberToMoney(this.state.valor_proposta.toString())}
                                    defaultValue={this.state.valor_proposta === 0 || this.state.valor_proposta === '' ? '0,00' : GlobalService.numberToMoney(this.state.valor_proposta.toString())}
                                    onChangeText={(text) => {
                                        this.state.valor_proposta = GlobalService.numberToMoney(text);
                                        this.setState({
                                            valor_proposta: this.state.valor_proposta
                                        });
                                    }}
                                />
                            </View>

                            <View style={[mapa_styles.container_icon, {marginTop: 10}]}>
                                <View style={mapa_styles.buttons_menos_mais}>
                                    <TouchableOpacity onPress={() => this.change_valor_proposta(false)}
                                                      style={[mapa_styles.touch_buttons, {
                                                          borderRightColor: '#5A5A5A',
                                                          borderRightWidth: 1
                                                      }]}>
                                        <Text style={[mapa_styles.text_item, {fontSize: 20}]}>
                                            -
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.change_valor_proposta(true)}
                                                      style={mapa_styles.touch_buttons}>
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
                                <TouchableOpacity style={mapa_styles.touch_button_proposta}>
                                    <Text style={mapa_styles.text_callout}>
                                        Enviar Proposta
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[mapa_styles.container_icon, {marginTop: 10}]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.show_rota();
                                    }}
                                    style={mapa_styles.touch_button_proposta}>
                                    <Text style={mapa_styles.text_callout}>
                                        Ver rota
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View>
            )
        } else {
            return null;
        }
    }

    render_buttons() {
        return (
            <View style={{top: 10, left: 10, position: 'absolute', zIndex: 99}}>
                {this.state.rota_ativa ?
                    <TouchableOpacity
                        style={{padding: 10}}
                        onPress={() => {
                        this.show_details(this.state.place);
                        this.setState({rota_ativa: false});
                    }}>
                        <Image style={[{width: 30, height: 30, tintColor: '#000'}]}
                               source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/left-arrow-8-458424.png'}}/>
                    </TouchableOpacity> :

                    <TouchableOpacity onPress={() => this.exit()}
                                      style={{padding: 10, backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <Text style={{color: '#fff'}}>
                            SAIR
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }

    render_map() {
        return (
            <View style={[mapa_styles.container_maps, {marginTop: this.state.statusBarHeight}]}>
                <MapView
                    style={mapa_styles.map_view}
                    ref={map => this.mapView = map}
                    initialRegion={this.state.region}
                    showsUserLocation
                    loadingEnabled
                    onMapReady={this._mapReady}
                >
                    {this.state.destination && (
                        <Fragment>
                            <Directions
                                origin={this.state.place.origem}
                                destination={this.state.destination}
                                onReady={result => {this.get_result_directions(result)}}
                            />
                                <MapView.Marker coordinate={this.state.destination}>
                                    <Image style={{width: 30, height: 30}}
                                           source={{uri: 'https://pt.seaicons.com/wp-content/uploads/2016/03/Map-Marker-Flag-5-Pink-icon.png'}}/>
                                </MapView.Marker>
                        </Fragment>
                    )}

                    {this.state.places.map((place, index) => (
                        <MapView.Marker
                            ref={mark => place.mark = mark}
                            // title={place.name}
                            // description={place.description}
                            key={index}
                            coordinate={{
                                latitude: place.origem.latitude,
                                longitude: place.origem.longitude,
                            }}
                        >
                            <Image style={[mapa_styles.img_marker]}
                                   source={{uri: 'https://png.pngtree.com/svg/20170919/place_787081.png'}}/>
                                <MapView.Callout onPress={() => {
                                    this.setState({place: place, rota_ativa: false});
                                    this.show_details(place);
                                }}
                                             tooltip={true}>
                                <View style={[mapa_styles.container_callout]}>

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

                {this.render_buttons()}
                {this.render_details_mudanca()}
            </View>
        );
    }

    render() {
        return (
            this.render_map()
        );
    }
}