import { useTheme } from "../../context/ThemeContext";

function ThemeSettings() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Theme Settings
      </h2>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-slate-900 text-white px-5 py-2 rounded-lg"
      >
        {darkMode
          ? "Switch to Light Mode"
          : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default ThemeSettings;