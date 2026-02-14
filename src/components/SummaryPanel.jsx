import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const SummaryPanel = ({ fileId }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!fileId) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/api/files/${fileId}/summary`);
        setSummary(data.data.summary || "No summary available yet.");
      } catch (error) {
        toast.error(error.message);
        setSummary("Failed to load summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [fileId]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-md">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-slate-900">AI Summary</span>
        <span className="text-xs text-slate-500">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <div className="max-h-64 overflow-y-auto border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500">
              <LoadingSpinner size="sm" />
              Loading summary...
            </div>
          ) : (
            <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SummaryPanel;
