export type RootStackParam = {
    Home: undefined;
    SignIn: undefined;
    Profile: { id: string };
    DemoFCReduxHook: undefined;
    DemoCollection: undefined;
    DemoRoute: { id: string, isHuman: boolean, sort?: 'latest' | 'top' };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    DemoMap: undefined;
    TestMap: undefined;
    DemoTab: undefined | { screen: string; params: { [key: string]: any } };
    DemoDrawer: undefined | { screen: string; params: { [key: string]: any } };
    DemoNested: undefined | { screen: string; params: { [key: string]: any } };
    DemoRNComponents: undefined;
    DemoShare: undefined;
    DemoTheme: undefined;
    DemoSuspense: undefined;
    DemoBitcoin: undefined | { screen: string; params: { [key: string]: any } };
    Settings: undefined;
};

export type DemoNestedStackParam = {
    NestedHome: undefined;
    NestedSettings: { item: string };
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
    | DemoNestedStackParam
    | DemoTabStackParam
    | DemoTabRNComponentsStackParam
    | DemoBitcoinStackParam
    | DemoDrawerStackParam;

export type StackParamListIntersection =
    RootStackParam
    & DemoNestedStackParam
    & DemoTabStackParam
    & DemoTabRNComponentsStackParam
    & DemoBitcoinStackParam
    & DemoDrawerStackParam;

