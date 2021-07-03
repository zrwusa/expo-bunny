import * as React from "react";
import {useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {
    City,
    Country,
    DemoDatingTabStackParam,
    Occupation,
    OccupationCategory,
    Religion,
    State,
    University
} from "../../../types";
import {Col, getContainerStyles, ModalFromBottom, ModalFromRight, Row} from "../../../containers";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers";
import {ScrollView} from "react-native";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {
    Divider,
    Graduate,
    HeightPicker,
    InlineSelector,
    InterestPicker,
    SpousePicker,
    SpousePickerResult,
    TreeNodePicker,
    UserAlbumEditor
} from "../../../components";
import {defaultValues} from "../../../constants";
import {Slider} from "../../../../packages/react-native-range-slider-expo/src";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

export type OccupationSelected = [OccupationCategory, Occupation] | undefined;
export type LiveInSelected = [Country, State, City] | undefined;
export type UniversitySelected = [University] | undefined;
export type ReligionSelected = [Religion] | undefined;


export function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {sizeLabor, themeLabor, wp, t, colors, user} = useBunnyKit();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);


    const idealSpouseTitle = 'Ideal Girl';
    const [isShowSpouseModal, setIsShowSpouseModal] = useState(false);
    const _toggleSpouseModal = () => {
        setIsShowSpouseModal(!isShowSpouseModal)
    }

    const [idealSpouse, setIdealSpouse] = useState<SpousePickerResult>({
        distance: 10,
        age: 24,
        fromHeight: 163,
        toHeight: 180
    })


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
    const [religion, setReligion] = useState<ReligionSelected>([defaultValues.religion])

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
                <InlineSelector title={religionTitle}
                                onPress={() => {
                                    _toggleReligionModal()
                                }}
                                renderText={() => {
                                    return religion?.[0].display || ''
                                }}/>
                <Divider/>
                <InlineSelector title={liveInTitle}
                                onPress={() => {
                                    _toggleLiveInModal()
                                }}
                                renderText={() => {
                                    return liveIn?.[2]?.name || ''
                                }}/>
                <Divider/>
                <Row style={{paddingHorizontal: wp(10), paddingVertical: wp(3)}}>
                    <Col size={2}>
                        <Text style={[sharedStyles.text]}>{heightTitle}</Text>
                    </Col>
                    <Col size={10}>
                        <Slider min={50}
                                max={240}
                                step={1}
                                valueOnChange={value => setHeight(value)}
                                valueOnIndicated={(value) => setHeight(value)}
                                initialValue={180}
                                invert={false}
                                styleSize={24}
                                showRangeLabels={false}
                                showValueLabels={false}
                        />
                    </Col>
                    <Col size={2} align="flex-end" style={{paddingRight: wp(10)}}>
                        <Text numberOfLines={1} style={[sharedStyles.text2]}>
                            {height + 'cm'}
                        </Text>
                    </Col>
                </Row>
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

            <ModalFromBottom isVisible={isShowSpouseModal}
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
            </ModalFromBottom>
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
                    displayFields={['name', 'name']}

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
                    displayFields={['name']}
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
                <TreeNodePicker
                    titles={['Religion']}

                    dataMode="firestore"
                    leafLevel={0}
                    collectionPaths={['religions']}
                    conditions={[['', '==', '']]}
                    keyExtractors={['id']}
                    displayFields={['display']}
                    // dataMode="local"
                    // data={occupationTreeData}
                    // childrenKeys={['children', 'children']}

                    onDone={(result) => {
                        setReligion(result as unknown as ReligionSelected);
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
                    displayFields={['name', 'name', 'name']}
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

