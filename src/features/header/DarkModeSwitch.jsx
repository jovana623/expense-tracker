import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="sr-only peer"
      />
      <div className="w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300" />
      <div
        className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 transform ${
          darkMode ? "translate-x-6" : ""
        }`}
      >
        {darkMode ? (
          <FiMoon className="text-blue-400" size={16} />
        ) : (
          <FiSun className="text-yellow-500" size={16} />
        )}
      </div>
    </label>
  );
}

export default DarkModeSwitch;
