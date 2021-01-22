import React, {Component} from "react";
import {View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

const {Marker} = MapView as any;
import {Region} from "../../types/models"
import BunnyConstants from "../../common/constants";
import styles from "./styles";
import containerStyle from "../../containers";

type Props = { title?: string }
type States = { region: Region }

class TestMapScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            region: {
                latitude: 21.392308872706643,
                longitude: -157.71574550813705,
                ...BunnyConstants.latLngDeltaGrace
            }
        }
    }

    render(): React.ReactNode {
        return (
            <View style={containerStyle.screen}>
                <MapView initialRegion={this.state.region}
                         style={containerStyle.screen} provider={PROVIDER_GOOGLE}>
                    <Marker coordinate={{
                        latitude: 21.392308872706643,
                        longitude: -157.71574550813705,
                    }}/>
                </MapView>
            </View>
        );
    }
}

export default TestMapScreen;
