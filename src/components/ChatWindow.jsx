import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "./LoadingSpinner";

const ChatWindow = ({ messages, loading, onPlayTimestamp }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <section className="flex h-[60vh] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-md md:h-[70vh]">
      <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
            Ask your first question about this file.
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onPlayTimestamp={onPlayTimestamp}
            />
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              <LoadingSpinner size="sm" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatWindow;
