import * as React from 'react';
import {useRef} from 'react';
import {View} from '../../../components/UI';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {Row} from '../../../containers';
import CardStack, {Card as StackSwiperCard} from 'react-native-card-stack-swiper';
import data from './data';
import CardItem from './CardItem';
import {makeStyles} from './styles';
import {useBunnyKit} from '../../../hooks/bunny-kit';

export function DatingHomeScreen() {
    const {sizeLabor, themeLabor, theme, colors, wp, t, ms} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DatingHome');
    const styles = makeStyles(sizeLabor, themeLabor);

    const swipper = useRef<CardStack>(null);
    return (
        <View style={styles.screen}>
            <Row style={styles.filter}>

            </Row>
            <Row style={styles.albumContainer}>
                <CardStack style={styles.album}
                           loop
                           verticalSwipe={true}
                           renderNoMoreCards={() => null}
                           ref={swipper}
                           horizontalThreshold={60}
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
