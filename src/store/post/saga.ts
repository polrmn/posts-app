import { createPost, deletePost, getPosts, updatePost } from "@/lib/api";
import { Post } from "@/types/post";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addPostFailure,
  addPostFulfilled,
  addPostPending,
  deletePostFailure,
  deletePostFulfilled,
  deletePostPending,
  editPostFailure,
  editPostFulfilled,
  editPostPending,
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

function* editPostWorker(action: PayloadAction<Post>) {
  try {
    yield put(editPostPending());
    const updated: Post = yield call(updatePost, action.payload);
    yield put(editPostFulfilled(updated));
  } catch (e: any) {
    yield put(editPostFailure(e.message));
  }
}

function* deletePostWorker(action: PayloadAction<string>) {
  try {
    yield put(deletePostPending());
    yield call(deletePost, action.payload);
    yield put(deletePostFulfilled(action.payload));
  } catch (e: any) {
    yield put(deletePostFailure(e.message));
  }
}

export function* postSaga() {
  yield takeLatest(fetchPostsPending.type, fetchPostsWorker);
  yield takeLatest(addPostPending.type, addPostWorker);
  yield takeLatest(editPostPending.type, editPostWorker);
  yield takeLatest(deletePostPending.type, deletePostWorker);
}
