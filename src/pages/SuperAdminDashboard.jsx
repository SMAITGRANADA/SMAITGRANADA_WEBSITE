import React, { useState } from "react";
import SidebarSuperAdmin from "../components/Sidebar/SidebarSuperAdmin";
import Navbar from "../components/Navbar";
import NewsForm from "../components/Form/NewsForm";
import ManagementTable from "../components/ManagementTable";
import QuotesTable from "../components/Table/QoutesTable";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("konten");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <SidebarSuperAdmin
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            {activeMenu === "konten" && <NewsForm />}
            {activeMenu === "manajemen" && <ManagementTable />}
            {activeMenu === "quotes" && <QuotesTable />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
