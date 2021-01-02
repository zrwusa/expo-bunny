import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import {Region} from "../../types/models"
const { Marker } = MapView as any;
type BareProps = { title?: string }
type States = {
    region: Region
};


class TestMapScreen extends Component<BareProps,States> {
    constructor(props: BareProps,states:States) {
        super(props);
        this.state = {
            region:{
                longitude: 100.27569485012334,
                latitude: 5.466366920634989,
                latitudeDelta: 0.09,
                longitudeDelta: 0.05,
            }
        }
    }

    render(): React.ReactNode {

        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.container}
                    // provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={{longitude: 100.27569485012334,
                        latitude: 5.466366920634989}}/>
                </MapView>
            </View>
        );
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
});

export default TestMapScreen;
