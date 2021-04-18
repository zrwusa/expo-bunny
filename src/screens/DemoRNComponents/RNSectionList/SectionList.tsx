import React from "react";
import {SafeAreaView, SectionList, View} from "react-native";
import {Text} from "../../../components/UI";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getStyles} from "./styles";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";

function SectionListScreen() {
    const themeLabor = useThemeLabor()
    const {colors} = themeLabor.theme;
    const SECTION_LIST_DATA = [
        {
            title: "Main dishes",
            data: ["Pizza", "Burger", "Risotto"]
        },
        {
            title: "Sides",
            data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
            title: "Drinks",
            data: ["Water", "Coke", "Beer"]
        },
        {
            title: "Desserts",
            data: ["Cheese Cake", "Ice Cream"]
        },
        {
            title: "Soup",
            data: ["Mushroom Soup", "Tomato Soup", "Papa Soup", "D-start Soup", "Noodle Soup"]
        }
    ];

    const SectionListItem = ({title}: any) => (
        <View style={{
            backgroundColor: colors.background,
            padding: 20,
            marginVertical: 1
        }}>
            <Text style={{fontSize: 24}}>{title}</Text>
        </View>
    );
    const sizeLabor = useSizeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <SafeAreaView style={[containerStyles.Screen, styles.container]}>
            <SectionList
                sections={SECTION_LIST_DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <SectionListItem title={item}/>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{
                        fontSize: 32,
                        backgroundColor: colors.backdrop
                    }}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

export default SectionListScreen;
