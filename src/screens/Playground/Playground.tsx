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
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <LinearGradientIcon name="leaf" colors={['#fff', '#0f0']} size={40}/>
            </View>
            <TextButton onPress={handleMigrate}>
                <Text>migrate</Text>
            </TextButton>
        </ScrollView>
    )
}
