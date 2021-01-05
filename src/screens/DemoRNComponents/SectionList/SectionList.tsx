import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    SectionList,
} from "react-native";
import {sectionListStyles} from "./styles"

function SectionListScreen() {

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
        <View style={sectionListStyles.item}>
            <Text style={sectionListStyles.title}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={sectionListStyles.container}>
            <SectionList
                sections={SECTION_LIST_DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <SectionListItem title={item}/>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={sectionListStyles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

export default SectionListScreen;
