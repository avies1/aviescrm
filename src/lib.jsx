import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Inbox,
} from "lucide-react";
import { jsPDF } from "jspdf";
export const SERVICES = [
  "Digital Marketing",
  "SEO",
  "Web Development",
  "App Development",
  "Social Media Marketing",
  "Google Ads",
  "Meta Ads",
  "Graphic Designing",
];
export const MONTHS = [
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
const C = (id, name, company, svc, j, pay, st) => ({
  id,
  name,
  company,
  person: name,
  mobile: "98765432" + id.slice(-2),
  email:
    name.split(" ")[0].toLowerCase() +
    "@" +
    company.split(" ")[0].toLowerCase() +
    ".com",
  services: svc,
  joining: j,
  status: st,
  city: "Hyderabad",
  state: "Telangana",
  package: 25000,
  payment: pay,
  type: "Existing",
});
const E = (id, name, des, dep, b) => ({
  id,
  name,
  photo: "",
  gender: "Male",
  dob: "1993-05-10",
  mobile: "98123456" + id.slice(-2),
  email: name.split(" ")[0].toLowerCase() + "@avies.com",
  address: "Hyderabad",
  emergency: "9800000001",
  designation: des,
  department: dep,
  joining: "2025-01-10",
  etype: "Full-time",
  manager: "Priya Nair",
  projects: "Sunrise Foods",
  status: "Active",
  basic: b,
  allowances: 5000,
  deductions: 1000,
  net: b + 4000,
});
const I = (id, client, amt, st, d) => ({
  id,
  client,
  date: d,
  due: d.slice(0, 8) + "28",
  desc: "Monthly retainer",
  amount: amt,
  gst: 18,
  total: Math.round(amt * 1.18),
  status: st,
});
export const SEED = {
  clients: [
    C(
      "CL001",
      "Ravi Kumar",
      "Sunrise Foods",
      ["SEO", "Digital Marketing"],
      "2026-06-15",
      "Paid",
      "Active",
    ),
    C(
      "CL002",
      "Meera Shah",
      "BlueWave Tech",
      ["Web Development", "App Development"],
      "2026-07-20",
      "Pending",
      "Active",
    ),
    C(
      "CL003",
      "John Paul",
      "Greenleaf Organics",
      ["Social Media Marketing", "Meta Ads"],
      "2026-09-05",
      "Overdue",
      "Active",
    ),
    C(
      "CL004",
      "Sana Khan",
      "Urban Threads",
      ["Google Ads", "Graphic Designing"],
      "2026-10-12",
      "Paid",
      "Inactive",
    ),
  ],
  employees: [
    E("EMP001", "Anil Sharma", "SEO Specialist", "Marketing", 30000),
    E("EMP002", "Priya Nair", "Project Manager", "Operations", 50000),
    E("EMP003", "Kiran Rao", "Web Developer", "Development", 40000),
    E("EMP004", "Divya Reddy", "Graphic Designer", "Design", 28000),
  ],
  invoices: [
    I("INV001", "Ravi Kumar", 25000, "Paid", "2026-10-01"),
    I("INV002", "Meera Shah", 60000, "Pending", "2026-10-15"),
    I("INV003", "John Paul", 18000, "Overdue", "2026-09-10"),
    I("INV004", "Sana Khan", 22000, "Paid", "2026-11-02"),
  ],
  attendance: {},
  payslips: [],
};
export const ls = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k)) || SEED[k];
  } catch {
    return SEED[k];
  }
};
export function useLS(k, init = SEED[k]) {
  const [v, s] = useState(() => ls(k) ?? init);
  useEffect(() => {
    localStorage.setItem(k, JSON.stringify(v));
  }, [k, v]);
  return [v, s];
}
export const uid = (p, a) =>
  p +
  String(
    Math.max(0, ...a.map((x) => +String(x.id).slice(p.length) || 0)) + 1,
  ).padStart(3, "0");
