import * as React from "react";
import {FlatList, RefreshControl, SafeAreaView} from "react-native";
import {IncrementId, uuidV4, wait} from "../../../utils";
import {IGMediaCardDatum} from "../../../types";
import {IGMediaCard} from "../../../components/IGMediaCard/IGMediaCard";
import {useEffect, useState} from "react";

export function IGHomeScreen() {
    const [mannyCardData, setMannyCardData] = useState<IGMediaCardDatum[]>([])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        const cardData: IGMediaCardDatum[] = [
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

        for (let i = 0; i < 100; i++) {
            for (let card of cardData) {
                let newCard: IGMediaCardDatum = {...card, comments: [], id: cardIncrementId.getId()}
                for (let comment of card.comments) {
                    let newComment = {...comment, id: commentIncrementId.getId()}
                    newCard.comments.push(newComment)
                }
                mannyCardData.push(newCard)
            }
        }
        setMannyCardData(mannyCardData)
    }, [])
    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList data={mannyCardData}
                      initialNumToRender={1}
                      renderItem={({item}) => <IGMediaCard card={item}/>}
                      keyExtractor={item => item.id}
                      refreshControl={
                          <RefreshControl
                              refreshing={refreshing}
                              onRefresh={onRefresh}
                          />
                      }
            />
        </SafeAreaView>
    );
}

