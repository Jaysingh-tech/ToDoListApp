import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux-toolkit/slices/auth.slice";
import tasksReducer from "../redux-toolkit/slices/tasks.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
