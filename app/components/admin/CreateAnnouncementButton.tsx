"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { createAnnouncement } from "@/app/actions/announcement";
import ImageInput from "../../components/ImageInput";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateAnnouncementButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createAnnouncement(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-pink-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" /> Tambah Info
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Buat Pengumuman"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Judul
            </label>
            <input
              name="title"
              placeholder="Cth: Libur Semester"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">
              Isi Pengumuman
            </label>
            <textarea
              name="content"
              rows={3}
              className="w-full border p-3 rounded-lg"
              placeholder="Tulis detail..."
            ></textarea>
          </div>
          <ImageInput />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 disabled:bg-gray-400 mt-4"
          >
            {isLoading ? "Upload..." : "Simpan Pengumuman"}
          </button>
        </form>
      </Modal>
    </>
  );
}
