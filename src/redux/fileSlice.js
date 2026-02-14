import { createSlice } from "@reduxjs/toolkit";
import { loadFiles } from "./storage";

const persisted = loadFiles();

const fileSlice = createSlice({
  name: "files",
  initialState: {
    uploadedFiles: persisted.uploadedFiles || [],
    selectedFile: persisted.selectedFile || null,
  },
  reducers: {
    addUploadedFile: (state, action) => {
      state.uploadedFiles = [action.payload, ...state.uploadedFiles];
    },
    setUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    clearFiles: (state) => {
      state.uploadedFiles = [];
      state.selectedFile = null;
    },
  },
});

export const {
  addUploadedFile,
  setUploadedFiles,
  setSelectedFile,
  clearFiles,
} = fileSlice.actions;
export default fileSlice.reducer;
