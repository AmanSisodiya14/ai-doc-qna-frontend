import formatTime from "../utils/formatTime";

const ChatMessage = ({ message, onPlayTimestamp }) => {
  const isUser = message.role === "user";
  const parsedStartTime = Number(message.startTime);
  const hasStartTime =
    !isUser && Number.isFinite(parsedStartTime) && parsedStartTime >= 0;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[70%] ${
          isUser
            ? "bg-brand-500 text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        {hasStartTime ? (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {formatTime(parsedStartTime)}
            </span>
            <button
              type="button"
              onClick={() => onPlayTimestamp?.(parsedStartTime)}
              className="inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-brand-600"
            >
              Play
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessage;
