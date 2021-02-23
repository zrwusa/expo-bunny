import React, {Component} from "react";
import {ListItem, Avatar, Button} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import {ButtonRNE, IconMC, View} from "../../components/UI";
import {withTranslation, WithTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor/short-t";
import getContainerStyles from "../../containers";
import {withSizeLabor, WithSizeLabor} from "../../providers/sizeLabor";
import {withThemeLabor} from "../../providers/themeLabor";
import {WithThemeLabor} from "../../types";
import {uuidV4} from "../../utils";

type Props = { title?: string } & WithTranslation & WithSizeLabor & WithThemeLabor;
type States = { name: string, pickerValue: string }

class DemoThirdPartScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: 'DemoThirdPart',
            pickerValue: 'football'
        }
    }

    render(): React.ReactNode {
        const {t, sizeLabor, themeLabor} = this.props;
        const {theme} = themeLabor;
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
                    value={this.state.pickerValue}
                    onValueChange={(itemValue, itemIndex) => this.setState({pickerValue: itemValue})}
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
}

export default withTranslation()(withSizeLabor(withThemeLabor(DemoThirdPartScreen)));
