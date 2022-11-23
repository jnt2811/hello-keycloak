import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: undefined,
  tokens: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    doCheckUser() {},

    updateUser(state, action) {
      state.user = action.payload;
    },

    updateTokens(state, action) {
      state.tokens = action.payload;
    },
  },
});

export const { doCheckUser, updateTokens, updateUser } = authSlice.actions;

export default authSlice.reducer;
