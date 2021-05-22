// TODO crash when large gif images loaded
import {useBunnyKit} from "../../hooks/bunny-kit";
import {ScrollView, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useKeyboardHeight} from "../../hooks/keyboard-height";
import {useFirebase} from "react-redux-firebase";
import {Sticker} from "../../types";
import {getStyles} from "./styles";
import {CachedImage} from "../CachedImage";

export type Quality = 'LOW' | 'MEDIUM' | 'HIGH'

export interface StickerPickerProps {
    isShow: boolean,
    onValueChanged: (uri: string) => void,
    quality?: Quality
}

export const StickerPicker = ({isShow = false, onValueChanged, quality = 'MEDIUM'}: StickerPickerProps) => {
    const {sizeLabor, themeLabor} = useBunnyKit()
    const {currentHeight} = useKeyboardHeight()
    const [stickers, setStickers] = useState<Sticker[]>([])
    const firebase = useFirebase();
    const styles = getStyles(sizeLabor, themeLabor)
    const isMounted = useRef(false)

    const qualityMap: { [key in Quality]: string } = {
        LOW: 'ShaunTheSheep128/',
        MEDIUM: 'ShaunTheSheep256/',
        HIGH: 'ShaunTheSheep/'
    }

    const shaunTheSheepRef = firebase.storage().ref(qualityMap[quality])

    useEffect(() => {
        isMounted.current = true;
        (async () => {
            // let stickers = []
            // for (let i = 0; i < 20; i++) {
            //     stickers.push({id: uuidV4(), url: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany-avatar.jpeg'})
            // }
            // setStickers(stickers)

            const allStickerRef = await shaunTheSheepRef.listAll()

            const stickers = await Promise.all(allStickerRef.items.map(async (stickerRef) => {
                const url = await stickerRef.getDownloadURL()
                return {id: stickerRef.fullPath, url}
            }))

            isMounted.current && setStickers(stickers)
        })();

        return () => {
            isMounted.current = false;
        }
    }, [])

    return isShow
        ? <View style={{height: currentHeight || 346}}>
            <ScrollView contentContainerStyle={styles.panel}>
                {
                    stickers.map((sticker => {
                        return <View key={sticker.id}>
                            <TouchableOpacity onPress={async () => {
                                onValueChanged && onValueChanged(sticker.url)
                            }}>
                                {/*<Image style={styles.stickerImage} source={{uri: sticker.url}}/>*/}
                                <CachedImage style={styles.stickerImage} source={{uri: sticker.url}}/>
                            </TouchableOpacity>
                        </View>
                    }))
                }
            </ScrollView>
        </View>
        : null
}
