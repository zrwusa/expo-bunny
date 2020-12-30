import React from "react";
import {Link} from "react-router-native";
import {Text, View} from "react-native";

const DemoNavLinks: React.FunctionComponent = () => {
    return (
        <View>
            <Link to="/"><Text>Home</Text></Link>
            <Link to="/demo-home"><Text>Demo Home</Text></Link>
            <Link to="/demo-route-cate/1"><Text>Demo Route Cate A</Text></Link>
            <Link to="/demo-route-cate/2"><Text>Demo Route Cate B</Text></Link>
            <Link to="/demo-fc-redux-hook"><Text>Demo FC Redux Hook</Text></Link>
            <Link to="/demo-thunk-cc"><Text>Demo Thunk CC</Text></Link>
            <Link to="/demo-redirect"><Text>Demo Redirect</Text></Link>
            <Link to="/demo-third-part"><Text>Demo Third Part</Text></Link>
            <Link to="/login"><Text>Login</Text></Link>
        </View>
    );
}

export default DemoNavLinks;
