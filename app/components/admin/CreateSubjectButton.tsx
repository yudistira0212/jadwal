"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { createSubject } from "@/app/actions/manage-data";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateSubjectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createSubject(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" /> Tambah MK
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Mata Kuliah"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Kode MK
            </label>
            <input
              name="code"
              placeholder="Cth: IF-101"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Nama Mata Kuliah
            </label>
            <input
              name="name"
              placeholder="Cth: Algoritma"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              SKS
            </label>
            <input
              name="sks"
              type="number"
              placeholder="3"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Prodi
            </label>
            <select
              name="prodi"
              className="w-full border p-3 rounded-lg bg-white"
              required
            >
              <option value="S1 Teknik Informatika">
                S1 Teknik Informatika
              </option>
              <option value="D3 Teknik Komputer">D3 Teknik Komputer</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:bg-gray-400 mt-4"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </>
  );
}
