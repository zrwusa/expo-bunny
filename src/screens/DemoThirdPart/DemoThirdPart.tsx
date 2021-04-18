import React, {useState} from "react";
import {Avatar, Button, List} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import {IconMC, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {uuidV4} from "../../utils";
import {useThemeLabor} from "../../providers/theme-labor";

interface Props {
    title?: string
}

type States = { name: string, pickerValue: string }

function DemoThirdPartScreen(props: Props) {
    const [state, setState] = useState<States>({
        name: 'DemoThirdPart',
        pickerValue: 'football'
    })

    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const themeLabor = useThemeLabor();
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DemoThirdPart');

    const LIST = [
        {
            id: uuidV4(),
            name: "Amy Farha",
            avatar_url: "https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png",
            subtitle: "Alex"
        },
        {
            id: uuidV4(),
            name: "Chris Jackson",
            avatar_url: "https://github.com/zrwusa/assets/raw/master/images/rocket-green-border.png",
            subtitle: "Rios"
        },
    ];
    const containerStyles = getContainerStyles(sizeLabor, themeLabor)

    return (
        <View style={containerStyles.Screen}>
            <Button
                icon={() => <IconMC name="air-horn"/>}
                onPress={() => {
                }}>{st(`buttonWithIcon`)}</Button>
            <View>
                <List.Section title="Accordions">
                    {LIST.map((l, i) => (
                        <List.Accordion key={l.id}
                                        title={l.name}
                                        left={props => <Avatar.Image size={wp(30)} source={{uri: l.avatar_url}}/>}>
                            <List.Item title="First item"/>
                            <List.Item title="Second item"/>
                        </List.Accordion>
                    ))}
                </List.Section>
            </View>
            <View>
                <Button
                    icon={() => <IconMC name="air-horn"/>}
                    onPress={() => {
                    }}>{st(`buttonWithIcon`)}</Button>
            </View>
            <RNPickerSelect
                value={state.pickerValue}
                onValueChange={(itemValue, itemIndex) => setState({...state, pickerValue: itemValue})}
                items={[
                    {label: 'Football', value: 'football'},
                    {label: 'Baseball', value: 'baseball'},
                    {label: 'Hockey', value: 'hockey'},
                ]}
            >
            </RNPickerSelect>
        </View>
    );
}

export default DemoThirdPartScreen;
