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
  const [cl] = useLS("clients"),
    [em] = useLS("employees"),
    [inv] = useLS("invoices"),
    [att] = useLS("attendance");
  const today = new Date().toISOString().slice(0, 10),
    ts = em.map((e) => att[e.id + "|" + today]?.s || "Not Marked");
  const pend = inv
    .filter((i) => i.status !== "Paid")
    .reduce((a, i) => a + +i.total, 0);
  const mo = {};
  cl.forEach((c) => {
    const k = (c.joining || "").slice(0, 7);
    if (k) mo[k] = (mo[k] || 0) + 1;
  });
  const ms = Object.entries(mo).sort().slice(-6),
    mx = Math.max(1, ...ms.map((x) => x[1]));
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
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-3">Recent Clients</h2>
          <table className="w-full text-sm">
            <tbody>
              {cl.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">
                    {c.name}
                    <div className="text-xs text-gray-500">{c.company}</div>
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
        <Card>
          <h2 className="font-semibold mb-3">Recent Invoices</h2>
          <table className="w-full text-sm">
            <tbody>
              {inv.slice(0, 5).map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="py-2">
                    {i.id}
                    <div className="text-xs text-gray-500">{i.client}</div>
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
              <div key={s} className="bg-soft rounded-lg py-3">
                <div className="text-xl font-bold text-azure">
                  {ts.filter((x) => x === s).length}
                </div>
                <div className="text-xs">{s}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold mb-3">Monthly Client Statistics</h2>
          <div className="flex items-end gap-3 h-36">
            {ms.map(([k, n]) => (
              <div
                key={k}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <span className="text-xs">{n}</span>
                <div
                  className="w-full bg-azure rounded-t"
                  style={{ height: (n / mx) * 100 + "%" }}
                />
                <span className="text-[10px] mt-1">{k}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
