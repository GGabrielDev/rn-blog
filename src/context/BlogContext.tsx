import { Reducer, Dispatch } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

export type BlogDataProps = Record<"title" | "content", string> & {
  id: number;
};

export type ReducerAction = {
  type: string;
  payload?: any;
};

export type ReducerCaller<T> = (
  arg0: Dispatch<T>
) => (...args: any | undefined) => void;

const blogReducer: Reducer<BlogDataProps[], ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "get_blogpost":
      return action.payload;
    case "edit_blogpost":
      return state.map((value) =>
        value.id == action.payload.id ? action.payload : value
      );
    case "remove_blogpost":
      return state.filter((value) => value.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPost: ReducerCaller<ReducerAction> = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogpost", payload: response.data });
  };
};

const addBlogPost: ReducerCaller<ReducerAction> = () => {
  return async (entry: BlogDataProps, callback: () => void) => {
    await jsonServer.post("/blogposts", {
      title: entry.title,
      content: entry.content,
    });
    callback();
  };
};

const editBlogPost: ReducerCaller<ReducerAction> = (dispatch) => {
  return async (entry: BlogDataProps, callback: () => void) => {
    console.log(entry);
    await jsonServer.put(`/blogposts/${entry.id}`, {
      title: entry.title,
      content: entry.content,
    });
    dispatch({ type: "edit_blogpost", payload: entry });
    callback();
  };
};

const removeBlogPost: ReducerCaller<ReducerAction> = (dispatch) => {
  return async (id: number) => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "remove_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext<
  BlogDataProps[],
  ReducerAction,
  ReducerCaller<ReducerAction>
>(blogReducer, [], {
  addBlogPost,
  removeBlogPost,
  editBlogPost,
  getBlogPost,
});
