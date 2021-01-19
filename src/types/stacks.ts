export type RootStackParam = {
    Home: undefined;
    SignIn: undefined;
    Profile: { id: string };
    DemoFCReduxHook: undefined;
    DemoCollection: undefined;
    DemoRoute: { id: string ,isHuman:boolean, sort?: 'latest' | 'top' };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    DemoMap: undefined;
    TestMap: undefined;
    DemoTab: undefined;
    DemoNested: undefined;
    DemoRNComponents: undefined;
    DemoShare: undefined;
    DemoTheme: undefined;
    DemoSuspense: undefined;
    DemoBitcoin: undefined | { screen: 'BitcoinAlert'; params: { isPush: boolean } };
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

export type DemoBitcoinStackParam = {
    BitcoinHome: undefined;
    BitcoinAlert: { isPush: boolean };
};

export type DemoTabRNComponentsStackParam = {
    TabRNComponentsHome: undefined;
    TabRNComponentsSettings: undefined;
};
