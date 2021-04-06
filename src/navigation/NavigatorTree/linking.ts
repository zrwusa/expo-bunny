import * as Linking from "expo-linking";

export const basePath = Linking.makeUrl('/');

export const linking = {
    prefixes: [basePath],
    config: {
        initialRouteName: 'Home',
        screens: {
            Home: {
                name: 'Home',
                path: 'home',
            },
            Auth: {
                name: 'Auth',
                path: 'auth',
            },
            Profile: {
                name: 'Profile',
                path: 'profile/:id',
                initialParams: {'id': '1'},
                parse: {
                    id: (id: string) => `${id}`,
                },
            },
            DemoFCReduxHook: {
                name: 'DemoFCReduxHook',
                path: 'demo-fc-redux-hook',
            },
            DemoCollection: {
                name: 'DemoCollection',
                path: 'demo-collection',
            },
            DemoRoute: {
                name: 'DemoRoute',
                path: 'demo-route',
                parse: {
                    id: (id: string) => {
                        // when passing a param through URL the param value will be parsed
                        return id;
                    }
                },
                stringify: {
                    id: (id: string) => {
                        // when passing a param through URL the param key will be stringified
                        return id
                    }
                },
            },
            DemoThirdPart: {
                name: 'DemoThirdPart',
                path: 'demo-third-part',
            },
            DemoThunkCC: {
                name: 'DemoThunkCC',
                path: 'demo-thunk-cc',
            },
            DemoSaga: {
                name: 'DemoSaga',
                path: 'demo-saga',
            },
            DemoMap: {
                name: 'DemoMap',
                path: 'demo-map',
            },
            DemoChat: {
                name: 'DemoChat',
                path: 'demo-chat',
            },
            DemoShare: {
                name: 'DemoShare',
                path: 'demo-share',
            },
            DemoNotification: {
                name: 'DemoNotification',
                path: 'demo-notification',
            },
            // {
            //     path: 'demo-modal',
            //     screens: [
            //         {
            //             name: 'ModalHome',
            //             path: 'home',
            //         }
            //     ]
            // },
            DemoTab: {
                name: 'DemoTab',
                path: 'demo-tab',
                screens: {
                    TabHome: {
                        name: 'TabHome',
                        path: 'home',
                    },
                    TabSettings: {
                        name: 'TabSettings',
                        path: 'settings/:item',
                        parse: {
                            item: (item: string) => `${item}`,
                        },
                    }
                }
            },
            DemoDrawer: {
                name: 'DemoDrawer',
                path: 'demo-drawer',
                screens: {
                    DrawerHome: {
                        name: 'DrawerHome',
                        path: 'home',
                    },
                    DrawerSettings: {
                        name: 'DrawerSettings',
                        path: 'settings/:item',
                        parse: {
                            item: (item: string) => `${item}`,
                        },
                    }
                }
            },
            DemoNestedLv0: {
                name: 'DemoNestedLv0',
                path: 'demo-nested',
                screens: {
                    NestedLv1Home: {
                        name: 'NestedLv1Home',
                        path: 'home',
                    },
                    NestedLv1Settings: {
                        name: 'NestedLv1Settings',
                        path: 'settings/:item',
                        screens: {
                            NestedLv2Home: {
                                name: 'NestedLv2Home',
                                path: 'lv2-home',
                            },
                            NestedLv2Settings: {
                                name: 'NestedLv2Settings',
                                path: 'lv2-settings/:itemlv2',
                                parse: {
                                    itemlv2: (itemlv2: string) => `${itemlv2}`,
                                },
                            }
                        }
                    }
                }
            },
            DemoRNComponents: {
                name: 'DemoRNComponents',
                path: 'demo-tab-rn-components',
                screens: {
                    RNHome: {
                        name: 'RNHome',
                        path: 'home',
                    },
                    RNFlatList: {
                        name: 'RNFlatList',
                        path: 'flat-list',
                    },
                    RNSectionList: {
                        name: 'RNSectionList',
                        path: 'section-list',
                    },
                    RNVirtualizedList: {
                        name: 'RNVirtualizedList',
                        path: 'virtualized-list',
                    },
                    RNNoKeyboard: {
                        name: 'RNNoKeyboard',
                        path: 'keyboard-avoiding',
                    },
                    RNSafeArea: {
                        name: 'RNSafeArea',
                        path: 'safe-area',
                    }
                }
            },
            DemoCryptoCurrency: {
                name: 'DemoCryptoCurrency',
                path: 'demo-crypto-currency',
                screens: {
                    CryptoCurrencyHome: {
                        name: 'CryptoCurrencyHome',
                        path: 'home',
                    },
                    CryptoCurrencyAlert: {
                        name: 'CryptoCurrencyAlert',
                        path: 'alert/:isPush',
                    }
                }
            },
            DemoIG: {
                name: 'DemoIG',
                path: 'demo-ig',
                screens: {
                    IGHome: {
                        name: 'IGHome',
                        path: 'home',
                    },
                    IGSearch: {
                        name: 'IGSearch',
                        path: 'search/:keyword',
                        parse: {
                            item: (keyword: string) => `${keyword}`,
                        },
                    },
                    IGMedia: {
                        name: 'IGMedia',
                        path: 'media',
                    },
                    IGSettings: {
                        name: 'IGSettings',
                        path: 'settings/:item',
                        parse: {
                            item: (item: string) => `${item}`,
                        },
                    }
                }
            },
            DemoSearch: {
                name: 'DemoSearch',
                path: 'demo-search/:keyword',
                parse: {
                    item: (keyword: string) => `${keyword}`,
                },
            },
            Settings: {
                name: 'Settings',
                path: 'settings',
            },
            DemoSuspense: {
                name: 'DemoSuspense',
                path: 'demo-suspense',
            },
            DemoTheme: {
                name: 'DemoTheme',
                path: 'demo-theme',
            },
        }
    },
}
