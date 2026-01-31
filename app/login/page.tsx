"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions/auth-action"; // Kita buat sebentar lagi
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await loginAction(formData);

    if (result?.success) {
      router.push("/admin"); // Redirect ke admin jika sukses
    } else {
      setError(result?.message || "Gagal Login");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-cyan-500">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 text-sm">
            Silakan login untuk mengelola jadwal.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center font-bold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <UserIcon className="h-5 w-5" />
              </span>
              <input
                name="username"
                type="text"
                required
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <LockClosedIcon className="h-5 w-5" />
              </span>
              <input
                name="password"
                type="password"
                required
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition disabled:bg-gray-400"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Sistem Jadwal Kuliah
        </div>
      </div>
    </div>
  );
}
