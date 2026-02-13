import TimestampBadge from "./TimestampBadge";

const ChatMessage = ({ message, onPlayTimestamp }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[70%] ${
          isUser
            ? "bg-brand-500 text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        {!isUser && (message.timestamp === 0 || message.timestamp) ? (
          <div className="mt-2">
            <TimestampBadge
              timestamp={message.timestamp}
              onPlay={onPlayTimestamp}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessage;
