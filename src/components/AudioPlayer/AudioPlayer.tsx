import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {getStyles} from "./styles";
import {IcoMoon, Text} from "../UI";
import {AVPlaybackSource, AVPlaybackStatus} from "../../../packages/expo-av/src/AV";
import {Audio} from "../../../packages/expo-av/src";
import {ProgressBar} from "react-native-paper";
import {minuted} from "../../utils";
import {useBunnyKit} from "../../hooks/bunny-kit";

export interface AudioPlayerProps {
    source: AVPlaybackSource,
    style?: StyleProp<ViewStyle>,
    playButtonStyle?: StyleProp<ViewStyle>,
    playButtonIconStyle?: StyleProp<TextStyle>,
    progressStyle?: StyleProp<ViewStyle>,
    remainTimeStyle?: StyleProp<TextStyle>,
    progressColor?: string,
    onLoad?: () => void,
    onLoadStart?: () => void,
    onLoadEnd?: () => void,
    onError?: (e: Error) => void,
    isDebug?: boolean
}

export function AudioPlayer(props: AudioPlayerProps) {
    const {sizeLabor, themeLabor, colors} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const {source, style, onLoad, onLoadStart, onLoadEnd, onError, isDebug = false, progressStyle, progressColor, playButtonStyle, remainTimeStyle, playButtonIconStyle} = props
    const soundRef = useRef<Audio.Sound>()
    const [status, setStatus] = useState<AVPlaybackStatus>({isLoaded: false})
    const [error, setError] = useState('')
    useEffect(() => {
        (async () => {
            try {
                if (!source) {
                    return
                }
                onLoadStart?.()
                const {sound} = await Audio.Sound.createAsync(source);
                if (status?.isLoaded) {
                    onLoad?.()
                }
                // todo on web platform status.durationMillis is NaN
                soundRef.current = sound;
                soundRef.current.setOnPlaybackStatusUpdate(setStatus)
                onLoadEnd?.()
            } catch (e) {
                isDebug && console.log(e.toString())
                setError(e.toString())
                onError?.(e);
                onLoadEnd?.();
            }

        })();

        return () => {
            (async () => {
                const curSoundRef = soundRef.current
                if (curSoundRef) {
                    curSoundRef.setOnPlaybackStatusUpdate(null)
                    // await curSoundRef.stopAsync();
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

    return <View style={[styles.container, style]}>
        {isDebug
            ? <>
                <Text>error:{error}</Text>
                <Text>status:{JSON.stringify(status)}</Text>
            </>
            : null
        }
        {
            soundRef.current
                ? status
                ? status.isLoaded
                    ? <TouchableOpacity onPress={async () => {
                        await togglePlayOrPause()
                    }}>
                        <View style={styles.control}>
                            <View style={[styles.playButton, playButtonStyle]}>
                                {
                                    status.isPlaying
                                        ? <IcoMoon style={[styles.playButtonIcon, playButtonIconStyle]} name="pause"/>
                                        : <IcoMoon style={[styles.playButtonIcon, playButtonIconStyle]} name="play"/>
                                }
                            </View>
                            <View style={styles.progress}>
                                {
                                    status.durationMillis
                                        ? <>
                                            <ProgressBar style={progressStyle} color={progressColor}
                                                         progress={(status.positionMillis | 0) / status.durationMillis}/>
                                            <Text style={[styles.remainTime, remainTimeStyle]}>
                                                {minuted(status.durationMillis - status.positionMillis)}</Text>
                                        </>
                                        : <>
                                            <ProgressBar progress={0} color={progressColor} style={progressStyle}/>
                                            <Text style={[styles.remainTime, remainTimeStyle]}> </Text>
                                        </>
                                }

                            </View>
                        </View>
                    </TouchableOpacity>
                    : <ActivityIndicator/>
                : <Text>No Status</Text>
                : <Text>No Sound,may not support this audio type</Text>
        }
    </View>
}
