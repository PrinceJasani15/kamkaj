import { useState } from "react";

function NotificationSettings() {
  const [emailNotif, setEmailNotif] =
    useState(true);

  const [pushNotif, setPushNotif] =
    useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Notifications
      </h2>

      <div className="space-y-3">
        <label className="flex justify-between">
          Email Notifications

          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() =>
              setEmailNotif(!emailNotif)
            }
          />
        </label>

        <label className="flex justify-between">
          Push Notifications

          <input
            type="checkbox"
            checked={pushNotif}
            onChange={() =>
              setPushNotif(!pushNotif)
            }
          />
        </label>
      </div>
    </div>
  );
}

export default NotificationSettings;