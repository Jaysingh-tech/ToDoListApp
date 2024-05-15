// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  profile: any;
}

const initialState: authState = {
  profile: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // state.value += 1;
      state.profile = { ...action.payload };
    }
  }
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
