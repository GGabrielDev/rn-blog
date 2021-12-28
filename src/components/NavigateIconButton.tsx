import React, { VoidFunctionComponent } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

type NavigateIconButtonProps = {
  iconName: string;
  navigateTo: keyof RootStackParamList;
  optionalParams?: { id: string };
};

const StyledIcon = styled(MaterialIcons)`
  font-size: 30px;
`;

const NavigateIconButton: VoidFunctionComponent<NavigateIconButtonProps> = ({
  iconName,
  navigateTo,
  optionalParams,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate(navigateTo, optionalParams)}>
      <StyledIcon name={iconName} />
    </Pressable>
  );
};

export default NavigateIconButton;
