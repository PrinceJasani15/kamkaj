function LanguageSettings() {
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Language
      </h2>

      <select
        className="
        w-full
        p-3
        border
        rounded-lg
        dark:bg-slate-700
        dark:border-slate-600
        "
      >
        <option>
          English
        </option>

        <option>
          Hindi
        </option>

        <option>
          Gujarati
        </option>
      </select>
    </div>
  );
}

export default LanguageSettings;