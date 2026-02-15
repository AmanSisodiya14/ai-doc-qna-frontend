import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import SummaryPanel from "../components/SummaryPanel";
import VideoPlayer from "../components/VideoPlayer";
import api from "../services/api";
import { setSelectedFile, removeUploadedFile } from "../redux/fileSlice";
import {
  addMessage,
  setChatLoading,
  setSelectedTimestamp,
  clearChatForFile,
} from "../redux/chatSlice";

const toNullableNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildMessage = (role, content, startTime = null, endTime = null) => ({
  id: crypto.randomUUID(),
  role,
  content,
  startTime,
  endTime,
  createdAt: Date.now(),
});

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadedFiles = useSelector((state) => state.files.uploadedFiles);
  const messages = useSelector(
    (state) => state.chat.messagesByFile[fileId] || [],
  );
  const loading = useSelector(
    (state) => state.chat.loadingByFile[fileId] || false,
  );
  const selectedTimestampObj = useSelector(
    (state) => state.chat.selectedTimestampByFile[fileId] ?? null,
  );

  const currentFile = useMemo(
    () => uploadedFiles.find((file) => String(file.id) === String(fileId)),
    [uploadedFiles, fileId],
  );
  const mediaUrl = useMemo(() => currentFile?.mediaUrl || "", [currentFile]);
  const fileType = currentFile?.type || currentFile?.fileType || "";

  const hasTimestamps = useMemo(
    () =>
      messages.some((msg) => {
        const startTime = Number(msg.startTime);
        const endTime = Number(msg.endTime);
        return (
          (Number.isFinite(startTime) && startTime !== 0) ||
          (Number.isFinite(endTime) && endTime !== 0)
        );
      }),
    [messages],
  );

  const [activeFileId, setActiveFileId] = useState(null);

  useEffect(() => {
    if (fileId && fileId !== activeFileId) {
      dispatch(setSelectedTimestamp({ fileId, timestamp: null }));
      setActiveFileId(fileId);
    }
  }, [fileId, activeFileId, dispatch]);

  useEffect(() => {
    if (currentFile) {
      dispatch(setSelectedFile(currentFile));
    }
  }, [currentFile, dispatch]);

  const handleSend = async (text) => {
    const userMessage = buildMessage("user", text);
    dispatch(addMessage({ fileId, message: userMessage }));
    dispatch(setChatLoading({ fileId, loading: true }));

    try {
      const { data } = await api.post("/api/chat", {
        fileId,
        message: text,
      });

      const responseData = data?.data || {};
      const startTime =
        responseData.startTime ?? responseData.timestamp ?? null;
      const endTime = responseData.endTime ?? null;
      const aiMessage = buildMessage(
        "assistant",
        responseData.answer || "No answer returned.",
        startTime,
        endTime,
      );

      dispatch(addMessage({ fileId, message: aiMessage }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setChatLoading({ fileId, loading: false }));
    }
  };

  if (!currentFile) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 text-center text-slate-600">
        File not found. Please upload a file from the dashboard first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="mx-auto flex max-w-7xl gap-4 p-4 sm:p-6">
        <Sidebar
          files={uploadedFiles}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onDelete={(id) => {
            if (window.confirm("Are you sure you want to delete this file?")) {
              dispatch(removeUploadedFile(id));
              dispatch(clearChatForFile(id));
              toast.success("File deleted successfully");
              if (id === fileId) {
                navigate("/dashboard");
              }
            }
          }}
        />

        <main className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <ChatWindow
              messages={messages}
              loading={loading}
              onPlayTimestamp={(timestamp) => {
                console.log("timestamp", timestamp);
                dispatch(setSelectedTimestamp({ fileId, timestamp }));
              }}
            />
            <MessageInput onSend={handleSend} disabled={loading} />
          </section>

          <aside className="space-y-4">
            <SummaryPanel fileId={fileId} />
            {hasTimestamps && (
              <VideoPlayer
                mediaUrl={mediaUrl}
                startTime={
                  fileId === activeFileId
                    ? selectedTimestampObj?.timestamp
                    : null
                }
                playId={selectedTimestampObj?.playId}
                fileType={fileType}
              />
            )}
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
