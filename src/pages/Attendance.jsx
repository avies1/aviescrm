import { useState } from "react";
import { useLS, Card, Badge, inp, Empty, MONTHS } from "../lib.jsx";

const pad = (n) => String(n).padStart(2, "0");

const ST = ["Present", "Absent", "Half Day", "Leave", "Holiday"];

const statusColors = {
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-700",
  "Half Day": "bg-yellow-100 text-yellow-700",
  Leave: "bg-purple-100 text-purple-700",
  Holiday: "bg-gray-100 text-gray-600",
};

const hrs = (a, b) => {
  if (!a || !b) return "-";

  const start = new Date(`1970-01-01T${a}`);
  const end = new Date(`1970-01-01T${b}`);

  let diff = (end - start) / 36e5;
  if (diff < 0) diff += 24;

  return diff.toFixed(1) + " h";
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Attendance() {
  const [emps] = useLS("employees");
  const [att, setAtt] = useLS("attendance");
  const [requests, setRequests] = useLS("leaveRequests");

  const now = new Date();

  const [emp, setEmp] = useState("");
  const [m, setM] = useState(now.getMonth());
  const [y, setY] = useState(now.getFullYear());
  const [view, setView] = useState("calendar");

  const [selectedDate, setSelectedDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  );

  const e = emps.find((x) => x.id === emp) || emps[0];

  if (!e) return <Empty t="Add an employee to track attendance" />;

  const key = (id, date) => `${id}|${date}`;

  const getRecord = (id, date) => {
    const record = att[key(id, date)] || {};

    return {
      date,
      in: record.in || "",
      out: record.out || "",
      s:
        record.s ||
        (new Date(date + "T00:00:00").getDay() === 0 ? "Holiday" : ""),
    };
  };

  const setRecord = (date, changes) => {
    setAtt({
      ...att,
      [key(e.id, date)]: {
        ...(att[key(e.id, date)] || {}),
        ...changes,
      },
    });
  };

  const totalDays = new Date(y, m + 1, 0).getDate();

  const firstDay = (new Date(y, m, 1).getDay() + 6) % 7;

  const days = Array.from({ length: totalDays }, (_, i) => {
    const date = `${y}-${pad(m + 1)}-${pad(i + 1)}`;
    return getRecord(e.id, date);
  });

  const workingDays = days.filter((d) => d.s !== "Holiday").length;

  const count = (s) => days.filter((d) => d.s === s).length;

  const present = count("Present") + count("Half Day") / 2;

  const percentage = workingDays
    ? Math.round((present / workingDays) * 100)
    : 0;

  const changeMonth = (value) => {
    const date = new Date(y, m + value, 1);
    setM(date.getMonth());
    setY(date.getFullYear());
  };

  const updateRequest = (id, status) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const safeRequests = Array.isArray(requests) ? requests : [];

  const employeeRequests = safeRequests.filter(
    (r) => !r.employeeId || r.employeeId === e.id,
  );

  //  const [requests, setRequests] = useLS("leaveRequests")/;

  // Always maintain an array

  const allDetails = emps.map((employee) => {
    const record = getRecord(employee.id, selectedDate);

    return {
      ...record,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department || employee.dept || "-",
    };
  });

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee attendance and leave requests.
          </p>
        </div>

        <select
          className={inp + " !w-auto"}
          value={e.id}
          onChange={(x) => setEmp(x.target.value)}
        >
          {emps.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name} ({x.id})
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ["Working Days", workingDays],
          ["Present", present],
          ["Absent", count("Absent")],
          ["Leave", count("Leave")],
          ["Attendance", percentage + "%"],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-xs text-gray-500">{label}</p>
            <h2 className="text-2xl font-bold text-azure mt-2">{value}</h2>
          </Card>
        ))}
      </div>

      {/* MONTH NAVIGATION */}

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-lg">
            {MONTHS[m]} {y}
          </h2>
          <p className="text-xs text-gray-500">Monthly attendance overview</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="border rounded-lg px-3 py-2"
            onClick={() => changeMonth(-1)}
          >
            ←
          </button>

          <button
            className="border rounded-lg px-3 py-2 text-sm"
            onClick={() => {
              setM(now.getMonth());
              setY(now.getFullYear());
            }}
          >
            Today
          </button>

          <button
            className="border rounded-lg px-3 py-2"
            onClick={() => changeMonth(1)}
          >
            →
          </button>
        </div>
      </Card>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* ATTENDANCE CALENDAR */}

        <Card className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-bold text-lg">Monthly Attendance Calendar</h2>

            <span className="text-xs text-gray-500">{e.name}</span>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weekdays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500 py-2"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={"empty-" + i} />
            ))}

            {days.map((d, i) => {
              const isToday =
                d.date ===
                `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

              return (
                <div
                  key={d.date}
                  className={`min-h-20 border rounded-lg p-1 sm:p-2 ${
                    isToday ? "border-azure border-2" : ""
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">{i + 1}</div>

                  {d.s ? (
                    <div
                      className={`rounded px-1 py-1 text-[9px] sm:text-xs font-medium text-center ${
                        statusColors[d.s]
                      }`}
                    >
                      {d.s}
                    </div>
                  ) : (
                    <select
                      className="w-full text-[9px] sm:text-xs border rounded p-1 bg-transparent"
                      value=""
                      onChange={(x) =>
                        setRecord(d.date, {
                          s: x.target.value,
                        })
                      }
                    >
                      <option value="">Mark</option>
                      {ST.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  )}

                  {d.in && (
                    <p className="text-[9px] text-gray-500 mt-1">In: {d.in}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 pt-2 border-t">
            {ST.map((s) => (
              <div key={s} className="flex items-center gap-1 text-xs">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    statusColors[s].split(" ")[0]
                  }`}
                />
                {s}
              </div>
            ))}
          </div>
        </Card>

        {/* LEAVE REQUESTS */}

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Leave Requests</h2>

            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              {employeeRequests.filter((r) => r.status === "Pending").length}{" "}
              Pending
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {employeeRequests.length === 0 ? (
              <div className="text-center py-10 text-sm text-gray-400">
                No leave requests found.
              </div>
            ) : (
              employeeRequests.map((r) => (
                <div key={r.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">
                        {r.employeeName || "Employee"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.employeeId || "-"}
                      </p>
                    </div>

                    <Badge t={r.status || "Pending"} />
                  </div>

                  <p className="text-sm font-medium">
                    {r.type || "General Leave"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {r.from} to {r.to}
                  </p>

                  {r.reason && (
                    <p className="text-xs text-gray-500">{r.reason}</p>
                  )}

                  {(!r.status || r.status === "Pending") && (
                    <div className="flex gap-2 pt-1">
                      <button
                        className="flex-1 bg-green-600 text-white text-xs rounded-lg py-2"
                        onClick={() => updateRequest(r.id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="flex-1 bg-red-500 text-white text-xs rounded-lg py-2"
                        onClick={() => updateRequest(r.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* EMPLOYEE ATTENDANCE DETAILS */}

      <Card className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h2 className="font-bold text-lg">Employee Attendance Details</h2>
            <p className="text-xs text-gray-500">
              Attendance records for {selectedDate}
            </p>
          </div>

          {/* DATE FILTER */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium">Select Date:</label>

            <input
              type="date"
              className={inp + " !w-auto"}
              value={selectedDate}
              onChange={(x) => setSelectedDate(x.target.value)}
            />

            <button
              className="border rounded-lg px-3 py-2 text-sm text-black transition-colors duration-200 hover:bg-green-600 hover:text-white"
              onClick={() => {
                const d = new Date();
                setSelectedDate(
                  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[850px]">
            <thead>
              <tr className="bg-soft text-left">
                {[
                  "Employee ID",
                  "Employee Name",
                  "Check-in",
                  "Check-out",
                  "Working Hours",
                  "Status",
                ].map((h) => (
                  <th key={h} className="p-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {(view === "table"
                ? allDetails
                : days.map((d) => ({
                    ...d,
                    employeeId: e.id,
                    employeeName: e.name,
                  }))
              ).map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{d.employeeId}</td>
                  <td className="p-3 font-medium">{d.employeeName}</td>
                  <td className="p-3">
                    <input
                      type="time"
                      className={inp + " !w-28"}
                      value={d.in}
                      onChange={(x) => {
                        setAtt({
                          ...att,
                          [key(d.employeeId, d.date)]: {
                            ...(att[key(d.employeeId, d.date)] || {}),
                            in: x.target.value,
                          },
                        });
                      }}
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="time"
                      className={inp + " !w-28"}
                      value={d.out}
                      onChange={(x) => {
                        setAtt({
                          ...att,
                          [key(d.employeeId, d.date)]: {
                            ...(att[key(d.employeeId, d.date)] || {}),
                            out: x.target.value,
                          },
                        });
                      }}
                    />
                  </td>

                  <td className="p-3">{hrs(d.in, d.out)}</td>

                  <td className="p-3">
                    <select
                      className={`border rounded-lg px-2 py-1 text-sm font-medium ${
                        d.s === "Present"
                          ? "bg-green-100 text-green-700 border-green-500"
                          : d.s === "Absent"
                            ? "bg-red-100 text-red-700 border-red-500"
                            : d.s === "Leave"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-500"
                              : d.s === "Holiday"
                                ? "bg-orange-100 text-orange-700 border-orange-500"
                                : d.s === "Half Day"
                                  ? "bg-blue-100 text-blue-700 border-yellow-500"
                                  : "bg-white text-gray-700 border-gray-300"
                      }`}
                      value={d.s}
                      onChange={(x) => {
                        setAtt({
                          ...att,
                          [key(d.employeeId, d.date)]: {
                            ...(att[key(d.employeeId, d.date)] || {}),
                            s: x.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Mark</option>
                      {ST.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
