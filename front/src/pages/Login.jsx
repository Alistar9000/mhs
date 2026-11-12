import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import LoginLoader from "../components/ui/LoginLoarder";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });
  // const [errorMessa,setError] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const ok = await login(form);
    if (ok) navigate("/dashboard");
  };

  return (
    <div
      dir="rtl"
      className=" h-screen bg-slate-100 flex justify-center items-center w-[100vw]"
    >
      <div className="flex flex-col gap-3 bg-white p-8 shadow-md rounded-xl min-w-80  mx-auto">
        <div className="aspect-square rounded-full ring-4 ring-blue-100 w-10 overflow-hidden">

         <img src="/mhs2.png" className="object-cover" />
        </div>
        <h2 className="text-center mb-5 font-bold text-xl">ورود به سیستم</h2>
        <label htmlFor="" className="text-slate-400 ">
          نام کاربری
        </label>

        <input
          type="text"
          className="border rounded p-2"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <label htmlFor="" className="text-slate-400 ">
          رمز عبور
        </label>
        <input
          type="password"
          className="border rounded p-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 mt-4 flex items-center gap-4 justify-center text-white rounded h-12 overflow-hidden"
          disabled={loading}
        >
          {/* {loading ? "در حال ورود..." : "ورود"} */}
          ورود
          {loading && <LoginLoader borderColor={'border-blue-600'} />}
        </button>
        {error && (
          <p className="text-red-500 text-sm">نام کاربری یا رمزعبور اشتباه است!</p>
        )}
      </div>
    </div>
  );
}
