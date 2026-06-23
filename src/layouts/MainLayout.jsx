import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
return ( <div className="min-h-screen bg-slate-100 dark:bg-slate-900"> <Sidebar />


  <div className="min-h-screen lg:ml-64"> <Navbar />

    <main className="min-h-[calc(100vh-72px)] p-6">
      <Outlet />
    </main>
  </div>
</div>


);
}

export default MainLayout;
