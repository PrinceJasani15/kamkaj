import { useEffect, useState } from "react";
import api from "../../services/api";

import PageWrapper from "../../components/common/PageWrapper";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import TaskChart from "../../components/analytics/TaskChart";
import ExpenseChart from "../../components/analytics/ExpenseChart";

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);

      const [
        dashboardResponse,
        tasksResponse,
        eventsResponse,
      ] = await Promise.all([
        api.get("/dashboard"),
        api.get("/tasks"),
        api.get("/events"),
      ]);

      setDashboardData(dashboardResponse.data);
      setTasks(tasksResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.log(
        "ANALYTICS LOAD ERROR:",
        error.response?.data || error.message
      );

      alert("Analytics data load nathi thai.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, []);

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

  return (
    <PageWrapper>
      <div className="p-6 dark:text-white">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Analytics Dashboard
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Live productivity and financial overview
            </p>
          </div>

          <button
            onClick={loadAnalyticsData}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400">
            Loading analytics...
          </p>
        ) : (
          <>
            <div className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <AnalyticsCard
                title="Total Tasks"
                value={stats.totalTasks}
              />

              <AnalyticsCard
                title="Productivity"
                value={`${stats.productivity}%`}
              />

              <AnalyticsCard
                title="Notes"
                value={stats.notesCount}
              />

              <AnalyticsCard
                title="Events"
                value={events.length}
              />

              <AnalyticsCard
                title="Income"
                value={`₹${Number(stats.income).toLocaleString("en-IN")}`}
              />

              <AnalyticsCard
                title="Expenses"
                value={`₹${Number(stats.totalExpenses).toLocaleString("en-IN")}`}
              />

              <AnalyticsCard
                title="Balance"
                value={`₹${Number(stats.balance).toLocaleString("en-IN")}`}
              />

              <AnalyticsCard
                title="Completed"
                value={stats.completedTasks}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <TaskChart
                completed={stats.completedTasks}
                pending={stats.pendingTasks}
              />

              <ExpenseChart
                income={Number(stats.income)}
                expense={Number(stats.totalExpenses)}
              />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-3 text-xl font-bold">
                Quick Report
              </h2>

              <p className="text-slate-500 dark:text-slate-400">
                You have completed{" "}
                <span className="font-semibold text-emerald-500">
                  {stats.completedTasks}
                </span>{" "}
                out of{" "}
                <span className="font-semibold">
                  {stats.totalTasks}
                </span>{" "}
                tasks. Your current productivity is{" "}
                <span className="font-semibold text-blue-500">
                  {stats.productivity}%
                </span>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default Analytics;
