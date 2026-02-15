import { useCallback, useEffect, useRef } from "react";

const VideoPlayer = ({ mediaUrl, startTime, fileType }) => {
  const mediaRef = useRef(null);
  const pendingSeekRef = useRef(null);
  const normalizedType = String(fileType || "").toLowerCase();

  // Video extensions and MIME types
  const videoTypes = ["video", "mp4", "webm", "ogg", "avi", "mov", "mkv"];
  const audioTypes = ["audio", "mp3", "wav", "m4a", "aac", "flac"];

  const isVideo = videoTypes.some((type) => normalizedType.includes(type));
  const isAudio = audioTypes.some((type) => normalizedType.includes(type));

  const seekAndPlay = useCallback((targetTime) => {
    const media = mediaRef.current;
    if (!media) return;

    const parsedTime = Number(targetTime);
    if (!Number.isFinite(parsedTime)) return;

    const duration = media.duration;
    const hasDuration = Number.isFinite(duration) && duration >= 0;
    const clampedTime = hasDuration
      ? Math.min(Math.max(parsedTime, 0), duration)
      : Math.max(parsedTime, 0);

    media.currentTime = clampedTime;
    media.play().catch(() => {});
  }, []);

  useEffect(() => {
    pendingSeekRef.current = null;
  }, [mediaUrl, fileType]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || startTime === null || startTime === undefined) return;

    if (media.readyState >= 1) {
      seekAndPlay(startTime);
    } else {
      pendingSeekRef.current = Number(startTime);
    }
  }, [startTime, seekAndPlay]);

  if (!mediaUrl || (!isVideo && !isAudio)) return null;

  const handleLoadedMetadata = () => {
    if (
      pendingSeekRef.current === null ||
      pendingSeekRef.current === undefined
    ) {
      return;
    }
    seekAndPlay(pendingSeekRef.current);
    pendingSeekRef.current = null;
  };

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
