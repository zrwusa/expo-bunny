import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {FlatList, Platform, RefreshControl, SafeAreaView} from "react-native";
import {IncrementId} from "../../../utils";
import {RootState, SocialMediaMainDatum} from "../../../types";
import {SocialMediaVideoCard} from "../../../components/SocialMediaVideoCard";
import {isLoaded, useFirebase} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {Preparing} from "../../../components/Preparing";

export function SocialMediaVideoScreen() {
    // useFirebaseConnect([{path: 'socialMediaVideos'}])
    const firebase = useFirebase()
    const socialMediaVideos = useSelector((rootState: RootState) => rootState.firebaseState.ordered.socialMediaVideos)
    const [mannyCardData, setMannyCardData] = useState<SocialMediaMainDatum[]>([])
    const [refreshing, setRefreshing] = useState(false);

    const getSocialMediaVideos = async () => {
        await firebase.watchEvent('value', 'socialMediaVideos', 'socialMediaVideos')
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getSocialMediaVideos()
        return setRefreshing(false)
    }, []);

    const memoizedSocialMediaVideos = useMemo(() => {
        if (socialMediaVideos && socialMediaVideos.length > 0) {
            return socialMediaVideos.map((item) => {
                return item.value
            })
        }
        return []
    }, [socialMediaVideos])

    useEffect(() => {
        getSocialMediaVideos().then()
    }, [])

    useEffect(() => {
        const cardData5Items: SocialMediaMainDatum[] = memoizedSocialMediaVideos
        let mannyCardData: SocialMediaMainDatum[] = [];

        const cardIncrementId = new IncrementId('card-')
        const commentIncrementId = new IncrementId('comment-')

        for (let i = 0; i < 10; i++) {
            for (let card of cardData5Items) {
                let newCard: SocialMediaMainDatum = {...card, comments: [], id: cardIncrementId.getId()}
                for (let comment of card.comments) {
                    let newComment = {...comment, id: commentIncrementId.getId()}
                    newCard.comments.push(newComment)
                }
                mannyCardData.push(newCard)
            }
        }
        setMannyCardData(mannyCardData)
    }, [memoizedSocialMediaVideos])

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                isLoaded(socialMediaVideos)
                    ? <FlatList data={mannyCardData}
                                renderItem={({item}) => <SocialMediaVideoCard card={item}/>}
                                keyExtractor={item => item.id}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
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
                    : <Preparing text="Loading Social Media Data"/>
            }
        </SafeAreaView>
    );
}
