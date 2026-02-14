import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { clearFiles } from "../redux/fileSlice";
import { clearAllChats } from "../redux/chatSlice";

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFiles());
    dispatch(clearAllChats());
    navigate("/login");
  };

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
            <p className="text-sm font-semibold text-slate-900">
              Doc & Media Q&A
            </p>
            <p className="text-xs text-slate-500">
              Ask anything from your uploaded files
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Dashboard
          </Link>
          {user && (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
