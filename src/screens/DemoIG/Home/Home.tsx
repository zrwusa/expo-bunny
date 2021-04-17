import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {FlatList, Platform, RefreshControl, SafeAreaView} from "react-native";
import {IncrementId, uuidV4, wait} from "../../../utils";
import {IGMediaCardDatum} from "../../../types";
import {IGMediaCard} from "../../../components/IGMediaCard/IGMediaCard";

export function IGHomeScreen() {
    const [mannyCardData, setMannyCardData] = useState<IGMediaCardDatum[]>([])
    const [refreshing, setRefreshing] = useState(false);
    const [isReady, setIsReady] = useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        const cardData5Items: IGMediaCardDatum[] = [
            {
                id: uuidV4(),
                category: 'VIDEO',
                user: 'aladdin',
                userAvatar: {uri: 'https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg'},
                avSource: {uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
                likes: 6218,
                comments: [
                    {
                        id: uuidV4(),
                        text: 'Love from DUBAI Jimmy 😁. You are our early morning show, instead of late night 😱😂💜\n' +
                            'You and your team are doing great job 👏🏼💜'
                    }
                ]
            },
            {
                id: uuidV4(),
                category: 'VIDEO',
                user: 'Cars with Ivan',
                userAvatar: {uri: 'https://i.pinimg.com/236x/44/2f/b4/442fb435dfe1ba7ee31c1ee771e5fa01.jpg'},
                avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/mini-pc.mp4'},
                likes: 87356,
                comments: [
                    {
                        id: uuidV4(),
                        text: 'I think I can fit my aunt in this one!'
                    }
                ]
            },
            {
                id: uuidV4(),
                category: 'VIDEO',
                user: 'real cop',
                userAvatar: {uri: 'https://i.pinimg.com/236x/b7/1a/09/b71a09aec5c36e3ac5d4919ca3b34076.jpg'},
                avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/pickup-truck.mp4'},
                likes: 987642,
                comments: [
                    {
                        id: uuidV4(),
                        text: 'This is the BEST YouTube channel for watching Transformers transformations. No talking, no reviews, just step by step transformations. And a little video to show the G1 cartoon so you know who it is.Keep up it. Good work. My man. 💪👍'
                    }
                ]
            },
            {
                id: uuidV4(),
                category: 'VIDEO',
                user: 'tiger finca',
                userAvatar: {uri: 'https://i.pinimg.com/236x/e4/01/38/e40138e42ba1201b3f73412f526b6cb2.jpg'},
                avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4'},
                likes: 69,
                comments: [
                    {
                        id: uuidV4(),
                        text: 'Love from DUBAI Jimmy'
                    }
                ]
            },
            {
                id: uuidV4(),
                category: 'IMAGE',
                user: 'McEnany',
                userAvatar: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany-avatar.jpeg'},
                imageSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg'},
                likes: 69,
                comments: [
                    {
                        id: uuidV4(),
                        text: 'Love from DUBAI Jimmy'
                    }
                ]
            }
        ]
        let mannyCardData: IGMediaCardDatum[] = [];

        const cardIncrementId = new IncrementId('card-')
        const commentIncrementId = new IncrementId('comment-')

        for (let i = 0; i < 10; i++) {
            for (let card of cardData5Items) {
                let newCard: IGMediaCardDatum = {...card, comments: [], id: cardIncrementId.getId()}
                for (let comment of card.comments) {
                    let newComment = {...comment, id: commentIncrementId.getId()}
                    newCard.comments.push(newComment)
                }
                mannyCardData.push(newCard)
            }
        }
        setMannyCardData(mannyCardData)
        setIsReady(true)
    }, [])
    return (
        <SafeAreaView style={{flex: 1}}>
            {
                isReady
                    ? <FlatList data={mannyCardData}
                                renderItem={({item}) => <IGMediaCard card={item}/>}
                                keyExtractor={item => item.id}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                debug
                                initialNumToRender={3} // * times viewport,first render,keep in memory
                                windowSize={5} // * times viewport,keep in memory
                        // /**
                        //  * Enabling this prop on Android greatly improves scrolling performance with no known issues.
                        //  * The alternative is that scrolling on Android is unusably bad. Enabling it on iOS has a few
                        //  * known issues.
                        //  */
                                removeClippedSubviews={Platform.OS === 'android'}
                        // maxToRenderPerBatch={10}
                        // updateCellsBatchingPeriod={50}


                                onEndReached={() => {
                                    console.log('onEndReached')
                                }}
                    />
                    : null
            }

        </SafeAreaView>
    );
}
