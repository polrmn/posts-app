import { createPost, getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addPostFailure,
  addPostFulfilled,
  addPostPending,
  fetchPostsFailure,
  fetchPostsFulfilled,
  fetchPostsPending,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchPostsWorker() {
  try {
    const posts: Post[] = yield call(getPosts);
    yield put(fetchPostsFulfilled(posts));
  } catch (e) {
    yield put(fetchPostsFailure((e as Error).message));
  }
}

function* addPostWorker(action: PayloadAction<Post>) {
  try {
    const newPost: Post = yield call(createPost, action.payload);
    yield put(addPostFulfilled(newPost));
  } catch (error: any) {
    yield put(addPostFailure(error.message));
  }
}

export function* postSaga() {
  yield takeLatest(fetchPostsPending.type, fetchPostsWorker);
  yield takeLatest(addPostPending.type, addPostWorker);
}
