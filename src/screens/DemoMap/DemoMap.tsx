import React, {Component, createRef} from "react";
import {Animated} from "react-native";
import {Image, Text, TouchableOpacity, View} from "../../components/UI";
import * as Location from 'expo-location';
import {ThunkDispatch} from "redux-thunk";
import {DemoMapState, GetNearbyFilmsReqParams, NearbyFilm, Region, RootState} from "../../types";
import {Action} from "redux";
import {getNearbyFilms, restoreRegion, sysError} from "../../store/actions";
import {connect} from "react-redux";
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from "react-native-maps";
import BunnyConstants from "../../constants/constants";
import createStyles, {getCardSize} from "./styles";
import {createContainerStyles} from "../../containers";
import {WithSizeLabor, withSizeLabor} from "../../providers/size-labor";
import {WithThemeLabor, withThemeLabor} from "../../providers/theme-labor";

const {Marker} = MapView as any; // react-native-maps under typescript bug trick

type BareProps = { title?: string }
const mapStateToProps = (rootState: RootState) => ({...rootState.demoMapState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoMapState, void, Action>) => ({
    getNearbyFilms: async (reqParams: GetNearbyFilmsReqParams) => dispatch(getNearbyFilms(reqParams)),
    restoreRegion: (region: Region) => dispatch(restoreRegion(region)),
    sysError: (err: Error) => dispatch(sysError(err))
});

export interface DemoMapProps extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>,
    BareProps, WithSizeLabor, WithThemeLabor {
}

class DemoMapScreen extends Component<DemoMapProps> {

    private mapView = createRef<MapView>()
    private index: number = 0;
    private regionTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);
    private animation: Animated.Value = new Animated.Value(0);

    constructor(props: DemoMapProps) {
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
        const {sizeLabor,themeLabor} = this.props;
        const {responsive} = sizeLabor;
        const {wp} = responsive.iphoneX;
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / getCardSize(sizeLabor,themeLabor).width + wp(0.3)); // animate 30% away from landing on the next item
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
                        wp(350)
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
        const {sizeLabor, themeLabor} = this.props;
        const {theme} = themeLabor;
        const {responsive} = sizeLabor;
        const containerStyles = createContainerStyles(sizeLabor, themeLabor);
        const styles = createStyles(sizeLabor,themeLabor);
        const {wp} = responsive.iphoneX;
        const {width} = getCardSize(sizeLabor,themeLabor);
        const interpolations = this.props.demoNearbyFilms.map((marker, index) => {
            const inputRange = [
                (index - 1) * width,
                index * width,
                ((index + 1) * width),
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
            <View style={containerStyles.Screen}>
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
                                     snapToInterval={width}
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
                        <TouchableOpacity  onPress={()=>{
                            this.onMarkerPress(marker)
                        }} key={marker.id}>
                            <View style={styles.card}>
                                <Image source={marker.image} style={styles.cardImage} resizeMode="cover"/>
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSizeLabor(withThemeLabor(DemoMapScreen)));
