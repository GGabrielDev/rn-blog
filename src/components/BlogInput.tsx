import React, {
  forwardRef,
  Dispatch,
  ForwardedRef,
  SetStateAction,
} from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import styled from "styled-components";
import { BlogDataProps } from "../context/BlogContext";

const StyledText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: gray;
  margin: 4px;
  padding: 0 4px;
`;

const StyledInput = styled(TextInput)`
  font-size: 16px;
  border-color: gray;
  border-bottom-width: 2px;
  margin: 4px;
  padding: 0 4px;
`;

const Button = styled(Pressable)`
  padding: 8px;
  margin: 32px 0;
  background: green;
  width: 240px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const StyledView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    justifyContent: "space-between",
  },
}))``;

type InputProps<T> = {
  onChangeText: Dispatch<SetStateAction<any>>;
  onEndEditing?: (arg0: any) => void;
  value: T;
};

type ButtonProps<T> = {
  placeholder?: string;
  onPress: (arg0: T) => void;
  value: T;
};

export const BlogInputTitle = <T extends BlogDataProps>({
  onChangeText,
  onEndEditing,
  value,
}: InputProps<T>): JSX.Element => {
  return (
    <>
      <StyledText>Blog Title:</StyledText>
      <StyledInput
        autoFocus
        value={value.title}
        onChangeText={(text) => onChangeText({ ...value, title: text })}
        onEndEditing={() => onEndEditing(value.title)}
      />
    </>
  );
};

const BlogInputContentInner = <T extends BlogDataProps>(
  { onChangeText, value }: InputProps<T>,
  ref: ForwardedRef<TextInput>
): JSX.Element => {
  return (
    <>
      <StyledText>Blog Content:</StyledText>
      <StyledInput
        multiline
        textAlignVertical="top"
        value={value.content}
        onChangeText={(text) => onChangeText({ ...value, content: text })}
        ref={ref}
      />
    </>
  );
};

export const BlogInputContent = forwardRef(BlogInputContentInner);

export const BlogButton = <T extends BlogDataProps>({
  placeholder = "Submit",
  onPress,
  value,
}: ButtonProps<T>): JSX.Element => {
  return (
    <Button onPress={() => onPress(value)}>
      <ButtonText>{placeholder}</ButtonText>
    </Button>
  );
};
