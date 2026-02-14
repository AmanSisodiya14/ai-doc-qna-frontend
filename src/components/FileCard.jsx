import { Link } from "react-router-dom";

const getFileIcon = (type = "") => {
  const normalized = type.toLowerCase();
  if (normalized.includes("pdf")) return "📄";
  if (normalized.includes("audio")) return "🎵";
  if (normalized.includes("video")) return "🎬";
  return "📁";
};

const FileCard = ({ file, onDelete }) => {
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
      <div className="flex items-center justify-between">
        <Link
          to={`/chat/${file.id}`}
          className="inline-flex items-center rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Open Chat
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(file.id);
          }}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Delete file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default FileCard;
