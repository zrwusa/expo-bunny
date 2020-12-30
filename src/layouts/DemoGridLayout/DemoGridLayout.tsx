import React from "react";
import DemoNavLinks from "./DemoNavLinks";
import DemoHeader from "./DemoHeader";
import {View,Text} from "react-native";

interface Props {
    title?: string,
}

const DemoGridLayout: React.FC<Props> = ({title,children}) => {
    return (
            <View>
                <DemoHeader title={title} />
                <View>
                    <Text>Nav bar</Text>
                    <DemoNavLinks />
                </View>
                    <Text>Content</Text>
                {children}
                {/*<aside className="grid-layout__sidebar grid-layout__panel">Side bar section</aside>*/}
                {/*<div className="grid-layout__ad grid-layout__panel">Advertising section</div>*/}

                <Text>Footer</Text>
            </View>
    );
}

export default DemoGridLayout;
