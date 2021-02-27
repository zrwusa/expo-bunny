import React, {useState} from "react";
import {Avatar, Button, ListItem} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import {ButtonRNE, IconMC, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {uuidV4} from "../../utils";
import {useThemeLabor} from "../../providers/themeLabor";

type Props = { title?: string };
type States = { name: string, pickerValue: string }

function DemoThirdPartScreen(props: Props) {
    const [state, setState] = useState<States>({
        name: 'DemoThirdPart',
        pickerValue: 'football'
    })

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoThirdPart');

    const list = [
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
        <View style={containerStyles.screen}>
            <Button icon={<IconMC name="air-horn"/>}
                    title={st(`buttonWithIcon`)}/>
            <View>
                {list.map((l, i) => (
                    <ListItem key={l.id} bottomDivider>
                        <Avatar source={{uri: l.avatar_url}}/>
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
            <View>
                <ButtonRNE icon={<IconMC name="air-horn"/>} title={st(`buttonWithIcon`)}/>
                <IconMC name="air-horn"/>
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
