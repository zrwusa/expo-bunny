import React, {useState} from "react";
import {Text, TextButton, View} from "../../components/UI";
import {Button, FlatList, TouchableOpacity, Vibration} from "react-native";
import {getStyles} from "./styles";
import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {RootState} from "../../types";
import {DraggableView} from "../../containers/DraggableView";
import {randomDate, uuidV4, wait} from "../../utils";
import {ProgressBar} from "react-native-paper";
import {Card} from "../../containers/Card";
import {CachedImage} from "../../components/CachedImage";
import {useBunnyKit} from "../../hooks/bunny-kit";

export function PlaygroundScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const [progress, setProgress] = useState(0);
    const handleMigrate = async () => {
        setProgress(0);
        await wait(1000);
        // await migrateUsers();
        // setProgress(0.1);
        // await migrateNearbyFilms();
        // setProgress(0.2);
        // await migrateSocialMediaVideos();
        // setProgress(0.3);
        // await migrateSocialMediaImages();
        setProgress(0.4);
        // await migrateChatMessages();
        setProgress(0.6);
        // await migrateConversations()
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
            <View style={styles.container}>
                <Card title="database migration" titleMode="OUT">
                    <TextButton onPress={handleMigrate}>
                        <Text>migrate</Text>
                    </TextButton>
                    <ProgressBar progress={progress}/>
                </Card>

                <Card title="draggable" titleMode="OUT">
                    <DraggableView/>
                </Card>

                <Card title="vibration" titleMode="OUT">
                    <TouchableOpacity onPress={() => {
                        Vibration.vibrate(10)
                    }}><Text>Vibration</Text>
                    </TouchableOpacity>
                </Card>

                <Card title="demo firestore" titleMode="OUT">
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
                </Card>
                <Button title="random date" onPress={() => {
                    console.log(randomDate(new Date('2020-01-01'), new Date(), new Date('2021-3-1'), 0.5))
                }}/>
                <FlatList data={testData}
                          keyExtractor={item => item.id}
                          renderItem={() =>

                              // <Image style={{width: 300, height: 300}}
                              //                      preview={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='}}
                              //                      uri={'https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg'}/>
                              // <ImageRN style={{width: 300, height: 300}} source={require('../../assets/images/pexels-5451714-medium.jpg')} />
                              <CachedImage style={{width: 300, height: 300}}
                                           source={{uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/pexels-5451714-medium.jpg'}}/>
                          }
                />
            </View>

        </View>
    )
}



