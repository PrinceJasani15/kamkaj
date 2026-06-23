function ProfileSettings() {
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Profile Settings
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;