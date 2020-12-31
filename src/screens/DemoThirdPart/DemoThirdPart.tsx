import React, {Component} from "react";
import {View} from "react-native";
import {Button, ListItem, Avatar} from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


type Props = { title?: string }
type States = { name: string }

class DemoThirdPart extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
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
        return (<View>
            <Button
                icon={
                    <Icon
                        name="air-horn"
                        size={15}
                        color="white"
                    />
                }
                title="Button with icon"
            />
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{uri: l.avatar_url}}/>
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </View>);
    }
}

export default DemoThirdPart;
