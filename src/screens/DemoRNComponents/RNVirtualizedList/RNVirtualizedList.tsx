import React from "react";
import {SafeAreaView, View, VirtualizedList} from "react-native";
import {Text} from "../../../components/UI"
import {createStyles} from "./styles";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";

type VirtualizedListItem = {
    id: string;
    title: string;
}

function RNVirtualizedListScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    const virtualizedListData: VirtualizedListItem[] = [];

    const getVirtualizedListItem = (data: [], index: number) => {
        return {
            id: Math.random().toString(12).substring(0),
            title: `Item ${index + 1}`,
        }
    }

    const getVirtualizedListItemCount = (data: []) => {
        return 1000;
    }

    const VirtualizedListItem = ({title}: VirtualizedListItem) => {
        const {colors} = useThemeLabor().theme

        return (
            <View style={{
                backgroundColor: colors.background,
                height: 150,
                justifyContent: 'center',
                marginVertical: 2,
                marginHorizontal: 2,
                padding: 20,
            }}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={containerStyles.Screen}>
            <VirtualizedList
                data={virtualizedListData}
                initialNumToRender={6}
                renderItem={({item}) => <VirtualizedListItem title={item.title} id={item.id}/>}
                keyExtractor={item => item.id}
                getItemCount={getVirtualizedListItemCount}
                getItem={getVirtualizedListItem}
            />
        </SafeAreaView>
    );
}

export default RNVirtualizedListScreen;
