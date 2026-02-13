import { useEffect, useMemo, useState } from "react";
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
import { setSelectedFile } from "../redux/fileSlice";
import { addMessage, setChatLoading } from "../redux/chatSlice";

const buildMessage = (role, content, timestamp) => ({
  id: crypto.randomUUID(),
  role,
  content,
  timestamp,
  createdAt: Date.now(),
});

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(null);
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadedFiles = useSelector((state) => state.files.uploadedFiles);
  const messages = useSelector((state) => state.chat.messagesByFile[fileId] || []);
  const loading = useSelector((state) => state.chat.loadingByFile[fileId] || false);

  const currentFile = useMemo(
    () => uploadedFiles.find((file) => String(file.id) === String(fileId)),
    [uploadedFiles, fileId]
  );

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

      const aiMessage = buildMessage(
        "assistant",
        data.answer || "No answer returned.",
        data.timestamp === 0 || data.timestamp ? data.timestamp : undefined
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
          onUploadClick={() => navigate("/dashboard")}
        />

        <main className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <ChatWindow
              messages={messages}
              loading={loading}
              onPlayTimestamp={(ts) => setActiveTimestamp(ts)}
            />
            <MessageInput onSend={handleSend} disabled={loading} />
          </section>

          <aside className="space-y-4">
            <SummaryPanel fileId={fileId} />
            <VideoPlayer file={currentFile} timestamp={activeTimestamp} />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
