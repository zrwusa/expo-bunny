import * as React from 'react';
import {SwitchP} from '../UI';
import BunnyConstants from '../../constants/constants';
import {I18nManager} from 'react-native';
import {restartApp} from '../../restart';

export function RTLSwitch() {
    return <SwitchP
        value={I18nManager.isRTL}
        onValueChange={async () => {
            I18nManager.forceRTL(!I18nManager.isRTL);
            let timerMockAnimationComplete = BunnyConstants.fooTimeout;
            timerMockAnimationComplete = setTimeout(() => {
                try {
                    const res = restartApp();
                } catch (err: any) {
                    //in case of using try catch expression,this err will be caught by fastRefresh tool
                }
                clearTimeout(timerMockAnimationComplete);
            }, 300);
        }}
        // onValueChange={() => {
        //     I18nManager.forceRTL(!I18nManager.isRTL);
        //     restartApp()
        //         .then((res) => {
        //         })
        //         .catch((err) => {
        //             // todo,in case of using .catch expression,this err will not be caught by fastRefresh tool
        //         });
        // }}
    />;
}
