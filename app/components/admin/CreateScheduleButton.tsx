"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { createSchedule } from "@/app/actions/manage-data";
import TimeSelector from "../../components/TimeSelector";
import { PlusIcon } from "@heroicons/react/24/solid";

// Definisikan tipe data yang akan diterima dari Page
type Props = {
  lecturers: { id: string; name: string }[];
  subjects: { id: string; name: string }[];
  rooms: { id: string; name: string }[];
  classes: { id: string; name: string }[];
};

export default function CreateScheduleButton({
  lecturers,
  subjects,
  rooms,
  classes,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await createSchedule(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-cyan-700 transition shadow-lg"
      >
        <PlusIcon className="h-5 w-5" /> Tambah Jadwal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Buat Jadwal Baru"
      >
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">
                Mata Kuliah
              </label>
              <select
                name="subjectId"
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Pilih MK --</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">
                Dosen
              </label>
              <select
                name="lecturerId"
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Pilih Dosen --</option>
                {lecturers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">
                Ruangan
              </label>
              <select
                name="roomId"
                className="w-full border p-2 rounded"
                required
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">
                Kelas
              </label>
              <select
                name="classId"
                className="w-full border p-2 rounded"
                required
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">
              Hari
            </label>
            <select name="day" className="w-full border p-2 rounded" required>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TimeSelector label="Mulai" name="startTime" defaultValue="08:00" />
            <TimeSelector label="Selesai" name="endTime" defaultValue="10:00" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 disabled:bg-gray-400 mt-4"
          >
            {isLoading ? "Menyimpan..." : "Simpan Jadwal"}
          </button>
        </form>
      </Modal>
    </>
  );
}
