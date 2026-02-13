import { useEffect, useRef } from "react";

const VideoPlayer = ({ file, timestamp }) => {
  const mediaRef = useRef(null);
  const isVideo = file?.type?.includes("video");
  const isAudio = file?.type?.includes("audio");

  useEffect(() => {
    if (mediaRef.current && (timestamp === 0 || timestamp)) {
      mediaRef.current.currentTime = Number(timestamp);
      mediaRef.current.play().catch(() => {});
    }
  }, [timestamp]);

  if (!file || (!isVideo && !isAudio)) return null;

  const src = file.url || file.previewUrl || "";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Media Player</h3>
      {isVideo ? (
        <video ref={mediaRef} controls className="w-full rounded-xl bg-slate-950" src={src}>
          Your browser does not support video playback.
        </video>
      ) : (
        <audio ref={mediaRef} controls className="w-full" src={src}>
          Your browser does not support audio playback.
        </audio>
      )}
    </section>
  );
};

export default VideoPlayer;
