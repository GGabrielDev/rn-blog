import React, { useEffect, VoidFunctionComponent } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import getBlogPost from "../hooks/getBlogPost";

const ShowScreen: VoidFunctionComponent<
  NativeStackScreenProps<RootStackParamList, "Show">
> = ({ navigation, route }) => {
  const blogPost = getBlogPost(route.params.id);

  useEffect(() => {
    if (blogPost !== undefined)
      navigation.setOptions({ title: blogPost.title });
  }, []);

  return (
    <View>
      {blogPost !== undefined ? (
        <>
          <Text>{blogPost.title}</Text>
          <Text>{blogPost.content}</Text>
        </>
      ) : (
        <Text>Is surprising you actually came here...</Text>
      )}
    </View>
  );
};

export default ShowScreen;
