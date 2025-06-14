import { RootState } from "..";

export const getPosts = (state: RootState) => state.post.posts;
export const getIsLoading = (state: RootState) => state.post.isLoading;
export const getError = (state: RootState) => state.post.error;
