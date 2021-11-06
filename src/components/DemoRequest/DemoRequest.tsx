import React, {useState} from 'react';
import {ButtonTO, InButtonText, Text, View} from '../UI';
import {DemoEmployee} from '../../types';
import {useRequest} from '../../providers/request-labor';
import {useDispatch} from 'react-redux';
import {collectSysError, saveQuickAlertSettings} from '../../store/actions';
import {bunnyAPI} from '../../helpers/bunny-api';

interface Props {
    title: string,
    buttonTitle: string
}

function DemoRequest(props: Props) {
    const request = useRequest();
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState<Array<DemoEmployee>>([]);
    const granularity = 0.0001;
    const expoPushToken = 'ExponentPushToken[oT1TDBCO7jtDytecDBmKWW]';
    const saveAlertSetting = async function () {
        try {
            await request.post('/api/push-service/alert-settings', {toke: expoPushToken});
        } catch (err: any) {
        }
    };

    const handleSaveQuickAlertSettings = async function () {
        dispatch(saveQuickAlertSettings({
            token: expoPushToken,
            granularity,
            reminder: {times: 3, interval: '1s'}
        }));
    };

    const getEmployees = async () => {
        try {
            const res = await bunnyAPI.get(`/employees`);
            setEmployees(res.data);
        } catch (err: any) {
            dispatch(collectSysError(err.toString()));
        }
    };

    const {buttonTitle} = props;
    return (<View>
        <Text>{props.title}</Text>
        <ButtonTO onPress={async () => {
            await getEmployees();
        }}><InButtonText>{buttonTitle}</InButtonText></ButtonTO>
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
