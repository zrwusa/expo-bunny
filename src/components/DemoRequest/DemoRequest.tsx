import React, {Component} from "react";
import api from "../../utils/api";
import {View, Text, ButtonTO, TextBtn} from "../UI";
import {DemoEmployee} from "../../types/models";

type Props = { title: string, buttonTitle: string }
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
            const res = await api.get(`/employees`);
            if (res) {
                employees = res.data;
                this.setState({employees: employees});
            }

        } catch (e) {
            employees = [{email: "dummy email", first_name: "dummy first name,request failed"}];
        }

    }


    render(): React.ReactNode {
        const {buttonTitle} = this.props;
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>{this.state.name}</Text>
            <ButtonTO onPress={this.getEmployees}><TextBtn>{buttonTitle}</TextBtn></ButtonTO>
            <View>
                {this.state.employees.map((employee) =>
                    <Text key={employee.id}>
                        {employee.first_name}
                    </Text>
                )}
            </View>
        </View>);
    }
}

export default DemoRequest;
