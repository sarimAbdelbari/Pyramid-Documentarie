import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThin, PiTreeViewThin } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { CiViewTable } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { TbRouteScan } from "react-icons/tb";
import { MdOutlineLocalPolice } from "react-icons/md";
import axios from "axios";

export default function Sidebar() {
  const [dropdowns, setDropdowns] = useState({
    users: false,
    routes: false,
    permissions: false,
  });

  const location = useLocation();

  useEffect(() => {
    const storedDropdowns = JSON.parse(localStorage.getItem("dropdowns"));
    if (storedDropdowns) {
      setDropdowns(storedDropdowns);
    }
  }, []);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("dropdowns", JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`flex items-center gap-4 text-xs lg:text-sm p-4 rounded-lg transition-all ${
        isActive(to)
          ? "bg-gray-200 text-black "
          : "text-gray-700 hover:bg-gray-300 w-full"
      }`}
    >
      <span className="p-2 bg-gray-100 rounded-full">
        <Icon size={18} className="text-gray-600" />
      </span>
      {label}
    </Link>
  );

  const Dropdown = ({ label, icon: Icon, items, dropdownKey }) => (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => toggleDropdown(dropdownKey)}
        className={`flex justify-between items-center p-4 rounded-lg transition-all ${
          dropdowns[dropdownKey]
            ? "bg-gray-200 text-black"
            : "text-gray-700 hover:bg-gray-300 w-full"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="p-2 bg-gray-100 rounded-full">
            <Icon size={18} className="text-gray-600" />
          </span>
          {label}
        </div>
        {dropdowns[dropdownKey] ? <FaChevronDown /> : <FaChevronRight />}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          dropdowns[dropdownKey] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col pl-6 gap-2">
          {items.map((item) => (
            <NavLink key={item.label} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="text-gray-800 h-full p-2 lg:p-5  flex flex-col justify-between border-r text-nowrap border-gray-200">
      <div>
        <p className="text-lg font-semibold mb-4 text-gray-600">Dashboard</p>
        <div className="space-y-2">
          <NavLink to="/dashboard/TableauDeBord" icon={RxDashboard} label="Tableau de bord" />
          <Dropdown
            label="Utilisateurs"
            icon={PiUsersThin}
            dropdownKey="users"
            items={[
              { to: "/dashboard/users/table", icon: CiViewTable, label: "Table" },
            ]}
          />
          <Dropdown
            label="Pages"
            icon={TbRouteScan}
            dropdownKey="routes"
            items={[
              { to: "/dashboard/route/table", icon: CiViewTable, label: "Table" },
              { to: "/dashboard/route/tree", icon: PiTreeViewThin, label: "Tree" },
            ]}
          />
          <NavLink
            to="/dashboard/groop/table"
            icon={MdOutlineLocalPolice}
            label="Autorisations"
          />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold mb-4 text-gray-600">Application</p>
        <div className="space-y-2">
          <NavLink to="/dashboard/updates" icon={GrUpdate} label="Mises à jour" />
          <NavLink to="/dashboard/settings" icon={IoSettingsOutline} label="Paramètres" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-xs lg:text-sm p-4 rounded-lg text-red-600 hover:bg-gray-300 w-full"
          >
            <span className="p-2 bg-gray-100 rounded-full">
              <IoIosLogOut size={18} className="text-red-500" />
            </span>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