// import * as React from "react";
// import {View, IcoMoon} from "../../../components/UI";
// import {useTranslation} from "react-i18next";
// import {shortenTFunctionKey} from "../../../providers/i18n-labor";
// import {createContainerStyles} from "../../../containers";
// import {useSizeLabor} from "../../../providers/size-labor";
// import {useThemeLabor} from "../../../providers/theme-labor";
// import {createStyles} from "./styles";
// import {ShowVideo} from "../../../components/Video/Video";
// import {Text, Image, ImageSourcePropType, ScrollView} from "react-native";
// import {uuidV4} from "../../../utils";
// import {AVPlaybackSource} from "expo-av/src/AV";
// import {ReadMore} from "../../../components/ReadMore/ReadMore";
//
// function IGMediaCard() {
//     const {theme} = useThemeLabor();
//     const {ms, designsBasedOn} = useSizeLabor()
//     const {wp} = designsBasedOn.iphoneX
//     const {colors, fonts} = theme;
//     const bottomBarIconColor = colors.text
//     type IGMediaCardCommentDatum = {
//         id: string,
//         text: string
//     }
//     type IGMediaCardDatum = {
//         id: string,
//         user: string,
//         userAvatar:ImageSourcePropType,
//         avSource?: AVPlaybackSource,
//         imageSource?: ImageSourcePropType,
//         likes: number,
//         comments: IGMediaCardCommentDatum[]
//     }
//     const cardData: IGMediaCardDatum[] = [
//         {
//             id: uuidV4(),
//             user: 'aladdin',
//             userAvatar:{uri:'https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg'},
//             avSource: {uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
//             likes: 6218,
//             comments: [
//                 {
//                     id: uuidV4(),
//                     text: 'Love from DUBAI Jimmy 😁. You are our early morning show, instead of late night 😱😂💜\n' +
//                         'You and your team are doing great job 👏🏼💜'
//                 }
//             ]
//         },
//         {
//             id: uuidV4(),
//             user: 'tiger finca',
//             userAvatar:{uri:'https://i.pinimg.com/236x/e4/01/38/e40138e42ba1201b3f73412f526b6cb2.jpg'},
//             avSource: {uri: 'https://r1---sn-30a7rn7z.googlevideo.com/videoplayback?expire=1617513762&ei=wvhoYPuWJYnU8gS1qKDwCg&ip=34.200.235.127&id=o-AH-kNbJPH6D-OCk_xruJFnznUIgg07Z7-3-tJRgdKMxX&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=8MxI-r33HzIb7bbjcQ9tLX0F&cnr=14&ratebypass=yes&dur=423.067&lmt=1614889898806295&fvip=2&fexp=24001373,24007246&c=WEB&txp=5535432&n=blO-Xxzu4EpM3djrN&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgI7B5MmPPAaXnXpwKTAqAKGtO0yanTYXw3CP1UfnuaCsCIQDUsDYOGBrholAgqUZ4zumPOMhj4ryl02OM5DglPBDf7g%3D%3D&title=%24500%2C000+Monster+Pickup+Truck+With+6+doors&redirect_counter=1&cm2rm=sn-uphxqvujvh-2xol7l&req_id=161de2b65b77a3ee&cms_redirect=yes&ipbypass=yes&mh=6j&mip=202.190.80.251&mm=29&mn=sn-30a7rn7z&ms=rdu&mt=1617503335&mv=m&mvi=1&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgU-H6-BHyHYjzL1gJNO47j0UTE31qMZLrDhOzLhL2NzQCIQDqz3t4lssn5WAs3lzu4USWQ-BQtqQjcBmIGhWrrNWp8A%3D%3D'},
//             likes: 69,
//             comments: [
//                 {
//                     id: uuidV4(),
//                     text: 'Love from DUBAI Jimmy'
//                 }
//             ]
//         },
//         {
//             id: uuidV4(),
//             user: 'Cars with Ivan',
//             userAvatar:{uri:'https://i.pinimg.com/236x/44/2f/b4/442fb435dfe1ba7ee31c1ee771e5fa01.jpg'},
//             avSource: {uri: 'https://r3---sn-30a7rn7z.googlevideo.com/videoplayback?expire=1617524371&ei=MyJpYLG3FZi07QTN6buQBw&ip=2a06%3Ac006%3A10ae%3A18b3%3A3e51%3Ab4bd%3A48ac%3A3f9b&id=o-AB9o0BJDnMxKoELY01FnMX4nLbSguyzTMG85FimQ_z-T&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=OxsKzk6paVRMSGn60FGOgUEF&cnr=14&ratebypass=yes&dur=1204.860&lmt=1616885759480231&fvip=13&fexp=24001373,24007246&c=WEB&txp=5432432&n=9_gKTlLoo73CUZlR-&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAPYyqG6BnuoCpEH76Ff26HumOnzPqUHa1jOFod--fMsIAiAB5m4hi4lZU9TjiNUHrmspLcnq3zddHvRg881lxyNVng%3D%3D&title=AWESOME+AliExpress+AMD+Ryzen+7+4800H+Mini+PC+Powerhouse%21&rm=sn-4pvgq-n8vs76,sn-n8vdyes&req_id=8e931c14ba93a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=gh&mip=202.190.80.251&mm=29&mn=sn-30a7rn7z&ms=rdu&mt=1617502375&mv=m&mvi=3&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAMgPWhwypS_htnJp--Dw8M4rsTTF-TFHzv6-i0tlIekTAiEA859DiqZn4bQ9PZApuaKPe_mqDUyN8QlfysmSbqXrqMo%3D'},
//             likes: 87356,
//             comments: [
//                 {
//                     id: uuidV4(),
//                     text: 'I think I can fit my aunt in this one!'
//                 }
//             ]
//         },
//         {
//             id: uuidV4(),
//             user: 'real cop',
//             userAvatar:{uri:'https://i.pinimg.com/236x/b7/1a/09/b71a09aec5c36e3ac5d4919ca3b34076.jpg'},
//             avSource: require('../../../assets/videos/pickup-truck.mp4'),
//             likes: 987642,
//             comments: [
//                 {
//                     id: uuidV4(),
//                     text: 'This is the BEST YouTube channel for watching Transformers transformations. No talking, no reviews, just step by step transformations. And a little video to show the G1 cartoon so you know who it is.Keep up it. Good work. My man. 💪👍'
//                 }
//             ]
//         }
//     ]
//     let mannyCardData:IGMediaCardDatum[] = [];
//     for(let i=0;i<1;i++){
//         mannyCardData = mannyCardData.concat(cardData.map(card=>{
//             card.id = uuidV4();
//             card.comments = card.comments.map(comment=>{
//                 comment.id = uuidV4();
//                 return comment;
//             })
//             return card;
//         }))
//     }
//     return (
//         <View>
//             {mannyCardData.map(card => {
//                 const {id, user,userAvatar, avSource, likes, comments} = card;
//                 return <View key={uuidV4()}>
//                     <View style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         paddingVertical: wp(6),
//                         paddingLeft: wp(6),
//                         paddingRight: wp(16)
//                     }}>
//                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                             <View style={{
//                                 marginRight: wp(5),
//                                 width: wp(28),
//                                 height: wp(28),
//                                 borderRadius: wp(14),
//                                 borderColor: colors.accent,
//                                 borderWidth: wp(1)
//                             }}>
//                                 <Image style={{
//                                     position: 'relative',
//                                     width: wp(26),
//                                     height: wp(26),
//                                     borderRadius: wp(13),
//                                     borderColor: colors.btnText,
//                                     borderWidth: wp(1)
//                                 }}
//                                        width={wp(26)}
//                                        height={wp(26)} source={userAvatar}/>
//                             </View>
//                             <Text style={{fontSize: ms.fs.s, lineHeight: ms.fs.s, color: colors.text}}>{user}</Text>
//                         </View>
//                         <View>
//                             <Text style={{fontSize: ms.fs.l, color: colors.text}}>...</Text>
//                         </View>
//                     </View>
//                     <ShowVideo
//                         source={avSource}
//                     />
//                     <View style={{flexDirection: 'row', paddingHorizontal: wp(16), paddingVertical: wp(10), justifyContent: 'space-between'}}>
//                         <View style={{flexDirection: 'row', width: wp(80), justifyContent: 'space-between'}}>
//                             <IcoMoon name="heart" size={wp(20)} color={bottomBarIconColor}/>
//                             <IcoMoon name="bubble" size={wp(20)} color={bottomBarIconColor}/>
//                             <IcoMoon name="paperplane1" size={wp(18)} color={bottomBarIconColor}/>
//                         </View>
//
//                         <View>
//                             <IcoMoon name="bookmark-o" size={wp(20)} color={bottomBarIconColor}/>
//                         </View>
//                     </View>
//                     <View style={{paddingHorizontal: wp(16)}}>
//                         <Text style={{fontSize: ms.fs.xs, fontWeight: 'bold', color: colors.text}}>{likes} likes</Text>
//                         {comments.map(comment => {
//                             const {id, text} = comment;
//                             return <ReadMore key={uuidV4()}
//                                              numberOfLines={1}
//                             >
//                                 <Text
//                                     style={{fontFamily: fonts.thin.fontFamily, fontWeight: fonts.light.fontWeight, color: colors.text}}>{text}</Text></ReadMore>
//                         })}
//                     </View>
//                 </View>
//             })}
//
//         </View>
//     )
// }
//
// export function IGHomeScreen() {
//     const {t} = useTranslation();
//     const st = shortenTFunctionKey(t, 'screens.IGHome');
//     const sizeLabor = useSizeLabor();
//     const themeLabor = useThemeLabor();
//     const containerStyles = createContainerStyles(sizeLabor, themeLabor);
//     const styles = createStyles(sizeLabor, themeLabor)
//     return (
//         <ScrollView>
//             <View style={[containerStyles.Screen]}>
//                 <IGMediaCard/>
//
//             </View>
//         </ScrollView>
//
//     );
// }
