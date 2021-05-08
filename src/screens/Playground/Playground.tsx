import React from "react";
import {Text, TextButton, View} from "../../components/UI";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {useThemeLabor} from "../../providers/theme-labor";
import {ScrollView} from "react-native";
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
        </ScrollView>
    )
}



