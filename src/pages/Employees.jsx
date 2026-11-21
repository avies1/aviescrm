import { Crud, inr } from "../lib.jsx";
import { empFields } from "../config.js";
export default function Employees() {
  return (
    <Crud
      title="Employee Details"
      k="employees"
      fields={empFields}
      prefix="EMP"
      addLabel="Add New Employee"
      placeholder="Search employees..."
      beforeSave={(v) => ({
        ...v,
        basic: +v.basic,
        allowances: +v.allowances,
        deductions: +v.deductions,
        net: +v.basic + +v.allowances - v.deductions,
      })}
      filters={[
        { k: "department", l: "All Departments" },
        { k: "designation", l: "All Designations" },
      ]}
      cols={[
        { k: "id", l: "ID" },
        {
          k: "name",
          l: "Employee",
          r: (r) => (
            <div className="flex items-center gap-2">
              {r.photo ? (
                <img
                  src={r.photo}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-soft text-azure grid place-items-center text-xs font-bold">
                  {r.name[0]}
                </span>
              )}
              {r.name}
            </div>
          ),
        },
        { k: "designation", l: "Designation" },
        { k: "department", l: "Department" },
        { k: "mobile", l: "Mobile" },
        { k: "status", l: "Status" },
        { k: "net", l: "Net Salary", r: (r) => inr(r.net) },
      ]}
    />
  );
}
