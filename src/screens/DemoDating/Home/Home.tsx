import * as React from "react";
import {useRef} from "react";
import {View} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {getContainerStyles, Row} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getSharedStyles} from "../../../helpers/shared-styles";
import CardStack, {Card as StackSwiperCard} from "react-native-card-stack-swiper";
import data from "./data"
import CardItem from "./CardItem";
import {getStyles} from "./styles";

export function DatingHomeScreen() {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DatingHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);

    const swipper = useRef<CardStack>(null)
    return (
        <View style={styles.screen}>
            <Row style={styles.filter}>

            </Row>
            <Row style={styles.albumContainer}>
                <CardStack style={styles.album}
                           loop
                           verticalSwipe={false}
                           renderNoMoreCards={() => null}
                           ref={swipper}
                           onSwipedLeft={() => {
                           }}
                           onSwipedRight={() => {
                           }}
                >
                    {data.map((item) => (
                        <StackSwiperCard key={item.id}>
                            <CardItem
                                hasActions
                                image={item.image}
                                name={item.name}
                                description={item.description}
                                matches={item.match}
                            />
                        </StackSwiperCard>
                    ))}
                </CardStack>
            </Row>
        </View>
    );
}
