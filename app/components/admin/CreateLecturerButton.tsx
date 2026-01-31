"use client";

import { useState } from "react";
import Modal from "../Modal"; // Import Modal yang tadi kita buat
import { createLecturer } from "@/app/actions/manage-data"; // Import Server Action
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateLecturerButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Wrapper function untuk handle submit & tutup modal
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createLecturer(formData); // Panggil Server Action
    setIsLoading(false);
    setIsOpen(false); // Tutup modal setelah selesai
  }

  return (
    <>
      {/* 1. TOMBOL PEMICU (Muncul di Halaman Admin) */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-cyan-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" />
        Tambah Dosen
      </button>

      {/* 2. MODAL POPUP (Berisi Form) */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Dosen Baru"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Nama Lengkap
            </label>
            <input
              name="name"
              placeholder="Cth: Dr. Budi Santoso, M.Kom"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Kode Dosen
            </label>
            <input
              name="code"
              placeholder="Cth: DS-001"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-cyan-600 text-white py-2 rounded-lg font-bold hover:bg-cyan-700 transition disabled:bg-gray-400"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
