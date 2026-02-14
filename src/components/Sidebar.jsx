import { Link } from "react-router-dom";

const Sidebar = ({ files, open, onClose, onDelete }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 transition md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-slate-200 bg-white p-4 shadow-soft transition-transform md:static md:w-80 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">History</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {files.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
              No files uploaded yet.
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="group relative flex items-center rounded-xl border border-slate-200 p-3 transition hover:border-brand-500 hover:bg-brand-50"
              >
                <Link
                  to={`/chat/${file.id}`}
                  onClick={onClose}
                  className="flex-1 overflow-hidden"
                >
                  <p className="truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">{file.type}</p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(file.id);
                  }}
                  className="ml-2 hidden rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 group-hover:block"
                  title="Delete file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
