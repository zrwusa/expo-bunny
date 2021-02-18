import React from "react";
import {View, SafeAreaView, VirtualizedList} from "react-native";
import {Text} from "../../../components/base-ui"
import {getStyles} from "./styles";
import {useTheme} from "../../../styles/theme";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";

type Item = {
    id: string;
    title: string;
}

const RNVirtualizedListScreen: React.FC = () => {
    const sizer = useSizer();
    const theme = useTheme();
    const styles = getStyles(sizer,theme)
    const containerStyles = getContainerStyles(sizer, theme);

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
        const {colors} = useTheme()

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
        <SafeAreaView style={containerStyles.screen}>
            <VirtualizedList
                data={VIRTUALIZED_LIST_DATA}
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
