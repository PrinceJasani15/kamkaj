import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Notes from "./pages/Notes/Notes";
import Kamkaj from "./pages/kamkaj/Kamkaj";
import Calendar from "./pages/calendar/Calendar";
import Expenses from "./pages/Expenses/Expenses";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import AI from "./pages/AI/AI";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
return ( <Routes>
{/* Public pages */}
<Route path="/kamkaj" element={<Landing />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


  {/* Protected application layout */}
  <Route
    element={
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    }
  >

    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="/workflow" element={<KamKaj />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/ai" element={<AI />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<Profile />} />
  </Route>

  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>


);
}

export default App;
