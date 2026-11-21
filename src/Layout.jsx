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
  UserRound,
  Settings,
  Bell,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Confirm, useToast } from "./lib.jsx";
import al from "../assets/al.webp";

const AZURE = "#078DA3";
const NAVY = "#11112F";

const nav = [
  {
    title: "MAIN MENU",
    items: [
      ["/", "Dashboard", LayoutDashboard],
      ["/clients", "Clients", Users],
      ["/new-clients", "New Clients", UserPlus],
      ["/invoices", "Invoices", FileText],
      ["/employees", "Employee Details", Briefcase],
      ["/attendance", "Attendance", CalendarCheck],
      ["/payslips", "Payslips", Wallet],
    ],
  },
];

export default function Layout() {
  const [col, setCol] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [out, setOut] = useState(false);

  const go = useNavigate();
  const toast = useToast();

  const user = localStorage.getItem("auth") || "Admin";

  const closeMobile = () => setMobileOpen(false);

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 mx-3 mb-2
    rounded-xl text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? "bg-[#078DA3] text-white shadow-lg shadow-[#078DA3]/20"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* ================= SIDEBAR ================= */}

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#11112F]/60
          backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          bg-[#11112F] text-white
          flex flex-col
          transition-all duration-300
          overflow-hidden
          ${col ? "md:w-[82px]" : "md:w-[255px]"}
          w-[255px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO AREA */}
        <div
          className="h-[82px] flex items-center
          justify-between px-5 shrink-0
          border-b border-white/10"
        >
          <div
            className="flex items-center justify-center
            overflow-hidden"
          >
            <img
              src={al}
              alt="AVIES Logo"
              className={`object-contain transition-all
                ${col ? "w-[58px] h-[55px]" : "w-[150px] h-[65px]"}`}
            />
          </div>

          <button
            onClick={closeMobile}
            className="md:hidden text-white/70
              hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <div
          className="flex-1 overflow-y-auto py-6
          scrollbar-thin scrollbar-thumb-white/20"
        >
          {/* MENU LABEL */}
          {!col && (
            <p
              className="px-6 mb-5 text-[10px]
              font-bold tracking-[2px] text-slate-400"
            >
            </p>
          )}

          {nav.map((group) => (
            <div key={group.title}>
              {group.items.map(([to, label, Icon]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  title={col ? label : ""}
                  onClick={closeMobile}
                  className={linkClass}
                >
                  <Icon size={20} strokeWidth={1.9} className="shrink-0" />

                  {!col && <span className="truncate">{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}

          {/* ACCOUNT SECTION */}
          <div className="mt-9">
            {!col && (
              <p
                className="px-6 mb-4 text-[10px]
                font-bold tracking-[2px] text-slate-400"
              >
                ACCOUNT
              </p>
            )}

            <button
              onClick={() => setOut(true)}
              title={col ? "Logout" : ""}
              className="w-[calc(100%-24px)] mx-3
                flex items-center gap-3 px-4 py-3
                rounded-xl text-sm font-medium
                text-slate-300
                hover:bg-red-500/15 hover:text-red-300
                transition-all duration-200"
            >
              <LogOut size={20} className="shrink-0" />

              {!col && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* SIDEBAR FOOTER */}
        <div
          className="shrink-0 px-5 py-5
          border-t border-white/10"
        >
          {!col && (
            <>
              <p
                className="text-xs font-semibold
                text-white/80"
              >
                AVIES CRM
              </p>

              <p className="text-[10px] mt-1 text-slate-400">Version 1.0.0</p>
            </>
          )}

          {col && (
            <div
              className="text-center text-[10px]
              text-slate-400"
            >
              v1.0
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <div
        className={`min-h-screen transition-all duration-300
          ${col ? "md:ml-[82px]" : "md:ml-[255px]"}`}
      >
        {/* ================= TOP HEADER ================= */}

        <header
          className={`fixed top-0 right-0 z-30
            h-[70px] bg-white
            border-b border-slate-200
            flex items-center justify-between
            px-4 md:px-7 shadow-sm
            transition-all duration-300
            left-0
            ${col ? "md:left-[82px]" : "md:left-[255px]"}
          `}
        >
          {/* LEFT HEADER */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileOpen(!mobileOpen);
                } else {
                  setCol(!col);
                }
              }}
              className="p-2 rounded-lg
                text-[#11112F]
                hover:bg-[#E8F5F7]
                hover:text-[#078DA3]
                transition"
              aria-label="Toggle sidebar"
            >
              <Menu size={23} />
            </button>

            <div>
              <h1
                className="text-sm md:text-base
                font-bold text-[#11112F]"
              >
                AVIES CRM MANAGEMENT
              </h1>

              <p
                className="hidden sm:block
                text-[10px] text-slate-400 mt-0.5"
              >
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* RIGHT HEADER */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* NOTIFICATION */}
            <button
              className="relative p-2 rounded-lg
                text-slate-500
                hover:bg-[#E8F5F7]
                hover:text-[#078DA3] transition"
              title="Notifications"
            >
              <Bell size={20} />

              <span
                className="absolute top-1.5 right-1.5
                w-2 h-2 bg-red-500
                rounded-full border border-white"
              />
            </button>

            {/* DIVIDER */}
            <div className="h-8 w-px bg-slate-200" />

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setDd(!dd)}
                className="flex items-center gap-2 md:gap-3
                  p-1.5 rounded-xl
                  hover:bg-[#F1F7F9] transition"
              >
                <div
                  className="w-9 h-9 rounded-full
                  bg-[#E5F5F7]
                  border border-[#078DA3]/20
                  flex items-center justify-center
                  text-[#078DA3]"
                >
                  <UserRound size={19} />
                </div>

                <div className="hidden sm:block text-left">
                  <p
                    className="text-sm font-semibold
                    text-[#11112F] max-w-[110px] truncate"
                  >
                    {user}
                  </p>

                  <p className="text-[10px] text-slate-400">Administrator</p>
                </div>

                <ChevronDown
                  size={15}
                  className={`text-slate-500
                    transition-transform
                    ${dd ? "rotate-180" : ""}`}
                />
              </button>

              {/* PROFILE DROPDOWN */}
              {dd && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDd(false)}
                  />

                  <div
                    className="absolute right-0 top-14
                    w-56 bg-white rounded-xl
                    border border-slate-100
                    shadow-xl py-2 z-50"
                  >
                    <div
                      className="px-4 py-3
                      border-b border-slate-100"
                    >
                      <p
                        className="text-sm font-semibold
                        text-[#11112F] truncate"
                      >
                        {user}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        AVIES Administrator
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setDd(false);
                        toast("My Profile: " + user);
                      }}
                      className="w-full flex items-center gap-3
                        px-4 py-3 text-sm text-slate-600
                        hover:bg-[#E8F5F7]
                        hover:text-[#078DA3] transition"
                    >
                      <UserRound size={17} />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setDd(false);
                        toast("Account Settings");
                      }}
                      className="w-full flex items-center gap-3
                        px-4 py-3 text-sm text-slate-600
                        hover:bg-[#E8F5F7]
                        hover:text-[#078DA3] transition"
                    >
                      <Settings size={17} />
                      Settings
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        setDd(false);
                        setOut(true);
                      }}
                      className="w-full flex items-center gap-3
                        px-4 py-3 text-sm text-red-500
                        hover:bg-red-50 transition"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main
          className="pt-[70px] min-h-screen
          bg-[#F4F7FA]"
        >
          <div
            className="min-h-[calc(100vh-70px)]
            bg-[#F4F7FA]
            rounded-tl-[24px]
            px-4 py-5 md:px-7 md:py-7"
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= LOGOUT CONFIRMATION ================= */}

      {out && (
        <Confirm
          msg="Are you sure you want to logout?"
          onNo={() => setOut(false)}
          onYes={() => {
            localStorage.removeItem("auth");
            localStorage.removeItem("remember");
            go("/login");
          }}
        />
      )}
    </div>
  );
}
