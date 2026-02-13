import { Link } from "react-router-dom";

const getFileIcon = (type = "") => {
  const normalized = type.toLowerCase();
  if (normalized.includes("pdf")) return "📄";
  if (normalized.includes("audio")) return "🎵";
  if (normalized.includes("video")) return "🎬";
  return "📁";
};

const FileCard = ({ file }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="text-2xl">{getFileIcon(file.type)}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
          {file.typeLabel || file.type}
        </span>
      </div>
      <h3 className="mb-2 text-sm font-semibold text-slate-900">{file.name}</h3>
      <p className="mb-4 text-xs text-slate-500">
        Uploaded: {new Date(file.uploadedAt).toLocaleString()}
      </p>
      <Link
        to={`/chat/${file.id}`}
        className="inline-flex items-center rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
      >
        Open Chat
      </Link>
    </article>
  );
};

export default FileCard;
