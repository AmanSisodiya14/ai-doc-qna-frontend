import LoadingSpinner from "./LoadingSpinner";

const FileUploader = ({ onUpload, uploading, progress }) => {
  const handleFile = (file) => {
    if (file) onUpload(file);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-soft transition hover:border-brand-500">
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.mp3,.wav,.mp4"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="text-3xl">{uploading ? "⏳" : "⬆️"}</div>
        <p className="text-sm font-medium text-slate-700">
          Drag & drop a file here or click to upload
        </p>
        <p className="text-xs text-slate-500">Accepted: PDF, MP3, WAV, MP4</p>
      </label>

      {uploading && (
        <div className="mt-4 space-y-2">
          <progress
            className="h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-brand-500 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-brand-500"
            value={progress}
            max={100}
          />
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>{progress}%</span>
            <LoadingSpinner size="sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
