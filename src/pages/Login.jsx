import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Avieslogo from "../../assets/al.webp";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const emailRef = useRef(null);
  const go = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (!u.trim() || !p) {
      setErr("Please enter email and password");
      return;
    }

    setErr("");
    localStorage.setItem("auth", u.trim());
    go("/");
  };

  return (
    <div
      className="min-h-screen bg-[#E8F5F7] flex
      items-center justify-center p-4 sm:p-6"
    >
      {/* MAIN CONTAINER */}
      <div
        className="w-full max-w-[1050px] min-h-[600px]
        bg-white rounded-xl overflow-hidden
        shadow-[0_25px_80px_rgba(0,0,0,0.20)]
        flex flex-col md:flex-row"
      >
        {/* LEFT SIDE */}
        <div
          className="relative w-full md:w-[40%]
          min-h-[280px] md:min-h-[600px]
          bg-[#078DA3] flex flex-col
          items-center justify-center
          text-white px-8 py-12 overflow-hidden"
        >
          {/* DECORATIVE CIRCLES */}
          <div
            className="absolute -top-20 -right-20
            w-64 h-64 rounded-full
            bg-white/10"
          />

          <div
            className="absolute -bottom-24 -left-16
            w-72 h-72 rounded-full
            bg-white/10"
          />

          {/* LOGO */}
          <div className="relative z-10">
            <img
              src={Avieslogo}
              alt="AVIES Logo"
              className="w-[170px] h-auto object-contain"
            />
          </div>

          {/* WELCOME CONTENT */}
          <div className="relative z-10 text-center -mt-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-5">
              Welcome Back!
            </h1>
            <p
              className="text-sm md:text-base
              text-white/85 leading-7 max-w-[280px] mx-auto"
            >
              Stay connected with us by signing in with your personal details.
            </p>

            {/* <button
              type="button"
              onClick={() => emailRef.current?.focus()}
              className="mt-9 px-12 py-3
                border border-white/80
                rounded-full text-sm font-semibold
                tracking-wider text-white
                hover:bg-white hover:text-[#078DA3]
                transition-all duration-300"
            >
              SIGN IN
            </button> */}
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div
          className="w-full md:w-[60%]
          min-h-[550px] md:min-h-[600px]
          bg-white flex items-center justify-center
          px-7 sm:px-12 lg:px-20 py-12"
        >
          <div className="w-full max-w-[390px]">
            {/* HEADING */}
            <div className="text-center mb-9">
              <h2
                className="text-3xl font-bold
                text-[#078DA3] mb-3"
              >
                SIGN IN
              </h2>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={submit} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label
                  className="block text-sm
                  font-medium text-gray-600 mb-2"
                >
                  Email
                </label>

                <input
                  ref={emailRef}
                  type="text"
                  placeholder="Enter your email"
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  className="w-full h-12 px-4
                    bg-[#F2F8F8] border border-transparent
                    rounded-md text-sm text-gray-700
                    outline-none
                    focus:bg-white
                    focus:border-[#078DA3]
                    focus:ring-2 focus:ring-[#078DA3]/10
                    transition-all duration-300"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  className="block text-sm
                  font-medium text-gray-600 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    value={p}
                    onChange={(e) => setP(e.target.value)}
                    className="w-full h-12 px-4 pr-12
                      bg-[#F2F8F8] border border-transparent
                      rounded-md text-sm text-gray-700
                      outline-none
                      focus:bg-white
                      focus:border-[#078DA3]
                      focus:ring-2 focus:ring-[#078DA3]/10
                      transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2
                      -translate-y-1/2 text-gray-400
                      hover:text-[#078DA3]"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SHOW PASSWORD */}
              <label
                className="flex items-center gap-2
                text-sm text-gray-500 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={show}
                  onChange={(e) => setShow(e.target.checked)}
                  className="w-4 h-4 accent-[#078DA3]"
                />
                Show Password
              </label>

              {/* ERROR */}
              {err && <p className="text-sm text-red-500">{err}</p>}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full h-12
                  bg-[#078DA3] text-white
                  rounded-full text-sm font-semibold
                  tracking-wider
                  shadow-lg shadow-[#078DA3]/20
                  hover:bg-[#06778B]
                  hover:shadow-xl
                  transition-all duration-300
                  active:scale-[0.98]"
              >
                SIGN IN
              </button>
            </form>

            {/* FOOTER */}
            <div className="text-center mt-8 space-y-3">
              <p className="text-sm text-gray-500">
                Forgot{" "}
                <button
                  type="button"
                  className="text-[#078DA3] font-medium
                    hover:underline"
                >
                  Password?
                </button>
              </p>

              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-[#078DA3] font-semibold
                    hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
