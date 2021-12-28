import React, { useRef, useState, VoidFunctionComponent } from "react";
import { TextInput, View } from "react-native";
import { BlogDataProps } from "../context/BlogContext";
import {
  StyledView,
  BlogInputTitle,
  BlogInputContent,
  BlogButton,
} from "../components/BlogInput";
import getBlogPost from "../hooks/getBlogPost";

type ComponentProps = {
  handleSubmit: (arg0: BlogDataProps) => void;
  id?: number;
};

const BlogPostForm: VoidFunctionComponent<ComponentProps> = ({
  handleSubmit,
  id = 0,
}) => {
  const [entry, setEntry] = useState<BlogDataProps>(getBlogPost(id));

  const contentTextInput = useRef<TextInput | null>(null);

  const handleNextInput = (input: string): void => {
    input !== "" && contentTextInput.current != null
      ? contentTextInput.current.focus()
      : null;
  };

  return (
    <StyledView>
      <View>
        <BlogInputTitle
          onChangeText={setEntry}
          onEndEditing={handleNextInput}
          value={entry}
        />
        <BlogInputContent
          onChangeText={setEntry}
          ref={contentTextInput}
          value={entry}
        />
      </View>
      <BlogButton onPress={handleSubmit} value={entry} />
    </StyledView>
  );
};

export default BlogPostForm;
