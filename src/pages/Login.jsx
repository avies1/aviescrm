import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Logo, btn, inp, Card } from "../lib.jsx";
export default function Login() {
  const [u, setU] = useState(""),
    [p, setP] = useState(""),
    [show, setShow] = useState(false),
    [err, setErr] = useState(""),
    go = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (!u.trim() || !p) return setErr("Enter username and password");
    localStorage.setItem("auth", u.trim());
    go("/");
  };
  return (
    <div className="min-h-screen grid place-items-center bg-soft p-4">
      <Card className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo size={48} />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            className={inp}
            placeholder="Email / Username"
            value={u}
            onChange={(e) => setU(e.target.value)}
          />
          <div className="relative">
            <input
              className={inp}
              type={show ? "text" : "password"}
              placeholder="Password"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button className={btn + " w-full justify-center"}>Login</button>
        </form>
      </Card>
    </div>
  );
}
