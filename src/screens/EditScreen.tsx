import React, { useContext, VoidFunctionComponent } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Context as BlogContext, BlogDataProps } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen: VoidFunctionComponent<
  NativeStackScreenProps<RootStackParamList, "Edit">
> = ({ navigation, route }) => {
  const { id } = route.params;
  const { update } = useContext(BlogContext);

  const handleSubmit = (entry: BlogDataProps): void => {
    update.editBlogPost(entry, () => {
      navigation.goBack();
    });
  };

  return <BlogPostForm handleSubmit={handleSubmit} id={id} />;
};

export default EditScreen;
