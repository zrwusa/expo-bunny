import React, {Component, createRef} from "react";
import {View, StyleSheet, Dimensions, Platform, Text, Animated, Image} from "react-native";
import * as Location from 'expo-location';
import {ThunkDispatch} from "redux-thunk";
import {DemoMap, NearbyFilm, RootState} from "../../types/models";
import {Action} from "redux";
import {GetNearbyFilmsReqParams} from "../../types/payloads";
import {getNearbyFilms} from "../../stores/demo-map/actions";
import {connect} from "react-redux";
import MapView, {MapEvent, PROVIDER_GOOGLE} from "react-native-maps";
const { Marker } = MapView as any; // react-native-maps under typescript bug trick

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

type BareProps = { title?: string }
const mapStateToProps = (rootState: RootState) => ({...rootState.demoMapState});

const mapDispatchToProps = (dispatch: ThunkDispatch<DemoMap, void, Action>) => ({
    getNearbyFilms: async (data: GetNearbyFilmsReqParams) => dispatch(getNearbyFilms(data)),
});
type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & BareProps;

class DemoMapScreen extends Component<Props> {

    private mapView = createRef<MapView>()
    private index: number = 0;
    private regionTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);
    private animation: Animated.Value = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onMarkerPress = this.onMarkerPress.bind(this);
        this.onMapviewMarkerPress = this.onMapviewMarkerPress.bind(this);
    }

    async componentDidMount() {
        // this.getLocation().then();
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.props.demoNearbyFilms.length) {
                index = this.props.demoNearbyFilms.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const {coordinate} = this.props.demoNearbyFilms[index];
                    this.mapView.current && this.mapView.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.props.region.latitudeDelta,
                            longitudeDelta: this.props.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10)
        });
        await this.props.getNearbyFilms({latitude: 1, longitude: 1, latitudeDelta: 1, longitudeDelta: 1})
    }

    render(): React.ReactNode {
        const interpolations = this.props.demoNearbyFilms.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return {scale, opacity};
        });

        return (
            <View style={styles.container}>
                <MapView
                    ref={this.mapView}
                    initialRegion={this.props.region}
                    style={styles.container}
                    // provider={PROVIDER_GOOGLE}
                >
                    {this.props.demoNearbyFilms.length > 0 && this.props.demoNearbyFilms.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <Marker key={index} coordinate={marker.coordinate} onPress={() => {
                                this.onMarkerPress(marker)
                            }}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={styles.marker}/>
                                </Animated.View>
                            </Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        {useNativeDriver: true}
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.props.demoNearbyFilms.length > 0 && this.props.demoNearbyFilms.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                source={marker.image}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {marker.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }


    async getLocation() {
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let locationDemo = {
                "coords": {
                    "speed": -1,
                    "longitude": 100.27569485012334,
                    "latitude": 5.466366920634989,
                    "accuracy": 72.46962253332663,
                    "heading": -1,
                    "altitude": 39.9760627746582,
                    "altitudeAccuracy": 10
                }, "timestamp": 1609516775547.3418
            };
            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            })
        } catch (e) {
        }
    }

    onRegionChange() {
        console.log('--------onRegionChange');
    }

    onMarkerPress(marker: NearbyFilm) {
        const mapView = this.mapView.current;
        mapView && mapView.animateToRegion({
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        });
    }

    onMapviewMarkerPress(mapEvent: MapEvent<{ action: "marker-press"; id: string }>) {
        const mapView = this.mapView.current;
        const markerData = mapEvent.nativeEvent.coordinate;
        mapView && mapView.animateToRegion({
            latitude: markerData.latitude,
            longitude: markerData.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoMapScreen);
