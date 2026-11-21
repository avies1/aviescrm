import { Crud, SERVICES } from "../lib.jsx";
import { clientFields } from "../config.js";

export default function Clients() {
  return (
    <Crud
      title="Clients"
      k="clients"
      fields={clientFields}
      prefix="CL"
      addTo="/new-clients"
      editTo="/new-clients/"
      addLabel="Add New Client"
      placeholder="Search clients by name, company, or service..."
      filters={[
        {
          k: "services",
          l: "All Services",
          o: SERVICES,
        },
        {
          k: "status",
          l: "All Status",
        },
      ]}
      cols={[
        { k: "id", l: "Client ID" },
        { k: "name", l: "Client Name" },
        { k: "company", l: "Company Name" },
        { k: "mobile", l: "Contact Number" },
        { k: "email", l: "Email" },
        { k: "services", l: "Services" },
        { k: "joining", l: "Joining Date" },
        { k: "status", l: "Status" },
      ]}
    />
  );
}