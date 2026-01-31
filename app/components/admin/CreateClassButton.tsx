"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { createClass } from "@/app/actions/manage-data";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateClassButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createClass(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-teal-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" /> Tambah Kelas
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Kelas Baru"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Nama Kelas
            </label>
            <input
              name="name"
              placeholder="Cth: TI-A 2023"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 disabled:bg-gray-400 mt-4"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </>
  );
}
