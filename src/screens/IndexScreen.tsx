import React, { useContext, useEffect, VoidFunctionComponent } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import styled from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as BlogContext } from "../context/BlogContext";

const StyledIcon = styled(MaterialIcons)`
  font-size: 28px;
`;

const BlogElement = styled(View)`
  background: #d3d3d3;
  margin: 1px 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
`;

const ElementText = styled(Text)`
  font-size: 16px;
`;

const IndexScreen: VoidFunctionComponent<
  NativeStackScreenProps<RootStackParamList, "Index">
> = ({ navigation }) => {
  const { state, update } = useContext(BlogContext);

  useEffect(() => {
    update.getBlogPost();

    const listener = navigation.addListener("focus", () => {
      update.getBlogPost();
    });

    return listener;
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <BlogElement>
                <ElementText>
                  {item.title} - ID: {item.id}
                </ElementText>
                <Pressable onPress={() => update.removeBlogPost(item.id)}>
                  <StyledIcon name="delete" />
                </Pressable>
              </BlogElement>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default IndexScreen;
