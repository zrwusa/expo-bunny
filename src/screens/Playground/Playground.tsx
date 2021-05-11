import React from "react";
import {Text, TextButton, View} from "../../components/UI";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {useThemeLabor} from "../../providers/theme-labor";
import {ScrollView, TouchableHighlight, TouchableOpacity, Vibration} from "react-native";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {
    migrateChatMessages,
    migrateChatRooms,
    migrateNearbyFilms,
    migrateSocialMediaImages,
    migrateSocialMediaVideos
} from "../../firebase/migrations";
import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../types";
import {DraggableView} from "../../containers/DraggableView";


export function PlaygroundScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    const handleMigrate = async () => {
        await migrateNearbyFilms();
        await migrateSocialMediaVideos();
        await migrateSocialMediaImages();
        await migrateChatRooms();
        await migrateChatMessages();
    }

    useFirestoreConnect([
        {collection: 'demoFirestore'} // or 'demoFirestore'
    ])
    const demoFirestore = useSelector((state: RootState) => state.firestoreState.ordered.demoFirestore)

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <LinearGradientIcon name="leaf" colors={['#fff', '#0f0']} size={40}/>
            </View>
            <TextButton onPress={handleMigrate}>
                <Text>migrate</Text>
            </TextButton>

            <View>
                {
                    demoFirestore && demoFirestore.map(item => {
                        return <View key={item.id.toString()}>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.keywords}</Text>
                        </View>
                    })
                }
            </View>
            <DraggableView/>
            <TouchableOpacity onPress={() => {
                Vibration.vibrate(10)
            }}>
                <Text>Vibration</Text>
            </TouchableOpacity>
            <TouchableHighlight
                // onPress={() => {
                //     alert('onPress')
                // }}
                // onPressOut={() => {
                //     alert('onPressOut')
                // }}
                onLongPress={() => {
                    alert('onLongPress')
                }}
                // onPressIn={()=>{
                //     alert('onPressIn')
                // }}
                underlayColor="red">
                <View>
                    <Text>Touchable with Long Press</Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
    )
}



