import {createStackNavigator} from "@react-navigation/stack";

type RootStackParamList = {
    Home: undefined;
    Profile: { id: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
    DemoFCReduxHook: undefined;
    DemoHome: undefined;
    DemoRoute: { id: string };
    DemoThirdPart: undefined;
    DemoThunkCC: undefined;
    SignIn: undefined;
};

export {RootStackParamList};

const RootStack = createStackNavigator<RootStackParamList>();

export default RootStack;

