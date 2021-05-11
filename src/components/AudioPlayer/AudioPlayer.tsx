import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {IcoMoon, Text} from "../UI";
import {AVPlaybackSource, AVPlaybackStatus} from "../../../pakages/expo-av/src/AV";
import {Audio} from "../../../pakages/expo-av/src";
import {ProgressBar} from "react-native-paper";
import {minuted} from "../../utils";

export interface AudioPlayerProps {
    source: AVPlaybackSource,
    onLoaded?: () => void
}

export function AudioPlayer(props: AudioPlayerProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const styles = getStyles(sizeLabor, themeLabor);
    const {source, onLoaded} = props
    const soundRef = useRef<Audio.Sound>()
    const [status, setStatus] = useState<AVPlaybackStatus>()

    useEffect(() => {
        (async () => {
            try {
                const {sound, status} = await Audio.Sound.createAsync(source);
                // todo on web platform status.durationMillis is NaN
                soundRef.current = sound;
                soundRef.current.setOnPlaybackStatusUpdate(setStatus)
                onLoaded && onLoaded()
            } catch (e) {
                console.log(e)
            }

        })();

        return () => {
            (async () => {
                const curSoundRef = soundRef.current
                if (curSoundRef) {
                    curSoundRef.setOnPlaybackStatusUpdate(null)
                    await curSoundRef.stopAsync();
                    await curSoundRef.unloadAsync();
                }
            })();
        }
    }, [])

    async function togglePlayOrPause() {
        if (!soundRef.current) {
            return
        }
        if (status && status.isLoaded) {
            const curSoundRef = soundRef.current;
            if (curSoundRef) {
                if (status.isPlaying) {
                    await curSoundRef.pauseAsync();
                } else {
                    if (status.positionMillis === status.durationMillis) {
                        await curSoundRef.replayAsync()
                    } else {
                        await curSoundRef.playAsync();
                    }
                }
            }
        }
    }

    return <View style={styles.container}>
        {
            soundRef.current
                ? status
                ? status.isLoaded
                    ? <TouchableOpacity onPress={async () => {
                        await togglePlayOrPause()
                    }}>
                        <View style={styles.control}>
                            <View style={styles.buttonWrap}>
                                {
                                    status.isPlaying
                                        ? <IcoMoon name="pause"/>
                                        : <IcoMoon name="play" style={styles.playIcon}/>
                                }
                            </View>
                            <View style={styles.progress}>
                                {
                                    status.durationMillis
                                        ? <>
                                            <ProgressBar progress={(status.positionMillis | 0) / status.durationMillis}/>
                                            <Text style={styles.remainTime}>
                                                {minuted(status.durationMillis - status.positionMillis)}</Text>
                                        </>
                                        : <ProgressBar progress={0}/>
                                }

                            </View>
                        </View>
                    </TouchableOpacity>
                    : <ActivityIndicator/>
                : <Text>No Status</Text>
                : <Text>No Sound</Text>
        }
    </View>
}
