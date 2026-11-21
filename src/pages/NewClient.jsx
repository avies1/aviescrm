import { useParams, useNavigate } from "react-router-dom";
import { useLS, uid, RecordForm, useToast } from "../lib.jsx";
import { clientFields } from "../config.js";

export default function NewClient() {
  const { id } = useParams();
  const [rows, setRows] = useLS("clients");
  const nav = useNavigate();
  const toast = useToast();

  const cur = rows.find((r) => r.id === id);

  const save = (v) => {
    if (cur) {
      setRows(
        rows.map((r) =>
          r.id === id ? { ...r, ...v } : r
        )
      );
    } else {
      setRows([
        { ...v, id: uid("CL", rows) },
        ...rows,
      ]);
    }

    toast(
      cur
        ? "Client updated successfully"
        : "Client saved successfully"
    );

    nav("/clients");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-8">

      <div>
        <p className="text-xs text-slate-400 mb-2">
          Dashboard / Clients / {cur ? "Edit Client" : "New Client"}
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#263238]">
          {cur ? "Edit Client" : "Add New Client"}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage client information and business details.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-7">
        <RecordForm
          key={id || "new"}
          fields={clientFields}
          value={cur}
          onSubmit={save}
          onCancel={() => nav("/clients")}
          saveLabel={cur ? "Update Client" : "Save Client"}
        />
      </div>

    </div>
  );
}