import React, {useState} from "react";
import {ButtonTO, Text, TextBtn, View} from "../UI";
import {DemoEmployee} from "../../types";
import {useRequest} from "../../providers/request-labor";
import {useDispatch} from "react-redux";
import nomicsAPI from "../../helpers/nomics-api";

interface Props {
    title: string,
    buttonTitle: string
}

function DemoRequest(props: Props) {
    const request = useRequest()
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState<Array<DemoEmployee>>([])
    const granularity = 0.0001;
    const expoPushToken = "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]";
    const saveAlertSetting = async function () {
        try {
            await request.post('/push-service/alert-settings', {toke: expoPushToken})
        } catch (err) {
        }
    }

    // const saveQuickAlertSettings = async function () {
    //     // try {
    //     console.log('---demo-request saveQuickAlertSettings,expoPushToken', expoPushToken)
    //     await request.post('/push-service/alert-quick-settings', {token: expoPushToken, granularity})
    //     // } catch (err) {
    //     //     console.error(err)
    //     // }
    // }

    // const cancelAlertSettings = async function () {
    //     try {
    //         await request.delete(`/push-service/alert-settings?cancel_all=true&token=${expoPushToken}`)
    //     } catch (err) {
    //     }
    // }
    const getEmployees = async () => {
        try {
            // await request.post('/push-service/devices', {
            //     type: "BITCOIN_ALERT",
            //     token: "ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]"
            // })
            // await saveAlertSetting();
            // await saveQuickAlertSettings();
            // await cancelAlertSettings()
            // dispatch(collectBLResult({info: blError('test')}))
            // const {data} = await request.get('/cryptoCurrency-prices')
            // dispatch(saveQuickAlertSettings({token: expoPushToken, granularity: 0.01, reminder: {times: 3, interval: '1s'}}))
            // dispatch(cancelAlertSettings({token: expoPushToken, cancelAll: true}))
            //
            // dispatch(getCurrentPrice())
            // const res = await request.get(`/employees`);
            // setEmployees(res.data)

            const xxx = await nomicsAPI.get('v1/currencies/sparkline', {
                params: {
                    key: '9d5780d97bce8d6019393ccbc5f0cd45',
                    ids: 'BTC,ETH,XRP',
                    start: '2021-03-01T00:00:00Z',
                    end: '2021-03-03T00:00:00Z'
                }
            }).then((res) => {
                const {timestamps, prices} = res.data[0]
                const xxx1 = timestamps.map((item:string, index:number) => {
                    return {x: new Date(item), y: prices[index]}
                })
                console.log('xxx1',xxx1)
            })
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
