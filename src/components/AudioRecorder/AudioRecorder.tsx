import * as React from 'react';
import {useEffect, useState} from 'react';
import {useBunnyKit} from '../../hooks';
import {IcoMoon} from '../UI';
import {Platform, TouchableHighlight, Vibration} from 'react-native';
import {Audio} from '../../../packages/expo-av/src';
import {uploadFileToFirebase} from '../../helpers';
import {RECORDING_OPTIONS_PRESET_HIGH_QUALITY} from '../../../packages/expo-av/src/Audio/Recording';
import {getStyles} from './styles';

export interface AudioRecorderProps {
    onValueChanged?: (uri: string) => void,
    isUpload?: boolean,
    onStatusChanged?: (status: AudioRecordingStatus) => void,
    uploadPath?: string,
    isDebug?: boolean
}

export type AudioRecordingStatus =
    'GETTING_PERMISSION'
    | 'STARTING'
    | 'STARTED'
    | 'RECORDING'
    | 'STOPPING'
    | 'STOPPED'
    | 'ERROR'
    | undefined;
export const AudioRecorder = ({
                                  onValueChanged,
                                  isUpload = false,
                                  onStatusChanged,
                                  uploadPath = '/',
                                  isDebug = false
                              }: AudioRecorderProps) => {
    const {sizeLabor, themeLabor, colors} = useBunnyKit();
    const [recording, setRecording] = useState<Audio.Recording>();
    const [status, setStatus] = useState<AudioRecordingStatus>('STOPPED');

    const styles = getStyles(sizeLabor, themeLabor);
    useEffect(() => {
        onStatusChanged && onStatusChanged(status);
    }, [status]);

    async function startRecording() {
        try {
            isDebug && console.log('Requesting permissions..');
            setStatus('GETTING_PERMISSION');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            setStatus('STARTING');
            isDebug && console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setStatus('STARTED');
            isDebug && console.log('Recording started');
        } catch (err) {
            setStatus('ERROR');
            isDebug && console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setStatus('STOPPING');
        isDebug && console.log('Stopping recording..');

        if (!recording) {
            setStatus('STOPPED');
            return;
        }
        await recording.stopAndUnloadAsync();
        const localURI = recording.getURI();

        isDebug && console.log('---recording,uri', recording, localURI);
        if (!localURI) {
            setStatus('STOPPED');
            return;
        }
        if (isUpload) {
            const remoteURL = await uploadFileToFirebase(localURI, uploadPath);
            isDebug && console.log('Recording stopped and stored (remotely) at', remoteURL);
            setStatus('STOPPED');
            onValueChanged && onValueChanged(remoteURL);
        } else {
            setStatus('STOPPED');
            isDebug && console.log('Recording stopped and stored (locally) at', localURI);
            onValueChanged && onValueChanged(localURI);
        }
        setRecording(undefined);
    }

    const _longPress = async () => {
        switch (status) {
            case 'STOPPED':
                Platform.OS !== 'web' && Vibration.vibrate([10, 10]);
                await startRecording();
                break;
            default:
                break;
        }
    };
    const [pressIn, setPressIn] = useState(false);
    const _pressIn = async () => {
        setPressIn(true);
    };
    const _pressOut = async () => {
        setPressIn(false);
        await stopRecording();
    };

    return <TouchableHighlight
        onPressIn={_pressIn}
        onLongPress={_longPress}
        onPressOut={_pressOut}
        underlayColor={colors.transparent}
    >
        <IcoMoon name="mic1" style={[styles.micIcon, pressIn && styles.active]}/>
    </TouchableHighlight>;
};
