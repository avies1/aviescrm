
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  Briefcase,
  FileText,
  Clock,
  CalendarCheck,
  Plus,
} from "lucide-react";

import { useLS, Card, Badge, btn, inr } from "../lib.jsx";

export default function Dashboard() {
  const [cl] = useLS("clients");
  const [em] = useLS("employees");
  const [inv] = useLS("invoices");
  const [att] = useLS("attendance");

  // Current date
  const today = new Date().toISOString().slice(0, 10);

  const ts = em.map(
    (e) => att[e.id + "|" + today]?.s || "Not Marked"
  );

  // Pending payments
  const pend = inv
    .filter((i) => i.status !== "Paid")
    .reduce((a, i) => a + +i.total, 0);

  // Monthly Client Statistics Filters
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  );

  const [selectedMonth, setSelectedMonth] = useState("All");

  // Available years from client joining dates
  const years = [
    ...new Set(
      cl
        .map((c) => (c.joining || "").slice(0, 4))
        .filter((y) => /^\d{4}$/.test(y))
    ),
  ].sort((a, b) => Number(b) - Number(a));

  // Ensure current year is available
  if (!years.includes(selectedYear)) {
    years.unshift(selectedYear);
  }

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter clients based on selected month and year
  const filteredClients = cl.filter((c) => {
    const date = c.joining || "";

    const yearMatch = date.slice(0, 4) === selectedYear;

    const monthMatch =
      selectedMonth === "All" ||
      Number(date.slice(5, 7)) === Number(selectedMonth);

    return yearMatch && monthMatch;
  });

  // Calculate monthly client counts
  const monthlyStats = monthNames.map((month, index) => ({
    month: month.slice(0, 3),
    count: cl.filter((c) => {
      const date = c.joining || "";

      return (
        date.slice(0, 4) === selectedYear &&
        Number(date.slice(5, 7)) === index + 1
      );
    }).length,
  }));

  // Chart data based on selected month
  const chartStats =
    selectedMonth === "All"
      ? monthlyStats
      : monthlyStats.filter(
          (_, index) => index + 1 === Number(selectedMonth)
        );

  const totalFilteredClients = filteredClients.length;

  const maxClients = Math.max(
    1,
    ...monthlyStats.map((item) => item.count)
  );

  // Dashboard Cards
  const cards = [
    ["Total Clients", cl.length, Users],
    [
      "Active Clients",
      cl.filter((c) => c.status === "Active").length,
      UserCheck,
    ],
    ["Total Employees", em.length, Briefcase],
    ["Total Invoices", inv.length, FileText],
    ["Pending Payments", inr(pend), Clock],
    [
      "Total Attendance",
      Object.values(att).filter((r) => r.s === "Present").length,
      CalendarCheck,
    ],
  ];

  return (
    <div className="space-y-6">

      {/* Dashboard Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex gap-2 flex-wrap">
          {[
            ["/new-clients", "Add Client"],
            ["/employees", "Add Employee"],
            ["/invoices", "Create Invoice"],
          ].map(([t, l]) => (
            <Link key={l} to={t} className={btn}>
              <Plus size={16} />
              {l}
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map(([l, v, I]) => (
          <Card key={l}>
            <div className="w-9 h-9 rounded-lg bg-soft text-azure grid place-items-center mb-2">
              <I size={18} />
            </div>

            <div className="text-xl font-bold">{v}</div>

            <div className="text-xs text-gray-500">{l}</div>
          </Card>
        ))}
      </div>

      {/* Dashboard Main Sections */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Recent Clients */}
        <Card>
          <h2 className="font-semibold mb-3">
            Recent Clients
          </h2>

          <table className="w-full text-sm">
            <tbody>
              {cl.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">
                    {c.name}
                    <div className="text-xs text-gray-500">
                      {c.company}
                    </div>
                  </td>

                  <td>{c.joining}</td>

                  <td>
                    <Badge t={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <h2 className="font-semibold mb-3">
            Recent Invoices
          </h2>

          <table className="w-full text-sm">
            <tbody>
              {inv.slice(0, 5).map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="py-2">
                    {i.id}
                    <div className="text-xs text-gray-500">
                      {i.client}
                    </div>
                  </td>

                  <td>{inr(i.total)}</td>

                  <td>
                    <Badge t={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Employee Attendance Overview */}
        <Card>
          <h2 className="font-semibold mb-3">
            Employee Attendance Overview (Today)
          </h2>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              "Present",
              "Absent",
              "Leave",
              "Half Day",
              "Holiday",
              "Not Marked",
            ].map((s) => (
              <div
                key={s}
                className="bg-soft rounded-lg py-3"
              >
                <div className="text-xl font-bold text-azure">
                  {ts.filter((x) => x === s).length}
                </div>

                <div className="text-xs">{s}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Client Statistics */}
        <Card>
          {/* Header and Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Monthly Client Statistics
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Track new client registrations
              </p>
            </div>

            <div className="flex gap-2">

              {/* Month Filter */}
              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Months</option>

                {monthNames.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Total Clients */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {selectedMonth === "All"
                ? `Total New Clients in ${selectedYear}`
                : `New Clients - ${
                    monthNames[Number(selectedMonth) - 1]
                  }`}
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {totalFilteredClients}
            </h3>
          </div>

          {/* Monthly Chart */}
          <div className="flex items-end gap-3 h-44 border-b border-gray-100 pb-2">

            {chartStats.length > 0 ? (
              chartStats.map((item) => (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center justify-end h-full group"
                >
                  <span className="text-xs font-semibold text-gray-600 mb-2">
                    {item.count}
                  </span>

                  <div className="w-full max-w-12 h-full flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-sky-400 transition-all duration-300 group-hover:from-blue-700"
                      style={{
                        height:
                          item.count > 0
                            ? `${(item.count / maxClients) * 100}%`
                            : "0%",
                        minHeight:
                          item.count > 0 ? "4px" : "0px",
                      }}
                    />
                  </div>

                  <span className="text-xs text-gray-500 mt-3">
                    {item.month}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 m-auto">
                No client data available
              </p>
            )}

          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
            <span className="text-xs text-gray-500">
              Showing {chartStats.length} month(s)
            </span>

            <button
              onClick={() => {
                setSelectedMonth("All");
                setSelectedYear(
                  String(new Date().getFullYear())
                );
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Reset Filters
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}
