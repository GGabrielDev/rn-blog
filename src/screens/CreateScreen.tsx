import React, { useContext, VoidFunctionComponent } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Context as BlogContext, BlogDataProps } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen: VoidFunctionComponent<
  NativeStackScreenProps<RootStackParamList, "Create">
> = ({ navigation }) => {
  const { update } = useContext(BlogContext);

  const handleSubmit = (entry: BlogDataProps): void => {
    update.addBlogPost(entry, () => {
      navigation.navigate("Index");
    });
  };

  return <BlogPostForm handleSubmit={handleSubmit} />;
};

export default CreateScreen;
