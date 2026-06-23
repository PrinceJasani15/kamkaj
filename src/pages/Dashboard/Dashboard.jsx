import { useEffect, useState } from "react";
import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";

import PageWrapper from "../../components/common/PageWrapper";
import StatCard from "../../components/ui/StatCard";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const { user: authUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loggedInUser =
    authUser ||
    JSON.parse(
      localStorage.getItem("kamkaj_user") || "{}"
    );

  const loadDashboardData = async () => {
    if (!loggedInUser?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setLoadError("");

      const [dashboardResponse, tasksResponse, notesResponse] =
        await Promise.all([
          api.get("/dashboard"),
          api.get("/tasks"),
          api.get("/notes"),
        ]);

      setDashboardData(dashboardResponse.data);
      setTasks(tasksResponse.data);
      setNotes(notesResponse.data);
    } catch (error) {
      console.log(
        "DASHBOARD LOAD ERROR:",
        error.response?.data || error.message
      );

      setDashboardData(null);
      setTasks([]);
      setNotes([]);
      setLoadError(
        "Dashboard data could not load. Showing empty dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser?.id) {
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, [loggedInUser?.id]);

  const stats = dashboardData?.stats || {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    notesCount: 0,
    income: 0,
    totalExpenses: 0,
    balance: 0,
    productivity: 0,
  };

  const upcomingEvents = dashboardData?.upcomingEvents || [];

  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const recentNotes = [...notes]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  const userName = loggedInUser?.name || "KamKaj User";

  const profileComplete =
    loggedInUser?.phone &&
    loggedInUser?.company;

  return (
    <PageWrapper>
      <div className="p-6 dark:text-white">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-500">
              {getGreeting()} 👋
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Welcome back, {userName}
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Here is your live productivity overview.
            </p>

            {!profileComplete && (
              <p className="mt-2 text-sm text-yellow-500">
                Complete your profile by adding phone number and company name.
              </p>
            )}
          </div>

          <button
            onClick={loadDashboardData}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400">
            Loading dashboard...
          </p>
        ) : (
          <>
            {loadError ? (
              <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                {loadError}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Tasks" value={stats.totalTasks} />
              <StatCard title="Completed Tasks" value={stats.completedTasks} />
              <StatCard title="Pending Tasks" value={stats.pendingTasks} />
              <StatCard title="Productivity" value={`${stats.productivity}%`} />
              <StatCard title="Notes" value={stats.notesCount} />
              <StatCard title="Upcoming Events" value={upcomingEvents.length} />
              <StatCard
                title="Total Income"
                value={`₹${Number(stats.income).toLocaleString("en-IN")}`}
              />
              <StatCard
                title="Balance"
                value={`₹${Number(stats.balance).toLocaleString("en-IN")}`}
              />
            </div>

            <div className="mt-8">
              <WelcomeCard
                userName={userName}
                productivity={stats.productivity}
                totalTasks={stats.totalTasks}
                completedTasks={stats.completedTasks}
              />
            </div>

            <div className="mt-6">
              <QuickActions />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
                <h2 className="mb-4 text-2xl font-bold">Recent Tasks</h2>

                {recentTasks.length > 0 ? (
                  <div className="space-y-3">
                    {recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between border-b pb-3 last:border-b-0 dark:border-slate-700"
                      >
                        <span
                          className={
                            task.completed
                              ? "line-through text-slate-400"
                              : ""
                          }
                        >
                          {task.title}
                        </span>

                        <span
                          className={
                            task.completed
                              ? "rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-500"
                              : "rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-500"
                          }
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No tasks available.</p>
                )}
              </div>

              <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
                <h2 className="mb-4 text-2xl font-bold">Recent Notes</h2>

                {recentNotes.length > 0 ? (
                  <div className="space-y-3">
                    {recentNotes.map((note) => (
                      <div
                        key={note.id}
                        className="border-b pb-3 last:border-b-0 dark:border-slate-700"
                      >
                        <p className="font-medium">{note.title}</p>

                        <p className="mt-1 text-sm text-slate-400">
                          {note.category || "General"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No notes available.</p>
                )}
              </div>

              <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
                <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>

                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="border-b pb-3 last:border-b-0 dark:border-slate-700"
                      >
                        <p className="font-medium">{event.title}</p>

                        <p className="mt-1 text-sm text-slate-400">
                          {formatDate(event.event_date)}
                          {event.event_time
                            ? ` • ${event.event_time.slice(0, 5)}`
                            : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No upcoming events.</p>
                )}
              </div>

              <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
                <h2 className="mb-4 text-2xl font-bold">
                  Financial Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Income</span>

                    <span className="font-bold text-emerald-500">
                      +₹{Number(stats.income).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Expenses</span>

                    <span className="font-bold text-red-500">
                      -₹{Number(stats.totalExpenses).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4 dark:border-slate-700">
                    <span className="font-semibold">Balance</span>

                    <span className="text-lg font-bold text-blue-500">
                      ₹{Number(stats.balance).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default Dashboard;
