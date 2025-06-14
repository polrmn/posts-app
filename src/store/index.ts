import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import postReducer from "./post/slice";
import { postSaga } from "./post/saga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (gDM) => gDM({ thunk: false }).concat(saga),
});

saga.run(postSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
