export type RootStackParamList = {
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
};
