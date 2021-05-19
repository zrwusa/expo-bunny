import React, {useState} from "react";
import {Text, TextButton, View} from "../../components/UI";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {useThemeLabor} from "../../providers/theme-labor";
import {TouchableHighlight, TouchableOpacity, Vibration} from "react-native";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../types";
import {DraggableView} from "../../containers/DraggableView";
import {uuidV4} from "../../utils";
import {
    migrateChatMessages,
    migrateConversations,
    migrateNearbyFilms,
    migrateSocialMediaImages,
    migrateSocialMediaVideos,
    migrateUsers
} from "../../firebase/migrations";
import {ProgressBar} from "react-native-paper";

export function PlaygroundScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const [progress, setProgress] = useState(0);
    const handleMigrate = async () => {
        setProgress(0);
        await migrateUsers();
        setProgress(0.1);
        await migrateNearbyFilms();
        setProgress(0.2);
        await migrateSocialMediaVideos();
        setProgress(0.3);
        await migrateSocialMediaImages();
        setProgress(0.4);
        await migrateChatMessages();
        setProgress(0.6);
        await migrateConversations()
        setProgress(1);
    }

    useFirestoreConnect([
        {collection: 'demoFirestore'} // or 'demoFirestore'
    ])
    const demoFirestore = useSelector((state: RootState) => state.firestoreState.ordered.demoFirestore)

    let testData = [];
    for (let i = 0; i < 1000; i++) {
        testData.push({id: uuidV4()})
    }

    return (
        <View style={{flex: 1}}>
            <View>
                <View style={{width: 100, height: 100, backgroundColor: 'blue', flexDirection: 'row'}}/>
            </View>
            <View style={styles.container}>
                <LinearGradientIcon name="leaf" colors={['#fff', '#0f0']} size={40}/>
            </View>
            <TextButton onPress={handleMigrate}>
                <Text>migrate</Text>
            </TextButton>
            <ProgressBar progress={progress}/>

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
            {/*<FlatList data={testData}*/}
            {/*          keyExtractor={item => item.id}*/}
            {/*          renderItem={() =>*/}

            {/*              <Image style={{width: 300, height: 300}}*/}
            {/*                                   preview={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}}*/}
            {/*                                   uri={'https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg'}/>*/}
            {/*              // <ImageRN style={{width: 300, height: 300}} source={require('../../assets/images/pexels-5451714-medium.jpg')} />*/}
            {/*              // <CachedImage style={{width: 300, height: 300}} source={{ uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg' }}/>*/}
            {/*          }*/}
            {/*/>*/}
        </View>
    )
}



