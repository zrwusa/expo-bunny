import styled from "styled-components/native";
import {Button as ButtonElement} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const TOButton = styled.TouchableOpacity({
    backgroundColor: 'transparent',
    margin: 6,
})

export const Text = styled.Text({
    color: "rgb(38,115,252)",
    fontSize: 16,
})

export const Button = styled.Button({
    backgroundColor: 'transparent',
    margin: 6,
})

export const Title = styled.Text`
  color: #0f0;
  text-align: center;
  font-size: 16px;
`;

export const ButtonE = styled(ButtonElement).attrs({
    buttonStyle: {
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'rgb(38,115,252)'
    },
    containerStyle: {
        width: '100%',
    },
})``;

export const IconStyled = styled(Icon)`
  font-size: 15px;
  color:rgb(38,115,252);
  padding: 10px;
`;
