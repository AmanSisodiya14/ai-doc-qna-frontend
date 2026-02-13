import { createSlice } from "@reduxjs/toolkit";
import { loadChat } from "./storage";

const persisted = loadChat();

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messagesByFile: persisted.messagesByFile || {},
    loadingByFile: persisted.loadingByFile || {},
  },
  reducers: {
    setMessagesForFile: (state, action) => {
      const { fileId, messages } = action.payload;
      state.messagesByFile[fileId] = messages;
    },
    addMessage: (state, action) => {
      const { fileId, message } = action.payload;
      if (!state.messagesByFile[fileId]) {
        state.messagesByFile[fileId] = [];
      }
      state.messagesByFile[fileId].push(message);
    },
    setChatLoading: (state, action) => {
      const { fileId, loading } = action.payload;
      state.loadingByFile[fileId] = loading;
    },
    clearChatForFile: (state, action) => {
      const fileId = action.payload;
      state.messagesByFile[fileId] = [];
      state.loadingByFile[fileId] = false;
    },
  },
});

export const { setMessagesForFile, addMessage, setChatLoading, clearChatForFile } =
  chatSlice.actions;
export default chatSlice.reducer;
