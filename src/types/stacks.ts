export type RootStackParam = {
    Home: undefined;
    SignIn: undefined;
    Profile: { id: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
    DemoFCReduxHook: undefined;
    DemoCollection: undefined;
    DemoRoute: { id: string };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    DemoMap: undefined;
    TestMap: undefined;
    DemoTab: undefined;
};

export type DemoTabStackParam = {
    TabHome: undefined;
    TabSettings: { item: string };
};

