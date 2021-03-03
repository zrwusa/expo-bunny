import React, {useState} from "react";
import {ButtonTO, Text, TextBtn, View} from "../UI";
import {DemoEmployee} from "../../types";
import {useRequest} from "../../providers/request-labor";

interface Props {
    title: string,
    buttonTitle: string
}

function DemoRequest(props: Props) {
    const request = useRequest()
    const [employees, setEmployees] = useState<Array<DemoEmployee>>([])
    const granularity = 0.05;
    const expoPushToken = "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]";
    const saveAlertSetting = async function () {
        try {
            await request.post('/push-service/alert-settings', {toke: expoPushToken})
        } catch (err) {
        }
    }

    const saveQuickAlertSettings = async function () {
        try {
            await request.post('/push-service/alert-quick-settings', {token: expoPushToken, granularity})
        } catch (err) {
        }
    }

    const cancelAllAlertSettings = async function () {
        try {
            await request.delete(`/push-service/alert-settings?cancel_all=true&token=${expoPushToken}`)
        } catch (err) {
        }
    }

    const getEmployees = async () => {
        try {
            // await request.post('/push-service/devices', {
            //     type: "BITCOIN_ALERT",
            //     token: "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]"
            // })
            // await saveAlertSetting();
            // await saveQuickAlertSettings();
            // await cancelAllAlertSettings()
            const res = await request.get(`/employees`);
            setEmployees(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const {buttonTitle} = props;
    return (<View>
        <Text>{props.title}</Text>
        <ButtonTO onPress={async () => {
            await getEmployees()
        }}><TextBtn>{buttonTitle}</TextBtn></ButtonTO>
        <View>
            {employees && employees.length > 0
                ? employees.map((employee) =>
                    <Text key={employee._id}>
                        {employee.email}
                    </Text>
                ) :
                null}
        </View>
    </View>);
}

export default DemoRequest;
