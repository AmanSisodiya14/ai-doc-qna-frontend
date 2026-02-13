import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileReducer from "./fileSlice";
import chatReducer from "./chatSlice";
import { saveAuth, saveChat, saveFiles } from "./storage";

const store = configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer,
    chat: chatReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveAuth(state.auth);
  saveFiles(state.files);
  saveChat(state.chat);
});

export default store;
