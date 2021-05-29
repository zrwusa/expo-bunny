import * as React from "react";
import {useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoDatingTabStackParam} from "../../../types";
import {BottomModal, getContainerStyles} from "../../../containers";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {ScrollView} from "react-native";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {
    Divider,
    Graduate,
    GraduatePicker,
    HeightPicker,
    InlineSelector,
    InterestPicker,
    Occupation,
    OccupationPicker,
    ReligionPicker,
    SpousePicker,
    SpousePickerResult,
    UserAlbumEditor
} from "../../../components";
import {Religion} from "../../../components/ReligionPicker";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}


export function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {sizeLabor, themeLabor, wp, t, colors, user} = useBunnyKit();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);


    const idealSpouseTitle = 'Ideal Spouse';
    const [isShowSpouseModal, setIsShowSpouseModal] = useState(false);
    const _toggleSpouseModal = () => {
        setIsShowSpouseModal(!isShowSpouseModal)
    }

    const [idealSpouse, setIdealSpouse] = useState<SpousePickerResult>({distance: 10, age: 24, fromHeight: 163, toHeight: 180})


    const occupationTitle = 'Occupation';
    const [isShowOccupationModal, setIsShowOccupationModal] = useState(false);
    const _toggleOccupationModal = () => {
        setIsShowOccupationModal(!isShowOccupationModal)
    }
    const [occupation, setOccupation] = useState<Occupation | undefined>({name: 'Occupation-001', code: 'Test-0001'})


    const graduateTitle = 'Graduate';
    const [isShowGraduateModal, setIsShowGraduateModal] = useState(false);
    const _toggleGraduateModal = () => {
        setIsShowGraduateModal(!isShowGraduateModal)
    }
    const [graduate, setGraduate] = useState<Graduate | undefined>({name: 'Graduate-001', code: 'Test-0001'})


    const heightTitle = 'Height';
    const [isShowHeightModal, setIsShowHeightModal] = useState(false);
    const _toggleHeightModal = () => {
        setIsShowHeightModal(!isShowHeightModal)
    }
    const [height, setHeight] = useState<number | undefined>(0)

    const religionTitle = 'Religion';
    const [isShowReligionModal, setIsShowReligionModal] = useState(false);
    const _toggleReligionModal = () => {
        setIsShowReligionModal(!isShowReligionModal)
    }
    const [religion, setReligion] = useState<Religion | undefined>({name: 'Religion-001', code: 'Test-001'})
    return (
        <ScrollView style={[containerStyles.Screen]}>
            <UserAlbumEditor/>
            <View style={{padding: wp(10)}}>
                <Text style={sharedStyles.text2}>{user?.storedUser?.displayName}</Text>
            </View>
            <Divider/>
            <Text style={[sharedStyles.title2,
                {
                    marginLeft: wp(10),
                    marginTop: wp(20),
                    marginBottom: wp(1)
                }]}>Personal Info</Text>
            <View style={{paddingHorizontal: wp(10)}}>
                <InlineSelector title={idealSpouseTitle}
                                onPress={() => {
                                    _toggleSpouseModal()
                                }}
                                renderText={() => {
                                    return idealSpouse.distance + 'mi,' +
                                        idealSpouse.age + 'years old,' +
                                        idealSpouse.toHeight + 'cm'
                                }}/>
                <Divider/>
                <InlineSelector title={occupationTitle}
                                onPress={() => {
                                    _toggleOccupationModal()
                                }}
                                renderText={() => {
                                    return occupation?.name || ''
                                }}/>
                <Divider/>
                <InlineSelector title={graduateTitle}
                                onPress={() => {
                                    _toggleGraduateModal()
                                }}
                                renderText={() => {
                                    return graduate?.name || ''
                                }}/>
                <Divider/>
                <InlineSelector title={heightTitle}
                                onPress={() => {
                                    _toggleHeightModal()
                                }}
                                renderText={() => {
                                    return height?.toString() || ''
                                }}/>
                <Divider/>
                <InlineSelector title={religionTitle}
                                onPress={() => {
                                    _toggleReligionModal()
                                }}
                                renderText={() => {
                                    return religion?.name || ''
                                }}/>
            </View>
            <Divider/>
            <Text style={[sharedStyles.title2,
                {
                    marginLeft: wp(10),
                    marginTop: wp(20),
                    marginBottom: wp(1)
                }]}>Interests</Text>
            <InterestPicker type="edit" onDone={(result) => {
                console.log(result)
            }}/>

            <BottomModal isVisible={isShowSpouseModal}
                         onVisibleChanged={isVisible => {
                             setIsShowSpouseModal(isVisible)
                         }}>
                <SpousePicker
                    title={idealSpouseTitle}
                    onDone={(result) => {
                        setIdealSpouse(result);
                        setIsShowSpouseModal(false);
                    }}
                    onCancel={() => {
                        setIsShowSpouseModal(false);
                    }}
                />
            </BottomModal>
            <BottomModal isVisible={isShowOccupationModal}
                         onVisibleChanged={isVisible => {
                             setIsShowOccupationModal(isVisible)
                         }}>
                <OccupationPicker
                    title={occupationTitle}
                    onDone={(result) => {
                        setOccupation(result);
                        setIsShowOccupationModal(false);
                    }}
                    onCancel={() => {
                        setIsShowOccupationModal(false);
                    }}
                />
            </BottomModal>
            <BottomModal isVisible={isShowGraduateModal}
                         onVisibleChanged={isVisible => {
                             setIsShowGraduateModal(isVisible)
                         }}>
                <GraduatePicker
                    title={graduateTitle}
                    onDone={(result) => {
                        setGraduate(result);
                        setIsShowGraduateModal(false);
                    }}
                    onCancel={() => {
                        setIsShowGraduateModal(false);
                    }}
                />
            </BottomModal>
            <BottomModal isVisible={isShowHeightModal}
                         onVisibleChanged={isVisible => {
                             setIsShowHeightModal(isVisible)
                         }}>
                <HeightPicker
                    title={heightTitle}
                    onDone={(result) => {
                        setHeight(result);
                        setIsShowHeightModal(false);
                    }}
                    onCancel={() => {
                        setIsShowHeightModal(false);
                    }}
                />
            </BottomModal>
            <BottomModal isVisible={isShowReligionModal}
                         onVisibleChanged={isVisible => {
                             setIsShowReligionModal(isVisible)
                         }}>
                <ReligionPicker
                    title={religionTitle}
                    onDone={(result) => {
                        setReligion(result);
                        setIsShowReligionModal(false);
                    }}
                    onCancel={() => {
                        setIsShowReligionModal(false);
                    }}
                />
            </BottomModal>
        </ScrollView>
    );
}

