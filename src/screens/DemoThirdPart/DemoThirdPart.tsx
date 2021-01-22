import React, {Component} from "react";
import {View} from "react-native";
import {ListItem, Avatar, Button} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {DemoButtonStyledRNE, DemoIconCssStyled} from "../../components/base-ui";
import {withTranslation, WithTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";
import containerStyle from "../../containers";

type Props = { title?: string } & WithTranslation
type States = { name: string }

class DemoThirdPartScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {t} = this.props;
        const i18nPrefix = 'screens.DemoThirdPart';
        const st = stFactory(t, i18nPrefix);
        const list = [
            {
                name: "Amy Farha",
                avatar_url: "https://raw.githubusercontent.com/zrwusa/assets/master/images/alert-orange-border.png",
                subtitle: "Alex"
            },
            {
                name: "Chris Jackson",
                avatar_url: "https://github.com/zrwusa/assets/raw/master/images/rocket-green-border.png",
                subtitle: "Rios"
            },
        ];
        return (
            <View style={containerStyle.screen}>
                <Button icon={<Icon name="air-horn" style={{color: '#FFFFFF'}}/>}
                        title={st(`buttonWithIcon`)}/>
                <View>
                    {list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{uri: l.avatar_url}}/>
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
                <View>
                    <DemoButtonStyledRNE icon={<DemoIconCssStyled name="air-horn"/>}
                                         title={st(`buttonWithIcon`)}/>
                    <DemoIconCssStyled name="air-horn"/>
                </View>
            </View>
        );
    }
}

export default withTranslation()(DemoThirdPartScreen);
