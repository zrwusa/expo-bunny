import React, {Component} from "react";
import {RouteComponentProps, Redirect} from "react-router-native";
import {View, Text} from "react-native";

type States = { redirectToReferrer: boolean }

interface Props extends RouteComponentProps<never, never, { from: { pathname: string } }> {
    title?: string;
}

class DemoRedirect extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirectToReferrer: true,
        };
    }

    render(): React.ReactNode {
        const {from} = this.props.location.state ? this.props.location.state : {from: {pathname: ""}};
        if (this.state.redirectToReferrer && from.pathname !== "") {
            return <Redirect to={from}/>
        }
        return (<View>
            <Text>Demo Redirect Page</Text>
            <Text>If not login this page will redirect to login page,After login it will back redirect from login page to here.</Text>
        </View>);
    }
}

export default DemoRedirect;


