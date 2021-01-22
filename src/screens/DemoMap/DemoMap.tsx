import React, {Component, createRef} from "react";
import {Animated} from "react-native";
import {View, Text, Image} from "../../components/base-ui";
import * as Location from 'expo-location';
import {ThunkDispatch} from "redux-thunk";
import {DemoMap, NearbyFilm, Region, RootState} from "../../types/models";
import {Action} from "redux";
import {GetNearbyFilmsReqParams, SysErrorPayload} from "../../types/payloads";
import {getNearbyFilms, restoreRegion} from "../../stores/demo-map/actions";
import {connect} from "react-redux";
import MapView, {PROVIDER_GOOGLE,PROVIDER_DEFAULT} from "react-native-maps";
import BunnyConstants from "../../common/constants";
import {sysError} from "../../stores/sys/actions";
import styles, {CARD_WIDTH} from "./styles";
import containerStyle from "../../containers";

const {Marker} = MapView as any; // react-native-maps under typescript bug trick

type BareProps = { title?: string }
const mapStateToProps = (rootState: RootState) => ({...rootState.demoMapState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoMap, void, Action>) => ({
    getNearbyFilms: async (reqParams: GetNearbyFilmsReqParams) => dispatch(getNearbyFilms(reqParams)),
    restoreRegion: (region: Region) => dispatch(restoreRegion(region)),
    sysError: (err: SysErrorPayload) => dispatch(sysError(err))
});
type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & BareProps;

class DemoMapScreen extends Component<Props> {

    private mapView = createRef<MapView>()
    private index: number = 0;
    private regionTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);
    private animation: Animated.Value = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.getCurLocation = this.getCurLocation.bind(this);
        this.onMarkerPress = this.onMarkerPress.bind(this);
        // this.onMapviewMarkerPress = this.onMapviewMarkerPress.bind(this);
    }

    async getCurLocation() {
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            this.props.restoreRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                ...BunnyConstants.latLngDeltaGrace
            })
        } catch (e) {
            this.props.sysError(e);
        }
    }

    async componentDidMount() {
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
        // await this.getCurLocation();

        await this.props.getNearbyFilms({
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude,
            ...BunnyConstants.latLngDeltaGrace
        })
    }

    onMarkerPress(marker: NearbyFilm) {
        const mapView = this.mapView.current;
        mapView && mapView.animateToRegion({
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
            ...BunnyConstants.latLngDeltaGrace
        });
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
            <View style={containerStyle.screen}>
                <MapView
                    ref={this.mapView}
                    initialRegion={this.props.region}
                    style={styles.mapView}
                    provider={PROVIDER_DEFAULT}
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
                <Animated.ScrollView horizontal scrollEventThrottle={1}
                                     showsHorizontalScrollIndicator={false}
                                     snapToInterval={CARD_WIDTH}
                                     onScroll={Animated.event([{
                                             nativeEvent: {
                                                 contentOffset: {
                                                     x: this.animation,
                                                 },
                                             }
                                         }],
                                         {useNativeDriver: true}
                                     )}
                                     style={styles.scrollView}
                                     contentContainerStyle={styles.endPadding}>
                    {this.props.demoNearbyFilms.length > 0 && this.props.demoNearbyFilms.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <Image source={marker.image} style={styles.cardImage} resizeMode="cover"/>
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

    // onMapviewMarkerPress(mapEvent: MapEvent<{ action: "marker-press"; id: string }>) {
    //     const mapView = this.mapView.current;
    //     const markerData = mapEvent.nativeEvent.coordinate;
    //     mapView && mapView.animateToRegion({
    //         latitude: markerData.latitude,
    //         longitude: markerData.longitude,
    //         ...BunnyConstants.latLngDeltaGrace
    //     });
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoMapScreen);
