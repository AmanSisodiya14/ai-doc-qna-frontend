import { createSlice } from "@reduxjs/toolkit";
import { loadAuth } from "./storage";

const persisted = loadAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: persisted.token,
    user: persisted.user,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
