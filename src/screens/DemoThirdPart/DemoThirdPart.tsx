import React, {Component} from "react";
import {ListItem, Avatar, Button} from "react-native-elements";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ButtonRNE, IconMC, View} from "../../components/base-ui";
import {withTranslation, WithTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import containerStyle from "../../containers";

type Props = { title?: string } & WithTranslation
type States = { name: string }

class DemoThirdPartScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {t} = this.props;
        const st = stFactory(t, 'screens.DemoThirdPart');
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
                <Button icon={<MaterialCommunityIcons name="air-horn" style={{color: '#FFFFFF'}}/>}
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
                    <ButtonRNE icon={<IconMC name="air-horn"/>} title={st(`buttonWithIcon`)}/>
                    <IconMC name="air-horn"/>
                </View>
            </View>
        );
    }
}

export default withTranslation()(DemoThirdPartScreen);
