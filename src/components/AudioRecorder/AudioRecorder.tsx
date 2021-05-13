import * as React from "react"
import {useEffect, useState} from "react"
import {useBunnyKit} from "../../hooks/bunny-kit";
import {IcoMoon} from "../UI";
import {Platform, TouchableHighlight, Vibration} from "react-native";
import {Audio} from "../../../packages/expo-av/src";
import {uploadFileToFirebase} from "../../helpers";
import {
    RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    RecordingOptions
} from "../../../packages/expo-av/src/Audio/Recording";

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
    isMeteringEnabled: true,
    android: {
        extension: '.m4a',
        outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
    web: {
        mimeType: 'audio/webm;codecs="opus"',
        audioBitsPerSecond: 64000,
        bitsPerSecond: 64000,
        extension: '.webm',
    },
    // web: Platform.OS === 'web'
    //     ? (() => {
    //         const mimes = [
    //             {
    //                 mimeType: 'audio/mp4;codecs="mp4a.40.5"', // MPEG-4 HE-AAC v1
    //                 audioBitsPerSecond: 64000,
    //                 bitsPerSecond: 64000,
    //                 extension: '.m4a',
    //             },
    //             {
    //                 mimeType: 'audio/mp4;codecs="mp4a.40.2"', // MPEG-4 AAC LC
    //                 audioBitsPerSecond: 64000,
    //                 bitsPerSecond: 64000,
    //                 extension: '.m4a',
    //             },
    //             {
    //                 mimeType: 'audio/webm;codecs="opus"',
    //                 audioBitsPerSecond: 64000,
    //                 bitsPerSecond: 64000,
    //                 extension: '.webm',
    //             },
    //             {
    //                 mimeType: 'audio/webm;codecs="vp8"',
    //                 audioBitsPerSecond: 64000,
    //                 bitsPerSecond: 64000,
    //                 extension: '.webm',
    //             },
    //             {
    //                 mimeType: 'audio/webm',
    //                 audioBitsPerSecond: 64000,
    //                 bitsPerSecond: 64000,
    //                 extension: '.webm',
    //             },
    //             {
    //                 mimeType: 'audio/mpeg', // Support depends on polyfill
    //                 audioBitsPerSecond: 128000,
    //                 bitsPerSecond: 128000,
    //                 extension: '.mp3',
    //             },
    //         ]
    //
    //         for (let index = 0; index < mimes.length; index++) {
    //             const mime = mimes[index]
    //             if ((window as any).MediaRecorder.isTypeSupported(mime.mimeType)) {
    //                 return mime
    //             }
    //         }
    //
    //         return undefined
    //     })() : undefined,
};

export interface AudioRecorderProps {
    onValueChanged?: (uri: string) => void,
    isUpload?: boolean,
    onStatusChanged?: (status: AudioRecordingStatus) => void,
    uploadPath?: string,
    isDebug?: boolean
}

export type AudioRecordingStatus = 'GETTING_PERMISSION' | 'STARTING' | 'STARTED' | 'RECORDING' | 'STOPPING' | 'STOPPED' | 'ERROR' | undefined ;
export const AudioRecorder = ({onValueChanged, isUpload = false, onStatusChanged, uploadPath = '/', isDebug = true}: AudioRecorderProps) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit()
    const [recording, setRecording] = useState<Audio.Recording>();
    const [status, setStatus] = useState<AudioRecordingStatus>('STOPPED')

    useEffect(() => {
        onStatusChanged && onStatusChanged(status)
    }, [status])

    async function startRecording() {
        try {
            isDebug && console.log('Requesting permissions..');
            setStatus('GETTING_PERMISSION')
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            setStatus('STARTING')
            isDebug && console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setStatus('STARTED')
            isDebug && console.log('Recording started');
        } catch (err) {
            setStatus('ERROR')
            isDebug && console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setStatus('STOPPING')
        isDebug && console.log('Stopping recording..');

        if (!recording) {
            setStatus('STOPPED')
            return
        }
        await recording.stopAndUnloadAsync();
        const localURI = recording.getURI();

        isDebug && console.log('---recording,uri', recording, localURI)
        if (!localURI) {
            setStatus('STOPPED')
            return
        }
        if (isUpload) {
            const remoteURL = await uploadFileToFirebase(localURI, uploadPath)
            isDebug && console.log('Recording stopped and stored (remotely) at', remoteURL);
            setStatus('STOPPED')
            onValueChanged && onValueChanged(remoteURL)
        } else {
            setStatus('STOPPED')
            isDebug && console.log('Recording stopped and stored (locally) at', localURI);
            onValueChanged && onValueChanged(localURI)
        }
        setRecording(undefined);
    }

    const _longPress = async () => {
        switch (status) {
            case 'STOPPED':
                Platform.OS !== 'web' && Vibration.vibrate([10, 10])
                await startRecording()
                break;
            default:
                break;
        }
    }

    const _pressOut = async () => {
        await stopRecording()
    }

    return <TouchableHighlight onLongPress={_longPress} onPressOut={_pressOut} underlayColor="red">
        <IcoMoon name="mic1" style={{paddingBottom: wp(15), paddingHorizontal: wp(10)}}/>
    </TouchableHighlight>
}
