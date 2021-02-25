import React, {useEffect, useState} from "react";
import {View, Text, ButtonTO, TextBtn} from "../UI";
import {DemoEmployee} from "../../types/models";
import {useRequest} from "../../providers/requestHooks";

type Props = { title: string, buttonTitle: string }

function DemoRequest(props: Props) {
    const request = useRequest()

    const [employees, setEmployees] = useState<Array<DemoEmployee>>([])


    const granularity = 0.05;
    const expoPushToken = "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]";
    const saveAlertSetting = async function () {
        try {
            await request.post('/push-notification/alert-setting', {toke: expoPushToken})
        } catch (err) {
        }
    }

    const saveQuickAlertSettings = async function () {
        try {
            await request.post('/push-notification/alert-quick-setting', {token: expoPushToken, granularity})
        } catch (err) {
        }
    }

    const cancelAllAlertSettings = async function () {
        try {
            await request.put('/push-notification/cancel-all-alert-settings', {token: expoPushToken})
        } catch (err) {
        }
    }

    const getEmployees = async () => {
        try {
            await request.post('/push-notification/register-device', {
                type: "BITCOIN_ALERT",
                token: "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]"
            })

            await saveAlertSetting();
            await saveQuickAlertSettings();
            await cancelAllAlertSettings()
            const res = await request.get(`/employee`);
            // console.log('---DemoRequest res', res)
            // setEmployees(res.data)
        } catch (err) {

        }
    }

    useEffect(() => {

    }, [])


    const {buttonTitle} = props;
    console.log('---employees', employees)
    return (<View>
        <Text>{props.title}</Text>
        <ButtonTO onPress={async () => {
            await getEmployees()
        }}><TextBtn>{buttonTitle}</TextBtn></ButtonTO>
        <View>
            {employees && employees.length > 0 ? employees.map((employee) =>
                <Text key={employee._id}>
                    {employee.email}
                </Text>
            ) : null}
        </View>
    </View>);
}

export default DemoRequest;
