import * as React from "react";
import {Redirect, Route, RouteProps,useLocation} from "react-router-native";
import store from "../../stores";

export interface Props extends RouteProps {
    redirectPath: string;
}

export const PrivateRoute: React.FC<Props> = props => {

    // const isAuth = !!localStorage.getItem(`access_token`);
    const isAuth = !!store.getState().userState.user.access_token;

    const location = useLocation();
    if (isAuth) {
        return <Route {...props} />;
    } else {
        return <Route {...props} component={() => <Redirect to={{pathname: props.redirectPath, state: { from: location }}}/>}/>;
    }
};

export default PrivateRoute;

