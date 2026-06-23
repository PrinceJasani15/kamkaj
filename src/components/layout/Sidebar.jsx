import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

import {
FaTachometerAlt,
FaTasks,
FaStickyNote,
FaProjectDiagram,
FaCalendarAlt,
FaMoneyBillWave,
FaChartBar,
FaCog,
} from "react-icons/fa";

function Sidebar() {
const { user } = useAuth();

const userName = user?.name || "KamKaj User";

const firstLetter = userName
.charAt(0)
.toUpperCase();

const menuItems = [
{
name: "Dashboard",
path: "/dashboard",
icon: <FaTachometerAlt />,
},
{
name: "Tasks",
path: "/tasks",
icon: <FaTasks />,
},
{
name: "Notes",
path: "/notes",
icon: <FaStickyNote />,
},
{
name: "Workflow",
path: "/workflow",
icon: <FaProjectDiagram />,
},
{
name: "Calendar",
path: "/calendar",
icon: <FaCalendarAlt />,
},
{
name: "Expenses",
path: "/expenses",
icon: <FaMoneyBillWave />,
},
{
name: "Analytics",
path: "/analytics",
icon: <FaChartBar />,
},
{
name: "🤖 AI Assistant",
path: "/ai",
icon: <FaUser />,
},
{
name: "Settings",
path: "/settings",
icon: <FaCog />,
},
// {
// name: "Profile",
// path: "/profile",
// icon: <FaUser />,
// },
];

return ( <div
   className="
     fixed
     top-0
     left-0
     z-30
     flex
     h-screen
     w-64
     flex-col
     bg-slate-900
     p-5
     text-white
     dark:bg-black
   "
 > <h1 className="mb-10 text-3xl font-bold">
KamKaj </h1>


  <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
    {menuItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `
          flex
          items-center
          gap-3
          rounded-lg
          p-3
          transition-all
          duration-200
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-800"
          }
          `
        }
      >
        <span className="text-lg">
          {item.icon}
        </span>

        <span>{item.name}</span>
      </NavLink>
    ))}
  </nav>

  <NavLink
    to="/profile"
    className="mt-4 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:bg-slate-700"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
      {firstLetter}
    </div>

    <div className="min-w-0">
      <p className="truncate font-semibold">
        {userName}
      </p>

      <p className="truncate text-xs text-slate-400">
        {user?.email || "No email"}
      </p>
    </div>
  </NavLink>
</div>


);
}

export default Sidebar;
