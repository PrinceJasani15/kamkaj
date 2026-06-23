import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "KamKaj User";

  const formattedName =
    userName.charAt(0).toUpperCase() +
    userName.slice(1);

  const firstLetter = formattedName.charAt(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow dark:bg-slate-800 dark:text-white">
      <h2 className="text-xl font-semibold">
        Welcome Back 👋
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded bg-gray-200 px-3 py-2 dark:bg-slate-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button type="button">🔔</button>

        <div className="hidden text-right sm:block">
          <p className="font-semibold">
            {formattedName}
          </p>

          <p className="max-w-40 truncate text-xs text-slate-500 dark:text-slate-400">
            {user?.email || ""}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
          {firstLetter}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-3 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
