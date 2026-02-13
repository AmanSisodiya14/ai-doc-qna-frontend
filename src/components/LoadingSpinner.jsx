const LoadingSpinner = ({ size = "md" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      className={`${
        sizes[size] || sizes.md
      } animate-spin rounded-full border-slate-300 border-t-brand-500`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
