import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Region} from "../../types/models"
import {latLngDeltaGrace} from "../../common/consts";

const {Marker} = MapView as any;

type Props = { title?: string }

type States = {
    region: Region
};

class TestMapScreen extends Component<Props, States> {
    constructor(props: Props, states: States) {
        super(props);
        this.state = {
            region: {
                latitude: 21.392308872706643,
                longitude: -157.71574550813705,
                ...latLngDeltaGrace
            }
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.container}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={{
                        latitude: 21.392308872706643,
                        longitude: -157.71574550813705,
                    }}/>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
});

export default TestMapScreen;
