import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // your axios instance
import { useAuth } from "../context/AuthContext"; // custom auth context

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "guardian" | "admin";
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token, res.data.user);
      navigate(`/${res.data.user.role}-dashboard`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111714] p-6">
      <div className="w-full max-w-md bg-[#1c2620] p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-[#3d5245] bg-[#111714] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-[#3d5245] bg-[#111714] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-[#3d5245] bg-[#111714] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as RegisterForm["role"] })
            }
            className="border border-[#3d5245] bg-[#111714] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="guardian">Guardian</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-emerald-500 text-[#111714] p-3 rounded-full font-bold hover:bg-emerald-400 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
