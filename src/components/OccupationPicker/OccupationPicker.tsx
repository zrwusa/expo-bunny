import {ButtonTO, IcoMoon, InButtonText, Text, TextButton, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import * as React from "react";
import {useEffect, useState} from "react";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getSharedStyles} from "../../helpers/shared-styles";
import {getStyles} from "./styles";
import {useFirestore} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {OccupationCategory, RootState} from "../../types";
import {FlatList} from "react-native";
import {ModalFromRight} from "../../containers/ModalFromRight";


export interface Occupation {
    category: string,
    name: string,
    code: string,
    displayLevel: number,
    sort: number,
    type: string,
}

export interface OccupationPickerProps {
    onDone?: (result?: Occupation) => void,
    onCancel?: () => void,
    initialOccupation?: Occupation,
    title?: string,
    data?: any,
}

export const OccupationPicker = (props: OccupationPickerProps) => {
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const {
        onDone,
        onCancel,
        title = 'title',
        initialOccupation,
        data,
    } = props;
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const [occupation, setOccupation] = useState(initialOccupation)

    const _reset = () => {

    }
    const occupationsStored = useSelector((state: RootState) => state.firestoreState.ordered.occupations);
    const occupationCategoriesStored = useSelector((state: RootState) => state.firestoreState.ordered.occupationCategories);
    console.log(occupationCategoriesStored)
    console.log(occupationsStored)
    const firestore = useFirestore()
    const getOccupationCategories = async () => {
        await firestore.get(
            {
                collection: 'occupationCategories',
                // orderBy: ['createdAt', 'desc'],
                // where: [
                //     ['conversationId', 'in', whereConversationIds],
                // ],
                storeAs: 'occupationCategories'
            }
        )
    }
    const getOccupations = async (category: OccupationCategory) => {
        await firestore.get(
            {
                collection: 'occupations',
                // orderBy: ['createdAt', 'desc'],
                where: [
                    ['category', '==', category.code],
                ],
                storeAs: 'occupations'
            }
        )
    }

    useEffect(() => {
        getOccupationCategories().then()

    }, [])

    const categoryPress = (category: OccupationCategory) => {
        console.log(category)
        getOccupations(category).then()
        setIsShowOccupations(true)

    }

    const [isShowOccupations, setIsShowOccupations] = useState(false)

    return <View style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
                    onCancel?.()
                }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}><Text style={sharedStyles.text2}>Reset</Text></TextButton></Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{paddingVertical: wp(10)}}>
                <FlatList
                    style={{height: 200}}
                    data={data || occupationCategoriesStored}
                    keyExtractor={item => item.code}
                    renderItem={({item}) => {
                        return <TextButton onPress={() => {
                            categoryPress(item)
                        }}><Text>{item.name}</Text></TextButton>
                    }}
                />
                <ModalFromRight isVisible={isShowOccupations}
                                onVisibleChanged={isVisible => {
                                    setIsShowOccupations(isVisible)
                                }}>
                    <OccupationPicker
                        title="o"
                        data={occupationsStored}
                        onDone={(result) => {
                            setIsShowOccupations(false);
                        }}
                        onCancel={() => {
                            setIsShowOccupations(false);
                        }}
                    />
                </ModalFromRight>
            </View>
        </View>
        <View style={[styles.footer]}>
            <ButtonTO onPress={() => {
                onDone?.(occupation)
            }}><InButtonText>Done</InButtonText></ButtonTO>
        </View>
    </View>
}
