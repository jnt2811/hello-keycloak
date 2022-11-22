import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
