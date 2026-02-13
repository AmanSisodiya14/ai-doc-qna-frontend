import formatTime from "../utils/formatTime";

const TimestampBadge = ({ timestamp, onPlay }) => {
  if (timestamp === undefined || timestamp === null) return null;

  return (
    <button
      type="button"
      onClick={() => onPlay?.(timestamp)}
      className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
    >
      <span>{formatTime(timestamp)}</span>
      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] text-white">
        Play
      </span>
    </button>
  );
};

export default TimestampBadge;
