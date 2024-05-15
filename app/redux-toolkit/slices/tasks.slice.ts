// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  tasks: any;
  updateFormData: any;
}

const initialState: authState = {
  tasks: null,
  updateFormData: {}
};

export const tasksSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTasksDetails: (state, action) => {
      // state.value += 1;
      state.tasks = [...action.payload];
      // const ind = state.tasks?.find(
      //   (obj: any) => obj._id === action.payload?._id
      // );
      // if (~ind) {
      //  ;
      // } else {
      //   state.tasks?.push(action.payload);
      // }
    },
    setEditFormData: (state, action) => {
      state.updateFormData = { ...action.payload };
    },
    createNewTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      console.log("state", state?.tasks);
      const ind = state.tasks?.findIndex(
        (obj: any) => obj._id === action.payload?._id
      );
      if (~ind) {
        state.tasks[ind] = { ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      const ind = state.tasks?.findIndex(
        (obj: any) => obj._id === action.payload
      );
      if (~ind) {
        state.tasks.splice(ind, 1);
      }
    }
  }
});

export const {
  setTasksDetails,
  setEditFormData,
  createNewTask,
  updateTask,
  deleteTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
