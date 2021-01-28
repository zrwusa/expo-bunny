export type RootStackParam = {
    Home: undefined;
    SignIn: undefined;
    Profile: { id: string };
    DemoModal: undefined | { screen: string; params?: { [key: string]: any } };
    DemoFCReduxHook: undefined;
    DemoCollection: undefined;
    DemoRoute: { id: string, isHuman: boolean, sort?: 'latest' | 'top' };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    DemoMap: undefined;
    DemoTab: undefined | { screen: string; params?: { [key: string]: any } };
    DemoDrawer: undefined | { screen: string; params?: { [key: string]: any } };
    DemoNestedLv0: undefined | { screen: string; params?: { [key: string]: any } };
    DemoRNComponents: undefined;
    DemoShare: undefined;
    DemoNotification: undefined;
    DemoTheme: undefined;
    DemoSuspense: undefined;
    DemoBitcoin: undefined | { screen: string; params?: { [key: string]: any } };
    Settings: undefined;
};

export type DemoModalStackParam = {
    ModalHome: undefined;
};

export type DemoNestedLv1StackParam = {
    NestedLv1Home: undefined;
    NestedLv1Settings: { item: string };
};

export type DemoNestedLv2StackParam = {
    NestedLv2Home: undefined;
    NestedLv2Settings: { itemlv2: string };
};

export type DemoTabStackParam = {
    TabHome: undefined;
    TabSettings: { item: string };
};

export type DemoDrawerStackParam = {
    DrawerHome: undefined;
    DrawerSettings: { item: string };
};

export type DemoBitcoinStackParam = {
    BitcoinHome: undefined;
    BitcoinAlert: { isPush: boolean };
};

export type DemoTabRNComponentsStackParam = {
    TabRNComponentsHome: undefined;
    TabRNComponentsSettings: undefined;
};

export type StackParamListUnion =
    RootStackParam
    | DemoNestedLv1StackParam
    | DemoTabStackParam
    | DemoTabRNComponentsStackParam
    | DemoBitcoinStackParam
    | DemoDrawerStackParam;

export type StackParamListIntersection =
    RootStackParam
    & DemoNestedLv1StackParam
    & DemoTabStackParam
    & DemoTabRNComponentsStackParam
    & DemoBitcoinStackParam
    & DemoDrawerStackParam;

