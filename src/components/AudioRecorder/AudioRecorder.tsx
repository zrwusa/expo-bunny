import * as React from "react"
import {useEffect, useState} from "react"
import {useBunnyKit} from "../../hooks/bunny-kit";
import {IcoMoon} from "../UI";
import {TouchableHighlight, Vibration} from "react-native";
import {Audio} from "../../../packages/expo-av/src";
import {uploadFileToFirebase} from "../../helpers";
import {useFirebase} from "react-redux-firebase";
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
};

export interface AudioRecorderProps {
    onValueChanged?: (uri: string) => void,
    isUpload?: boolean,
    onStatusChanged?: (status: AudioRecordingStatus) => void,
    uploadPath?: string
}

export type AudioRecordingStatus = 'GETTING_PERMISSION' | 'STARTING' | 'STARTED' | 'RECORDING' | 'STOPPING' | 'STOPPED' | 'ERROR' | undefined ;
export const AudioRecorder = ({onValueChanged, isUpload = false, onStatusChanged, uploadPath = '/'}: AudioRecorderProps) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit()
    const [recording, setRecording] = useState<Audio.Recording>();
    const firebase = useFirebase();
    const [status, setStatus] = useState<AudioRecordingStatus>('STOPPED')

    useEffect(() => {
        onStatusChanged && onStatusChanged(status)
    }, [status])

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            setStatus('GETTING_PERMISSION')
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            setStatus('STARTING')
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setStatus('STARTED')
            console.log('Recording started');
        } catch (err) {
            setStatus('ERROR')
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setStatus('STOPPING')
        console.log('Stopping recording..');
        setRecording(undefined);
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            if (uri) {

                if (isUpload) {
                    const snapshot = await uploadFileToFirebase(uri, uploadPath)
                    onValueChanged && onValueChanged(snapshot)
                } else {
                    onValueChanged && onValueChanged(uri)
                }

            }
            setStatus('STARTED')
            console.log('Recording stopped and stored at', uri);
        }
        setStatus('STOPPED')
    }

    const _longPress = async () => {
        switch (status) {
            case 'STOPPED':
                Vibration.vibrate(100)
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
