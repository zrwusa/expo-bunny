import React, {Component} from "react";
import api from "../../common/api";
import {Button, Text, View} from "react-native";
import {DemoEmployee} from "../../types/models";

type Props = { title: string, }
type States = { name: string, employees: Array<DemoEmployee>, }

class DemoRequest extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.getEmployees = this.getEmployees.bind(this);
        this.handleGetSomethingClick = this.handleGetSomethingClick.bind(this);

        this.state = {
            name: "",
            employees: []
        };
    }

    getEmployees(): void {
        api.get(`/employees`)
            .then(res => {
                this.setState({
                    employees: res.data
                });
            })
    }

    handleGetSomethingClick(): void {
        this.getEmployees();
    }

    render(): React.ReactNode {
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>{this.state.name}</Text>
            <Button onPress={this.handleGetSomethingClick} title="Click me to get employees"/>
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
