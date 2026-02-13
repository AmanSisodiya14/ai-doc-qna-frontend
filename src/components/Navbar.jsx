const Navbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          >
            ☰
          </button>
          <div className="h-9 w-9 rounded-xl bg-brand-500 text-center text-lg leading-9 text-white shadow-md">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Doc & Media Q&A</p>
            <p className="text-xs text-slate-500">
              Ask anything from your uploaded files
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
