import * as React from "react";
import {useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {City, Country, DemoDatingTabStackParam, OccupationCategory, State, University} from "../../../types";
import {getContainerStyles, ModalFromRight} from "../../../containers";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {ScrollView} from "react-native";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {
    Divider,
    Graduate,
    HeightPicker,
    InlineSelector,
    InterestPicker,
    LiveIn,
    Occupation,
    ReligionPicker,
    SpousePicker,
    SpousePickerResult,
    TreeNodePicker,
    UserAlbumEditor
} from "../../../components";
import {Religion} from "../../../components/ReligionPicker";
import {defaultValues} from "../../../constants";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

export type OccupationSelected = [OccupationCategory, Occupation] | undefined;
export type LiveInSelected = [Country, State, City] | undefined;
export type UniversitySelected = [University] | undefined;


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
    const [occupation, setOccupation] = useState<OccupationSelected>([
        defaultValues.occupationCategory, defaultValues.occupation])


    const graduateTitle = 'Graduate';
    const [isShowGraduateModal, setIsShowGraduateModal] = useState(false);
    const _toggleGraduateModal = () => {
        setIsShowGraduateModal(!isShowGraduateModal)
    }
    const [graduate, setGraduate] = useState<UniversitySelected | undefined>([defaultValues.university])


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

    const liveInTitle = 'LiveIn';
    const [isShowLiveInModal, setIsShowLiveInModal] = useState(false);
    const _toggleLiveInModal = () => {
        setIsShowLiveInModal(!isShowLiveInModal)
    }
    const [liveIn, setLiveIn] = useState<LiveInSelected>([defaultValues.country, defaultValues.state, defaultValues.city])
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
                                    return occupation?.[1]?.name || ''
                                }}/>
                <Divider/>
                <InlineSelector title={graduateTitle}
                                onPress={() => {
                                    _toggleGraduateModal()
                                }}
                                renderText={() => {
                                    return graduate?.[0].name || ''
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
                <Divider/>
                <InlineSelector title={liveInTitle}
                                onPress={() => {
                                    _toggleLiveInModal()
                                }}
                                renderText={() => {
                                    return liveIn?.[2]?.name || ''
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

            <ModalFromRight isVisible={isShowSpouseModal}
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
            </ModalFromRight>
            <ModalFromRight isVisible={isShowOccupationModal}
                            onVisibleChanged={isVisible => {
                                setIsShowOccupationModal(isVisible)
                            }}>
                <TreeNodePicker
                    titles={['Category', 'Occupation', 'Test']}
                    keyExtractors={['code', 'code', 'code']}
                    dataMode="firestore"
                    leafLevel={1}
                    collectionPaths={['occupationCategories', 'occupations']}
                    conditions={[['', '==', ''], ['category', '==', '$code']]}

                    // dataMode="local"
                    // data={occupationTreeData}
                    // childrenKeys={['children', 'children']}
                    onDone={(result) => {
                        console.log(result)

                        setOccupation(result as unknown as OccupationSelected);
                        setIsShowOccupationModal(false);
                    }}
                    onCancel={() => {
                        setIsShowOccupationModal(false);
                    }}
                />
                {/*<OccupationPicker*/}
                {/*    title={occupationTitle}*/}
                {/*    onDone={(result) => {*/}
                {/*        setOccupation(result);*/}
                {/*        setIsShowOccupationModal(false);*/}
                {/*    }}*/}
                {/*    onCancel={() => {*/}
                {/*        setIsShowOccupationModal(false);*/}
                {/*    }}*/}
                {/*/>*/}
            </ModalFromRight>
            <ModalFromRight isVisible={isShowGraduateModal}
                            onVisibleChanged={isVisible => {
                                setIsShowGraduateModal(isVisible)
                            }}>
                <TreeNodePicker
                    titles={['University']}

                    dataMode="firestore"
                    leafLevel={0}
                    collectionPaths={['universities']}
                    conditions={[['', '==', '']]}
                    keyExtractors={['id']}
                    // dataMode="local"
                    // data={occupationTreeData}
                    // childrenKeys={['children', 'children']}

                    onDone={(result) => {
                        setGraduate(result as unknown as UniversitySelected);
                        setIsShowGraduateModal(false);
                    }}

                    onCancel={() => {
                        setIsShowGraduateModal(false);
                    }}
                />
            </ModalFromRight>
            <ModalFromRight isVisible={isShowHeightModal}
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
            </ModalFromRight>
            <ModalFromRight isVisible={isShowReligionModal}
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
            </ModalFromRight>
            <ModalFromRight isVisible={isShowLiveInModal}
                            onVisibleChanged={isVisible => {
                                setIsShowLiveInModal(isVisible)
                            }}>
                <TreeNodePicker
                    titles={['Country', 'State', 'City']}

                    dataMode="firestore"
                    leafLevel={2}
                    collectionPaths={['countries', 'states', 'cities']}
                    conditions={[['', '==', ''], ['countryId', '==', '$id'], ['stateId', '==', '$id']]}
                    keyExtractors={['id', 'id', 'id']}
                    // dataMode="local"
                    // data={occupationTreeData}
                    // childrenKeys={['children', 'children']}

                    onDone={(result) => {
                        setLiveIn(result as unknown as LiveInSelected);
                        setIsShowLiveInModal(false);
                    }}

                    onCancel={() => {
                        setIsShowLiveInModal(false);
                    }}
                />
            </ModalFromRight>
        </ScrollView>
    );
}

