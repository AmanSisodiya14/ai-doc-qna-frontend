import { createSlice } from "@reduxjs/toolkit";
import { loadChat } from "./storage";

const persisted = loadChat();

const hasValue = (value) => value === 0 || Boolean(value);

const normalizeMessage = (message = {}) => {
  const { timestamp, ...rest } = message;
  const normalizedStartTime = hasValue(rest.startTime)
    ? Number(rest.startTime)
    : hasValue(timestamp)
      ? Number(timestamp)
      : null;
  const normalizedEndTime = hasValue(rest.endTime)
    ? Number(rest.endTime)
    : null;

  return {
    ...rest,
    startTime: Number.isFinite(normalizedStartTime)
      ? normalizedStartTime
      : null,
    endTime: Number.isFinite(normalizedEndTime) ? normalizedEndTime : null,
  };
};

const normalizeMessagesByFile = (messagesByFile = {}) =>
  Object.fromEntries(
    Object.entries(messagesByFile).map(([fileId, messages]) => [
      fileId,
      Array.isArray(messages) ? messages.map(normalizeMessage) : [],
    ]),
  );

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messagesByFile: normalizeMessagesByFile(persisted.messagesByFile),
    loadingByFile: persisted.loadingByFile || {},
    selectedTimestampByFile: persisted.selectedTimestampByFile || {},
  },
  reducers: {
    setMessagesForFile: (state, action) => {
      const { fileId, messages } = action.payload;
      state.messagesByFile[fileId] = (messages || []).map(normalizeMessage);
    },
    addMessage: (state, action) => {
      const { fileId, message } = action.payload;
      if (!state.messagesByFile[fileId]) {
        state.messagesByFile[fileId] = [];
      }
      state.messagesByFile[fileId].push(normalizeMessage(message));
    },
    setChatLoading: (state, action) => {
      const { fileId, loading } = action.payload;
      state.loadingByFile[fileId] = loading;
    },
    setSelectedTimestamp: (state, action) => {
      const { fileId, timestamp } = action.payload;

      if (timestamp === null || timestamp === undefined) {
        state.selectedTimestampByFile[fileId] = null;
        return;
      }

      const parsed = Number(timestamp);

      if (Number.isFinite(parsed) && parsed >= 0) {
        state.selectedTimestampByFile[fileId] = {
          timestamp: parsed,
          playId: Date.now(), // 🔥 always new trigger
        };
      } else {
        state.selectedTimestampByFile[fileId] = null;
      }
    },

    clearChatForFile: (state, action) => {
      const fileId = action.payload;
      state.messagesByFile[fileId] = [];
      state.loadingByFile[fileId] = false;
      state.selectedTimestampByFile[fileId] = null;
    },
    clearAllChats: (state) => {
      state.messagesByFile = {};
      state.loadingByFile = {};
      state.selectedTimestampByFile = {};
    },
  },
});

export const {
  setMessagesForFile,
  addMessage,
  setChatLoading,
  setSelectedTimestamp,
  clearChatForFile,
  clearAllChats,
} = chatSlice.actions;
export default chatSlice.reducer;
