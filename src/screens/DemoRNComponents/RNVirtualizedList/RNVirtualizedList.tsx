import React from "react";
import {View, Text, SafeAreaView, VirtualizedList} from "react-native";
import {virtualizedListStyles} from "./styles";

type Item = {
    id: string;
    title: string;
}

const VIRTUALIZED_LIST_DATA: Item[] = [];

const getVirtualizedListItem = (data: [], index: number) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,
    }
}

const getVirtualizedListItemCount = (data: []) => {
    return 1000;
}

const VirtualizedListItem = ({title}: Item) => {
    return (
        <View style={virtualizedListStyles.item}>
            <Text style={virtualizedListStyles.title}>{title}</Text>
        </View>
    );
}

const RNVirtualizedListScreen: React.FC = () => {
    return (
        <SafeAreaView style={virtualizedListStyles.container}>
            <VirtualizedList
                data={VIRTUALIZED_LIST_DATA}
                initialNumToRender={6}
                renderItem={({item}) => <VirtualizedListItem title={item.title} id={item.id} />}
                keyExtractor={item => item.id}
                getItemCount={getVirtualizedListItemCount}
                getItem={getVirtualizedListItem}
            />
        </SafeAreaView>
    );
}

export default RNVirtualizedListScreen;
