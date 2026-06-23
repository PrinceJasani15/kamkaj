import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-96 rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800"
      >
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-3 text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.form>
    </div>
  );
}

export default Login;
