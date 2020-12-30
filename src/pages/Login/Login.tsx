import React, {Component} from "react";
import {RouteComponentProps, Redirect} from "react-router-native";
import {IRootState} from "../../stores/models";
import {IThunkDispatch} from "../../stores/thunk";
import {ILogoutPayload, IReqLoginPayload} from "../../stores/user/payloads";
import {loginAction, logoutAction} from "../../stores/user/actions";
import {connect} from "react-redux";
import {View, Text, TextInput,Button} from "react-native";

const mapStateToProps = (rootState: IRootState) => ({access_token: rootState.userState.user.access_token});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
    loginAction: (data: IReqLoginPayload) => dispatch(loginAction(data)),
    logoutAction: (data: ILogoutPayload) => dispatch(logoutAction(data)),
});

interface PropsWithRouteProps extends RouteComponentProps<never, never, { from: { pathname: string } }> {
    title?: string;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & PropsWithRouteProps;
type States = { name: string; email: string; password: string;redirectToReferrer: boolean }

class Login extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: "",
            email: "bruno@email.com",
            password: "bruno",
            redirectToReferrer: false,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleEmailChange(value: string): void {
        this.setState({email: value});
    }

    handlePasswordChange(value: string): void {
        this.setState({password: value});
    }

    handleLogin(): void {
        const {email, password} = this.state
        this.props.loginAction({email, password})
            .then(() => {
                this.setState({redirectToReferrer: true})
            });
    }

    handleLogout(): void {
        const {email} = this.state
        this.props.logoutAction({email});
    }

    render(): React.ReactNode {
        const {from} = this.props.location.state ? this.props.location.state : {from: {pathname: ""}};
        const {access_token} = this.props;
        if (this.state.redirectToReferrer && from.pathname !== "") {
            return <Redirect to={from}/>
        }
        return (<View>
            <Text>Login Page</Text>
            <TextInput value={this.state.email}
                   onChangeText={(text) =>
                       this.handleEmailChange(text)
                   }
            />
            <TextInput value={this.state.password}
                   onChangeText={(text) =>
                       this.handlePasswordChange(text)
                   }/>
            <Button onPress={this.handleLogin} title={"Login"} />
            <Button onPress={this.handleLogout} title={"Logout"} />

            <Text>{access_token}</Text>
            <Text>This demo shows you how to use a Private Redirect Component to redirect from an unauthorized page to this Login Page.And after
                authorizing this will automatically redirect to original page.</Text>
        </View>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


