"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { createRoom } from "@/app/actions/manage-data";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateRoomButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createRoom(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" /> Tambah Ruangan
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Ruangan Baru"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Nama Ruangan
            </label>
            <input
              name="name"
              placeholder="Cth: Lab Komputer 1"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 disabled:bg-gray-400 mt-4"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </Modal>
    </>
  );
}
