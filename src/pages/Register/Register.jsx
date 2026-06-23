import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert("Name, email ane password required che.");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          password: formData.password,
        }
      );

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-white">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full p-3 border rounded mb-4 dark:bg-slate-700 dark:text-white dark:border-slate-600"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full p-3 border rounded mb-4 dark:bg-slate-700 dark:text-white dark:border-slate-600"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Then go to the Login page and log in to your account.
        </p>
      </form>
    </div>
  );
}

export default Register;
