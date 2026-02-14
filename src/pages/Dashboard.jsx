import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { addUploadedFile } from "../redux/fileSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FileUploader from "../components/FileUploader";
import FileCard from "../components/FileCard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadedFiles = useSelector((state) => state.files.uploadedFiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortedFiles = useMemo(
    () =>
      [...uploadedFiles].sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt),
      ),
    [uploadedFiles],
  );

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);

    try {
      const { data } = await api.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (!event.total) return;
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });
      const fileMeta = {
        id: data.data.fileId,
        name: data.data.fileName || file.name,
        type: data.data.fileType || file.type,
        uploadedAt: new Date().toISOString(),
      };

      dispatch(addUploadedFile(fileMeta));
      toast.success("File uploaded successfully");
      navigate(`/chat/${fileMeta.id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="mx-auto flex max-w-7xl gap-4 p-4 sm:p-6">
        <Sidebar
          files={sortedFiles}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onUploadClick={() => document.getElementById("file-upload")?.click()}
        />

        <main className="w-full space-y-4">
          <FileUploader
            onUpload={handleUpload}
            uploading={uploading}
            progress={progress}
          />

          {sortedFiles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-md">
              No files uploaded yet. Use "Upload New File" to start.
            </div>
          ) : (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sortedFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
