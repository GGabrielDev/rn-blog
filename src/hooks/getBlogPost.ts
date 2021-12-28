import { useContext } from "react";
import { Context as BlogContext, BlogDataProps } from "../context/BlogContext";

const emptyBlog = {
  title: "",
  content: "",
  id: 0,
};

export default (id: number): BlogDataProps => {
  const { state } = useContext(BlogContext);

  const output = state.find((value) => value.id === id) as BlogDataProps;

  return output !== undefined ? output : emptyBlog;
};
