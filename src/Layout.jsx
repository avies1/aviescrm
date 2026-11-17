import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Briefcase,
  CalendarCheck,
  Wallet,
  LogOut,
  Menu,
  ChevronDown,
  User,
} from "lucide-react";

import { Confirm, useToast } from "./lib.jsx";
import al from "../assets/al.webp";

const nav = [
  ["/", "Dashboard", LayoutDashboard],
  ["/clients", "Clients", Users],
  ["/new-clients", "New Clients", UserPlus],
  ["/invoices", "Invoices", FileText],
  ["/employees", "Employee Details", Briefcase],
  ["/attendance", "Attendance", CalendarCheck],
  ["/payslips", "Payslips", Wallet],
];

export default function Layout() {
  const [col, setCol] = useState(false);
  const [dd, setDd] = useState(false);
  const [out, setOut] = useState(false);

  const go = useNavigate();
  const toast = useToast();

  const user = localStorage.getItem("auth");

  const cls = (active) =>
    `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm transition-all duration-200 ${
      active
        ? "bg-azure text-white"
        : "text-gray-700 hover:bg-soft hover:text-azure"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 h-16 bg-azure shadow-sm z-40 flex items-center justify-between px-4  border-b border-white-200">
        {/* LOGO SECTION */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => setCol(!col)}
            className="text-azure bg-white p-2 rounded-lg transition"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-center w-40 h-14 py-10 shrink-0 overflow-visible">
            <img
              src={al}
              alt="AVIES Logo"
              className="block w-50 h-28 object-contain opacity-100 brightness-100 contrast-125"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="hidden md:block text-lg lg:text-xl font-bold tracking-wider text-white">
          AVIES CRM MANAGEMENT
        </h1>

        {/* PROFILE SECTION */}
        <div className="relative">
          <button
            onClick={() => setDd(!dd)}
           className="flex items-center gap-2 bg-transparent hover:bg-white hover:text-black rounded-lg p-2 transition"
          >
            <span className="w-9 h-9 rounded-full bg-white bg-soft text-azure grid place-items-center">
              <User size={19}/>
            </span>

            <span className="hidden sm:block text-sm font-medium text-white">
              {user}
            </span>

            <ChevronDown size={15} className="text-gray-500"/>
          </button>

          {dd && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 text-sm z-50">
              <button
                className="w-full text-left px-4 py-2.5 hover:bg-soft text-black-700 "
                onClick={() => {
                  setDd(false);
                  toast("My Profile: " + user);
                }}
              >
                My Profile
              </button>
              <button
                className="w-full text-left px-4 py-2.5 hover:bg-soft"
                onClick={() => {
                  setDd(false);
                  toast("Account Settings");
                }}
              >
                Account Settings
              </button>

              <button
                className="w-full text-left px-4 py-2.5 hover:bg-soft text-red-600"
                onClick={() => {
                  setDd(false);
                  setOut(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-16 bottom-0 left-0 bg-white border-r border-gray-200 z-30 py-3 overflow-y-auto transition-all duration-300 ${
          col ? "w-16" : "w-60"
        }`}
      >
        {nav.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            title={label}
            className={({ isActive }) => cls(isActive)}
          >
            <Icon size={19} className="shrink-0" />

            {!col && <span>{label}</span>}
          </NavLink>
        ))}

        <button
          className={cls(false) + " w-[calc(100%-1rem)]"}
          onClick={() => setOut(true)}
        >
          <LogOut size={19} className="shrink-0" />

          {!col && <span>Logout</span>}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`pt-20 pb-8 px-4 md:px-6 ml-16 ${
          col ? "" : "md:ml-60"
        } transition-all duration-300`}
      >
        <Outlet />
      </main>

      {/* LOGOUT CONFIRMATION */}
      {out && (
        <Confirm
          msg="Are you sure you want to logout?"
          onNo={() => setOut(false)}
          onYes={() => {
            localStorage.removeItem("auth");
            go("/login");
          }}
        />
      )}
    </div>
  );
}
