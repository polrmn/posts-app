import { posts } from "./../../../node_modules/@reduxjs/toolkit/src/query/tests/mocks/handlers";
import { Post } from "@/types/post";
import { PostInput } from "@/validation/postSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsPending: (state) => {
      state.isLoading = true;
    },
    fetchPostsFulfilled: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addPostPending: (state, action: PayloadAction<PostInput>) => {
      state.isLoading = true;
    },
    addPostFulfilled: (state, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    addPostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    editPostPending: (state, action: PayloadAction<Post>) => {
      state.isLoading = true;
    },
    editPostFulfilled: (state, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    editPostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deletePostPending: (state) => {
      state.isLoading = true;
    },
    deletePostFulfilled: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    deletePostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsPending,
  fetchPostsFulfilled,
  fetchPostsFailure,
  addPostPending,
  addPostFulfilled,
  addPostFailure,
  editPostPending,
  editPostFulfilled,
  editPostFailure,
  deletePostPending,
  deletePostFulfilled,
  deletePostFailure,
} = postSlice.actions;

export default postSlice.reducer;
