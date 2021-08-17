import {ButtonTO, IcoMoon, InButtonText, Text, TextButton, View} from '../UI';
import {Row} from '../../containers/Row';
import {Col} from '../../containers/Col';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {getSharedStyles} from '../../helpers';
import {getStyles} from './styles';
import Modal from 'react-native-modal';
import {Divider} from '../Divider';
import {FlatList} from 'react-native';
import {dictionaries} from './dictionaries';
import {Checkbox} from 'react-native-paper';
import lodash from 'lodash';
import {capitalizeWords} from '../../utils';
import {InlineSelector} from '../InlineSelector';

export interface Interest {
    name: string,
    code: string,
}

export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate'

export type InterestType = 'sports' | 'musics' | 'foods' | 'movies' | 'books' | 'travels'

export interface InterestPickerResult {
    sports: Interest[],
    musics: Interest[],
    foods: Interest[],
    movies: Interest[],
    books: Interest[],
    travels: Interest[],
}

export type InterestModifyType = 'info' | 'edit'

export interface InterestPickerProps {
    onDone?: (result: InterestPickerResult) => void,
    type: InterestModifyType,
    initialSports?: Interest[],
    initialMusics?: Interest[],
    initialFoods?: Interest[],
    initialMovies?: Interest[],
    initialBooks?: Interest[],
    initialTravels?: Interest[],
}

export const InterestPicker = (props: InterestPickerProps) => {
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const {
        onDone,
        type = 'edit',
        initialSports = [{name: 'ATV', code: 'A0001'}],
        initialMusics = [],
        initialFoods = [],
        initialMovies = [],
        initialBooks = [],
        initialTravels = [],
    } = props;
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);

    const _reset = () => {

    }

    const [result, setResult] = useState({
        sports: initialSports,
        musics: initialMusics,
        foods: initialFoods,
        movies: initialMovies,
        books: initialBooks,
        travels: initialTravels
    })

    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<InterestType>('musics')
    const [checkState, setCheckState] = useState<{ [key in string]: CheckboxStatus }>({})
    const _toggleModal = (type: InterestType) => {
        setModalType(type)
        let newCheckState: { [key in string]: CheckboxStatus } = {};
        dictionaries[type].forEach(item => {
            newCheckState[item.code] = 'unchecked'
        })
        const interests = result[type]
        interests.forEach(interest => {
            newCheckState[interest.code] = 'checked'
        })
        setCheckState((prev) => (newCheckState))
        setShowModal(!showModal)
    }

    useEffect(() => {
        onDone?.(result)
    }, [result])


    return (
        <View style={[styles.container]}>
            <View>
                <InlineSelector title="Sports"
                                onPress={() => {
                                    _toggleModal('sports')
                                }}
                                renderText={() => result.sports.map(item => item.name).join(',')}/>
                <Divider/>
                <InlineSelector title="Musics"
                                onPress={() => {
                                    _toggleModal('musics')
                                }}
                                renderText={() => result.musics.map(item => item.name).join(',')}/>
                <Divider/>
                <InlineSelector title="Foods"
                                onPress={() => {
                                    _toggleModal('foods')
                                }}
                                renderText={() => result.foods.map(item => item.name).join(',')}/>
                <Divider/>
                <InlineSelector title="Movies"
                                onPress={() => {
                                    _toggleModal('movies')
                                }}
                                renderText={() => result.movies.map(item => item.name).join(',')}/>
                <Divider/>
                <InlineSelector title="Books"
                                onPress={() => {
                                    _toggleModal('books')
                                }}
                                renderText={() => result.books.map(item => item.name).join(',')}/>
                <Divider/>
                <InlineSelector title="Travels"
                                onPress={() => {
                                    _toggleModal('travels')
                                }}
                                renderText={() => result.travels.map(item => item.name).join(',')}/>
            </View>

            <Modal isVisible={showModal}
                   propagateSwipe={true}
                   onSwipeComplete={() => setShowModal(false)}
                   swipeDirection="down"
                   style={styles.modal}
                   onBackdropPress={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Row>
                            <Col><TextButton onPress={() => {
                                setShowModal(false)
                            }}><IcoMoon name="x"/></TextButton></Col>
                            <Col align="center"><Text
                                style={sharedStyles.title}>{capitalizeWords(modalType)}</Text></Col>
                            <Col align="flex-end"><TextButton onPress={_reset}><Text
                                style={[sharedStyles.text2, {
                                    paddingVertical: wp(10),
                                    paddingHorizontal: wp(5)
                                }]}>Reset</Text></TextButton></Col>
                        </Row>
                    </View>
                    <Divider/>
                    <View style={styles.content}>
                        <FlatList
                            style={{height: wp(400)}}
                            data={dictionaries[modalType]}
                            keyExtractor={item => item.code}
                            renderItem={({item}) => {
                                return <Checkbox.Item labelStyle={sharedStyles.text2} label={item.name}
                                                      color={colors.primary}
                                                      status={checkState[item.code]} onPress={() => {
                                    let newStatus: CheckboxStatus = 'unchecked';
                                    switch (checkState[item.code]) {
                                        case 'checked':
                                            newStatus = 'unchecked'
                                            break;
                                        case 'unchecked':
                                            newStatus = 'checked'
                                            break;
                                        case 'indeterminate':
                                            newStatus = 'checked'
                                            break;
                                    }
                                    setCheckState((prev) => ({
                                        ...prev,
                                        [item.code]: newStatus
                                    }))
                                }}/>
                            }}
                        />
                    </View>
                    <View style={[styles.footer]}>
                        <ButtonTO onPress={() => {
                            _toggleModal('musics')

                            let checked = lodash.pickBy(checkState, function (value) {
                                return value === 'checked';
                            });
                            const checkedKeys = Object.keys(checked)
                            const checkedInterests = dictionaries[modalType].filter(item => {
                                return checkedKeys.includes(item.code)
                            })

                            setResult(prevState => (
                                {
                                    ...prevState,
                                    [modalType]: checkedInterests
                                }
                            ))
                        }}><InButtonText>Done</InButtonText></ButtonTO>
                    </View>
                </View>

            </Modal>
        </View>
    )
}
