import { Download } from "lucide-react";
import { Crud, savePdf, inr } from "../lib.jsx";
import { invFields } from "../config.js";
export default function Invoices() {
  return (
    <Crud
      title="Invoices"
      k="invoices"
      fields={invFields}
      prefix="INV"
      addLabel="Create New Invoice"
      placeholder="Search invoices..."
      beforeSave={(v) => ({
        ...v,
        amount: +v.amount,
        gst: +v.gst,
        total: Math.round(v.amount * (1 + v.gst / 100)),
      })}
      filters={[
        { k: "client", l: "All Clients" },
        {
          k: "status",
          l: "All Payment Status",
          o: ["Paid", "Pending", "Overdue"],
        },
      ]}
      extra={(r) => (
        <button
          title="Download PDF"
          onClick={() =>
            savePdf(
              "INVOICE " + r.id,
              "Billed to: " + r.client,
              [
                ["Invoice Date", r.date],
                ["Due Date", r.due],
                ["Service", r.desc],
                ["Amount", inr(r.amount)],
                ["GST", r.gst + "%"],
                ["Total Amount", inr(r.total)],
                ["Payment Status", r.status],
              ],
              r.id + ".pdf",
            )
          }
        >
          <Download size={16} />
        </button>
      )}
      cols={[
        { k: "id", l: "Invoice ID" },
        { k: "client", l: "Client" },
        { k: "date", l: "Date" },
        { k: "due", l: "Due" },
        { k: "amount", l: "Amount", r: (r) => inr(r.amount) },
        { k: "gst", l: "GST", r: (r) => r.gst + "%" },
        { k: "total", l: "Total", r: (r) => inr(r.total) },
        { k: "status", l: "Status" },
      ]}
    />
  );
}
