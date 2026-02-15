import { useEffect, useRef, useCallback } from "react";

const VideoPlayer = ({ mediaUrl, startTime, playId, fileType }) => {
  const mediaRef = useRef(null);
  const pendingSeekRef = useRef(null);
  const normalizedType = String(fileType || "").toLowerCase();

  const videoTypes = ["video", "mp4", "webm", "ogg", "avi", "mov", "mkv"];
  const audioTypes = ["audio", "mp3", "wav", "m4a", "aac", "flac"];

  const isVideo = videoTypes.some((type) => normalizedType.includes(type));
  const isAudio = audioTypes.some((type) => normalizedType.includes(type));

  const seekAndPlay = useCallback((targetTime) => {
    const media = mediaRef.current;
    if (!media) return;

    const parsedTime = Number(targetTime);
    if (!Number.isFinite(parsedTime)) return;

    media.pause();

    const duration = media.duration;
    const hasDuration = Number.isFinite(duration) && duration >= 0;

    const clampedTime = hasDuration
      ? Math.min(Math.max(parsedTime, 0), duration)
      : Math.max(parsedTime, 0);

    media.currentTime = clampedTime;

    setTimeout(() => {
      media.play().catch(() => {});
    }, 50);
  }, []);

  // Reset when media changes
  useEffect(() => {
    pendingSeekRef.current = null;
  }, [mediaUrl, fileType]);

  // 🔥 Trigger play when playId changes
  useEffect(() => {
    const media = mediaRef.current;
    if (!media || startTime == null) return;

    if (media.readyState >= 1) {
      seekAndPlay(startTime);
    } else {
      pendingSeekRef.current = Number(startTime);
    }
  }, [playId, startTime, seekAndPlay]); // 👈 playId is the trigger

  const handleLoadedMetadata = () => {
    if (pendingSeekRef.current == null) return;

    seekAndPlay(pendingSeekRef.current);
    pendingSeekRef.current = null;
  };

  if (!mediaUrl || (!isVideo && !isAudio)) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">
        Media Player
      </h3>

      {isVideo ? (
        <video
          ref={mediaRef}
          controls
          className="w-full rounded-xl bg-slate-950"
          src={mediaUrl}
          onLoadedMetadata={handleLoadedMetadata}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <audio
          ref={mediaRef}
          controls
          className="w-full"
          src={mediaUrl}
          onLoadedMetadata={handleLoadedMetadata}
        >
          Your browser does not support audio playback.
        </audio>
      )}
    </section>
  );
};

export default VideoPlayer;
