import { useContext, useRef } from "react";
import { TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Context as BlogContext } from "../context/BlogContext";

export default <T, Q extends keyof RootStackParamList>(
  goTo: keyof RootStackParamList
) => {
  const { update } = useContext(BlogContext);

  const textInputRef = useRef<TextInput | null>(null);

  const handleNextInput = (input: string): void => {
    input !== "" && textInputRef.current != null
      ? textInputRef.current.focus()
      : null;
  };

  const handleSubmit = (
    navigation: NativeStackScreenProps<RootStackParamList, Q>["navigation"],
    entry: T
  ): void => {
    update.addBlogPost(entry, () => {
      navigation.navigate(goTo);
    });
  };

  return { textInputRef, handleNextInput, handleSubmit };
};
