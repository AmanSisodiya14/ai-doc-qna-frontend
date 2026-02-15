const STORAGE_KEYS = {
  AUTH: "ai_qna_auth",
  FILES: "ai_qna_files",
  CHAT: "ai_qna_chat",
};

const parseJSON = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const loadAuth = () =>
  parseJSON(localStorage.getItem(STORAGE_KEYS.AUTH), {
    token: null,
    user: null,
  });

export const saveAuth = (state) => {
  localStorage.setItem(
    STORAGE_KEYS.AUTH,
    JSON.stringify({
      token: state.token,
      user: state.user,
    })
  );
};

export const loadFiles = () =>
  parseJSON(localStorage.getItem(STORAGE_KEYS.FILES), {
    uploadedFiles: [],
    selectedFile: null,
  });

export const saveFiles = (state) => {
  localStorage.setItem(
    STORAGE_KEYS.FILES,
    JSON.stringify({
      uploadedFiles: state.uploadedFiles,
      selectedFile: state.selectedFile,
    })
  );
};

export const loadChat = () =>
  parseJSON(localStorage.getItem(STORAGE_KEYS.CHAT), {
    messagesByFile: {},
    loadingByFile: {},
    selectedTimestampByFile: {},
    mediaReadyByFile: {},
  });

export const saveChat = (state) => {
  localStorage.setItem(
    STORAGE_KEYS.CHAT,
    JSON.stringify({
      messagesByFile: state.messagesByFile,
      loadingByFile: state.loadingByFile,
      selectedTimestampByFile: state.selectedTimestampByFile,
      mediaReadyByFile: state.mediaReadyByFile,
    })
  );
};

export { STORAGE_KEYS };