export const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
export function savePdf(title, sub, rows, file) {
  const d = new jsPDF();
  d.setFillColor(2, 138, 162);
  d.rect(0, 0, 210, 28, "F");
  d.setTextColor(255);
  d.setFontSize(22);
  d.text("AVIES", 14, 18);
  d.setFontSize(12);
  d.text(title, 196, 18, { align: "right" });
  d.setTextColor(38, 50, 56);
  d.setFontSize(11);
  let y = 42;
  if (sub) {
    d.text(sub, 14, y);
    y += 12;
  }
  rows.forEach(([a, b], i) => {
    if (i % 2) {
      d.setFillColor(232, 245, 247);
      d.rect(12, y - 6, 186, 9, "F");
    }
    d.text(String(a), 16, y);
    d.text(String(b).replace("₹", "Rs. "), 194, y, { align: "right" });
    y += 10;
  });
  d.save(file);
}
export const btn =
  "inline-flex items-center gap-2 bg-azure text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-azure/90 transition";
export const btn2 =
  "inline-flex items-center gap-2 border bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-soft transition";
export const inp =
  "w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-azure/40 focus:border-azure";
export const Card = ({ children, className = "" }) => (
  <div className={"bg-white border rounded-xl shadow-sm p-5 " + className}>
    {children}
  </div>
);
export const Logo = ({ size = 36 }) => (
  <div className="flex items-center gap-2">
    <div
      style={{ width: size, height: size }}
      className="bg-azure rounded-lg grid place-items-center text-white font-extrabold"
    >
      A
    </div>
    <span className="font-bold text-azure tracking-wide text-lg">AVIES</span>
  </div>
);
const BC = {
  Active: "green",
  Paid: "green",
  Present: "green",
  Pending: "amber",
  "Half Day": "amber",
  Inactive: "gray",
  Holiday: "blue",
  Leave: "blue",
  Overdue: "red",
  Absent: "red",
};
const BS = {
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-sky-100 text-sky-700",
  red: "bg-red-100 text-red-700",
};
export const Badge = ({ t }) => (
  <span
    className={
      "px-2.5 py-0.5 rounded-full text-xs font-medium " + BS[BC[t] || "gray"]
    }
  >
    {t}
  </span>
);
const TC = createContext(() => {});
export const useToast = () => useContext(TC);
export function ToastProvider({ children }) {
  const [t, s] = useState([]);
  const add = (m) => {
    const id = Math.random();
    s((a) => [...a, { id, m }]);
    setTimeout(() => s((a) => a.filter((x) => x.id !== id)), 2500);
  };
  return (
    <TC.Provider value={add}>
      {children}
      <div className="fixed top-20 right-4 z-[100] space-y-2">
        {t.map((x) => (
          <div
            key={x.id}
            className="bg-azure text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            {x.m}
          </div>
        ))}
      </div>
    </TC.Provider>
  );
}
export const Modal = ({ title, onClose, children, wide }) => (
  <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
    <div
      className={
        "bg-white rounded-xl w-full max-h-[90vh] overflow-auto " +
        (wide ? "max-w-3xl" : "max-w-md")
      }
    >
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  </div>
);
export const Confirm = ({ msg, onYes, onNo }) => (
  <Modal title="Confirm" onClose={onNo}>
    <p className="mb-5 text-sm">{msg}</p>
    <div className="flex justify-end gap-2">
      <button className={btn2} onClick={onNo}>
        Cancel
      </button>
      <button className={btn} onClick={onYes}>
        Yes
      </button>
    </div>
  </Modal>
);
export const Empty = ({ t = "No records found" }) => (
  <div className="py-12 text-center text-gray-400">
    <Inbox className="mx-auto mb-2" />
    {t}
  </div>
);
export function RecordForm({
  fields,
  value,
  onSubmit,
  onCancel,
  saveLabel = "Save",
}) {
  const init = () =>
    Object.fromEntries(
      fields
        .filter((f) => !f.ro)
        .map((f) => [f.k, value?.[f.k] ?? f.d ?? (f.t === "multi" ? [] : "")]),
    );
  const [v, setV] = useState(init),
    [er, setEr] = useState({}),
    set = (k, x) => setV((p) => ({ ...p, [k]: x }));
  const submit = (e) => {
    e.preventDefault();
    const E = {};
    fields.forEach((f) => {
      if (f.ro) return;
      const x = v[f.k];
      if (f.req && (Array.isArray(x) ? !x.length : !String(x).trim()))
        E[f.k] = "Required";
      else if (x && f.t === "email" && !/^\S+@\S+\.\S+$/.test(x))
        E[f.k] = "Invalid email";
      else if (x && f.mob && !/^[6-9]\d{9}$/.test(x))
        E[f.k] = "Enter a valid 10-digit number";
    });
    setEr(E);
    if (!Object.keys(E).length) onSubmit(v);
  };
  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields
        .filter((f) => !f.ro)
        .map((f) => {
          const o = typeof f.o === "function" ? f.o() : f.o;
          return (
            <>
              {f.s && (
                <h3
                  key={f.k + "s"}
                  className="md:col-span-2 font-semibold text-azure border-b pb-1 mt-2"
                >
                  {f.s}
                </h3>
              )}
              <div key={f.k} className={f.full ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium mb-1">
                  {f.l}
                  {f.req && <span className="text-red-500"> *</span>}
                </label>
                {f.t === "select" ? (
                  <select
                    className={inp}
                    value={v[f.k]}
                    onChange={(e) => set(f.k, e.target.value)}
                  >
                    <option value="">Select</option>
                    {o.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                ) : f.t === "textarea" ? (
                  <textarea
                    rows={3}
                    className={inp}
                    value={v[f.k]}
                    onChange={(e) => set(f.k, e.target.value)}
                  />
                ) : f.t === "multi" ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {o.map((x) => (
                      <label
                        key={x}
                        className="flex gap-2 text-sm items-center"
                      >
                        <input
                          type="checkbox"
                          className="accent-azure"
                          checked={v[f.k].includes(x)}
                          onChange={(e) =>
                            set(
                              f.k,
                              e.target.checked
                                ? [...v[f.k], x]
                                : v[f.k].filter((y) => y !== x),
                            )
                          }
                        />
                        {x}
                      </label>
                    ))}
                  </div>
                ) : f.t === "file" ? (
                  <div className="flex items-center gap-3">
                    {v[f.k] && (
                      <img
                        src={v[f.k]}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="text-sm"
                      onChange={(e) => {
                        const r = new FileReader();
                        r.onload = () => set(f.k, r.result);
                        e.target.files[0] && r.readAsDataURL(e.target.files[0]);
                      }}
                    />
                  </div>
                ) : (
                  <input
                    type={f.t || "text"}
                    className={inp}
                    value={v[f.k]}
                    onChange={(e) => set(f.k, e.target.value)}
                  />
                )}
                {er[f.k] && (
                  <p className="text-xs text-red-500 mt-1">{er[f.k]}</p>
                )}
              </div>
            </>
          );
        })}
      <div className="md:col-span-2 flex gap-2 justify-end pt-2">
        <button type="button" className={btn2} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className={btn2}
          onClick={() => {
            setV(init());
            setEr({});
          }}
        >
          Reset Form
        </button>
        <button className={btn}>{saveLabel}</button>
      </div>
    </form>
  );
}
export function Crud({
  title,
  k,
  cols,
  fields,
  prefix,
  filters = [],
  beforeSave = (x) => x,
  extra,
  addTo,
  editTo,
  addLabel = "Add New",
  placeholder = "Search...",
  formWide = true,
}) {
  const [rows, setRows] = useLS(k),
    toast = useToast(),
    nav = useNavigate();
  const [q, setQ] = useState(""),
    [f, setF] = useState({}),
    [sort, setSort] = useState({ k: "id", d: 1 }),
    [pg, setPg] = useState(1),
    [modal, setModal] = useState(null),
    [del, setDel] = useState(null);
  let list = rows.filter(
    (r) =>
      (!q ||
        Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase())) &&
      filters.every(
        (x) =>
          !f[x.k] ||
          (Array.isArray(r[x.k]) ? r[x.k].includes(f[x.k]) : r[x.k] === f[x.k]),
      ),
  );
  list = [...list].sort(
    (a, b) =>
      String(a[sort.k]).localeCompare(String(b[sort.k]), undefined, {
        numeric: true,
      }) * sort.d,
  );
  const pages = Math.max(1, Math.ceil(list.length / 6)),
    cur = Math.min(pg, pages),
    view = list.slice((cur - 1) * 6, cur * 6);
  const save = (v) => {
    const n = beforeSave(v);
    if (modal.mode === "edit")
      setRows(rows.map((r) => (r.id === modal.row.id ? { ...r, ...n } : r)));
    else setRows([{ ...n, id: uid(prefix, rows) }, ...rows]);
    toast("Saved successfully");
    setModal(null);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          className={btn}
          onClick={() => (addTo ? nav(addTo) : setModal({ mode: "add" }))}
        >
          <Plus size={16} />
          {addLabel}
        </button>
      </div>
      <Card>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              className={inp + " pl-9"}
              placeholder={placeholder}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPg(1);
              }}
            />
          </div>
          {filters.map((x) => (
            <select
              key={x.k}
              className={inp + " !w-auto"}
              value={f[x.k] || ""}
              onChange={(e) => {
                setF({ ...f, [x.k]: e.target.value });
                setPg(1);
              }}
            >
              <option value="">{x.l}</option>
              {(x.o || [...new Set(rows.map((r) => r[x.k]))]).map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-soft text-left">
                {cols.map((c) => (
                  <th
                    key={c.k}
                    className="p-3 whitespace-nowrap cursor-pointer"
                    onClick={() =>
                      setSort({ k: c.k, d: sort.k === c.k ? -sort.d : 1 })
                    }
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.l}
                      <ArrowUpDown size={12} />
                    </span>
                  </th>
                ))}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {view.map((r) => (
                <tr key={r.id} className="border-t hover:bg-bg">
                  {cols.map((c) => (
                    <td key={c.k} className="p-3">
                      {c.r ? (
                        c.r(r)
                      ) : ["status", "payment"].includes(c.k) ? (
                        <Badge t={r[c.k]} />
                      ) : Array.isArray(r[c.k]) ? (
                        r[c.k].join(", ")
                      ) : (
                        r[c.k]
                      )}
                    </td>
                  ))}
                  <td className="p-3">
                    <div className="flex gap-2 text-azure">
                      <button
                        title="View"
                        onClick={() => setModal({ mode: "view", row: r })}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        title="Edit"
                        onClick={() =>
                          editTo
                            ? nav(editTo + r.id)
                            : setModal({ mode: "edit", row: r })
                        }
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        title="Delete"
                        className="text-red-500"
                        onClick={() => setDel(r)}
                      >
                        <Trash2 size={16} />
                      </button>
                      {extra?.(r)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!view.length && <Empty />}
        </div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>{list.length} records</span>
          <div className="flex items-center gap-2">
            <button
              disabled={cur < 2}
              onClick={() => setPg(cur - 1)}
              className={btn2 + " !p-1.5"}
            >
              <ChevronLeft size={16} />
            </button>
            Page {cur}/{pages}
            <button
              disabled={cur >= pages}
              onClick={() => setPg(cur + 1)}
              className={btn2 + " !p-1.5"}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
      {modal?.mode === "view" && (
        <Modal wide title="Details" onClose={() => setModal(null)}>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {fields.map(
              (x) =>
                modal.row[x.k] !== undefined &&
                x.t !== "file" && (
                  <div key={x.k}>
                    <div className="text-gray-500 text-xs">{x.l}</div>
                    <div>
                      {Array.isArray(modal.row[x.k])
                        ? modal.row[x.k].join(", ")
                        : String(modal.row[x.k] || "-")}
                    </div>
                  </div>
                ),
            )}
          </div>
        </Modal>
      )}
      {(modal?.mode === "add" || modal?.mode === "edit") && (
        <Modal
          wide
          title={modal.mode === "add" ? addLabel : "Edit"}
          onClose={() => setModal(null)}
        >
          <RecordForm
            fields={fields}
            value={modal.row}
            onSubmit={save}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {del && (
        <Confirm
          msg={`Delete ${del.id}? This cannot be undone.`}
          onNo={() => setDel(null)}
          onYes={() => {
            setRows(rows.filter((r) => r.id !== del.id));
            toast("Deleted");
            setDel(null);
          }}
        />
      )}
    </div>
  );
}
