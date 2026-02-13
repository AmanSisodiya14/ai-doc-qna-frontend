import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setCredentials } from "../redux/authSlice";
import api from "../services/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const { data } = await api.post(endpoint, formData);
      console.log("data,", data);
      dispatch(
        setCredentials({
          token: data.data.token,
          user: { email: data.data.email, userId: data.data.userId },
        }),
      );

      // Simulation for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isLogin) {
        toast.success("Login successful");
      } else {
        toast.success("Account created successfully");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left Side - Form Section */}
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 lg:w-5/12 xl:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            {/* Logo placeholder if needed */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
                AI
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                DocQzA
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? "Enter your credentials to access your account."
                : "Get started with your free account today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200 transform active:scale-[0.98]"
              >
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : isLogin ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors focus:outline-none"
              >
                {isLogin ? "Sign up for free" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Visual Section */}
      <div className="hidden w-0 flex-1 lg:block relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-slate-900/90 z-10" />
        {/* Abstract shapes/background since we couldn't generate an image */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div
            className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-purple-600 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-[30%] left-[30%] h-[600px] w-[600px] rounded-full bg-indigo-600 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-20 flex h-full flex-col justify-end p-12 text-white">
          <div className="mb-8">
            <h3 className="mb-4 text-4xl font-bold leading-tight">
              Unlock the power of <br />
              <span className="text-blue-400">Intelligent Documentation</span>
            </h3>
            <p className="text-lg text-gray-300 max-w-lg">
              Streamline your workflow with our advanced AI-driven Q&A platform.
              Get instant answers from your documents and boost productivity.
            </p>
          </div>

          {/* Simple footer/stats */}
          <div className="flex gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold">10k+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Active Users
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Uptime
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
