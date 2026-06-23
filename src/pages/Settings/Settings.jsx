import { useEffect, useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();
  const { user } = useAuth();
  const aiChatKey = user?.id
    ? `kamkaj_ai_chat_${user.id}`
    : null;

  const [notifications, setNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("kamkaj_settings") || "{}"
    );

    setNotifications(savedSettings.notifications ?? true);
    setTaskReminders(savedSettings.taskReminders ?? true);
    setEventReminders(savedSettings.eventReminders ?? true);
    setWeeklyReport(savedSettings.weeklyReport ?? false);
    setCompactMode(savedSettings.compactMode ?? false);
  }, []);

  // આ function useEffect ની બહાર હોવો જરૂરી છે
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      setMessage("તમારા browser માં notifications supported નથી.");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setMessage("✅ Browser notifications enabled.");
      return true;
    }

    setMessage("Notification permission allow કરવી પડશે.");
    return false;
  };

  const saveSettings = () => {
    const settings = {
      notifications,
      taskReminders,
      eventReminders,
      weeklyReport,
      compactMode,
    };

    localStorage.setItem(
      "kamkaj_settings",
      JSON.stringify(settings)
    );

    setMessage("✅ Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const clearAIChat = () => {
    if (aiChatKey) {
      localStorage.removeItem(aiChatKey);
    }

    setMessage("✅ AI chat history cleared.");
  };

  const clearLocalData = () => {
    const confirmClear = window.confirm(
      "Are you sure? This will clear local settings and AI chat history."
    );

    if (!confirmClear) return;

    localStorage.removeItem("kamkaj_settings");

    if (aiChatKey) {
      localStorage.removeItem(aiChatKey);
    }

    setNotifications(true);
    setTaskReminders(true);
    setEventReminders(true);
    setWeeklyReport(false);
    setCompactMode(false);

    setMessage("✅ Local settings reset successfully.");
  };

  const Toggle = ({ checked, onChange }) => {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  };

  const handleNotificationToggle = async (value) => {
    if (value) {
      const allowed = await requestNotificationPermission();
      setNotifications(allowed);
    } else {
      setNotifications(false);
      setMessage("Notifications disabled.");
    }
  };

  const sendTestNotification = async () => {
    if (!notifications) {
      setMessage("પહેલા Enable Notifications ચાલુ કરો.");
      return;
    }

    const allowed = await requestNotificationPermission();

    if (!allowed) return;

    new Notification("KamKaj 🔔", {
      body: "તમારી notifications perfectly કામ કરે છે!",
    });

    setMessage("✅ Test notification sent.");
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl p-6 text-slate-900 dark:text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your KamKaj preferences and application settings.
          </p>
        </div>

        {message ? (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-300">
            {message}
          </div>
        ) : null}

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-bold">Appearance</h2>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Switch between light and dark application themes.
                </p>
              </div>

              <Toggle checked={darkMode} onChange={setDarkMode} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Use a more compact layout for cards and content.
                </p>
              </div>

              <Toggle
                checked={compactMode}
                onChange={setCompactMode}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-bold">Notifications</h2>

            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Receive important KamKaj updates and reminders.
                  </p>
                </div>

                <Toggle
                  checked={notifications}
                  onChange={handleNotificationToggle}
                />
              </div>

              <button
                type="button"
                onClick={sendTestNotification}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Send Test Notification
              </button>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">Task Reminders</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Get reminders for pending and due tasks.
                  </p>
                </div>

                <Toggle
                  checked={taskReminders}
                  onChange={setTaskReminders}
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">Event Reminders</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Receive reminders for upcoming calendar events.
                  </p>
                </div>

                <Toggle
                  checked={eventReminders}
                  onChange={setEventReminders}
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">
                    Weekly Productivity Report
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Save preference for weekly productivity summaries.
                  </p>
                </div>

                <Toggle
                  checked={weeklyReport}
                  onChange={setWeeklyReport}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-bold">Data & Privacy</h2>

            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">AI Chat History</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Clear saved AI conversations from this browser.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearAIChat}
                  className="rounded-lg border border-blue-500/50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-500/10 dark:text-blue-300"
                >
                  Clear AI Chat
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-medium">Reset Local Preferences</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Reset settings stored only in this browser.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearLocalData}
                  className="rounded-lg border border-orange-500/50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-500/10 dark:text-orange-300"
                >
                  Reset Preferences
                </button>
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={saveSettings}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Settings;
