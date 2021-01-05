import React from "react";
import {FlatList, SafeAreaView, View, Text} from "react-native";
import {flatListStyles} from "./styles";

export const FlatListScreen: React.FC = () => {
    type IFlatListItem = {
        id: string;
        title: string;
    }
    const FLAT_LIST_DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const FlatListItem = ({title}: any) => (
        <View style={flatListStyles.item}>
            <Text style={flatListStyles.title}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={flatListStyles.container}>
            <FlatList
                data={FLAT_LIST_DATA}
                renderItem={({item}: any) => (
                    <FlatListItem title={item.title}/>
                )}
                keyExtractor={(item: IFlatListItem) => item.id}
            />
        </SafeAreaView>
    );
}

export default FlatListScreen;
