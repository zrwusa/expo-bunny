import React, {Component} from "react";
import api from "../../common/api";
import {Button, Text, View} from "react-native";
import {DemoEmployee} from "../../types/models";

type Props = { title: string, }
type States = { name: string, employees: Array<DemoEmployee>, }

class DemoRequest extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: "",
            employees: []
        };
        this.getEmployees = this.getEmployees.bind(this);
    }

    async getEmployees() {
        let employees;
        try {
            const res = await api.get(`/employees`)
            employees = res.data;
        } catch (e) {
            employees = [{email: "dummy email", first_name: "dummy first name,request failed"}];
        }
        this.setState({employees: employees});
    }


    render(): React.ReactNode {
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>{this.state.name}</Text>
            <Button onPress={this.getEmployees} title="Click me to get employees"/>
            <View>
                {this.state.employees.map((employee) =>
                    <Text key={employee.email.toString()}>
                        {employee.first_name}
                    </Text>
                )}
            </View>
        </View>);
    }
}

export default DemoRequest;