import { useEffect, useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Profile() {
  const { login } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/users/profile");

        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          company: response.data.company || "",
        });
      } catch (error) {
        console.log(
          "PROFILE LOAD ERROR:",
          error.response?.data || error.message
        );

        alert(
          error.response?.data?.error ||
            "Profile load nathi thayu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      alert("Name ane email required che.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(
        "/users/profile",
        {
          name: profile.name.trim(),
          email: profile.email.trim(),
          phone: profile.phone.trim(),
          company: profile.company.trim(),
        }
      );

      const updatedUser = response.data;

      setProfile({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        company: updatedUser.company || "",
      });

      localStorage.setItem(
        "kamkaj_user",
        JSON.stringify(updatedUser)
      );

      login(updatedUser);

      alert("Profile Saved Successfully ✅");
    } catch (error) {
      console.log(
        "PROFILE UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Profile save nathi thayu."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="p-6 text-slate-900 dark:text-white">
          Loading profile...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="p-6">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow dark:bg-slate-800 dark:text-white">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold text-white">
              {profile.name
                ? profile.name[0].toUpperCase()
                : "U"}
            </div>

            <h1 className="mt-4 text-3xl font-bold">
              User Profile
            </h1>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={profile.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={profile.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Profile;
