import { prisma } from "../../../lib/prisma";
import { getMasterData } from "@/app/actions/get-schedule";
import { updateSchedule } from "@/app/actions/manage-data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "../../../components/SubmitButton"; // Gunakan tombol loading kita
import TimeSelector from "@/app/components/TimeSelector";

export default async function EditSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Ambil data jadwal lama
  const schedule = await prisma.schedule.findUnique({ where: { id } });

  // 2. Ambil data master untuk Dropdown (termasuk rooms & classes)
  const { lecturers, subjects, rooms, classes } = await getMasterData();

  if (!schedule) redirect("/admin/schedules");

  const updateAction = updateSchedule.bind(null, schedule.id);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-10 border-t-4 border-orange-500">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Jadwal Perkuliahan
      </h1>

      <form
        action={updateAction}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* --- MATA KULIAH --- */}
        <div className="md:col-span-2">
          <label className="label-text">Mata Kuliah</label>
          <select
            name="subjectId"
            defaultValue={schedule.subjectId}
            className="input-field"
            required
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name} ({s.sks} SKS)
              </option>
            ))}
          </select>
        </div>

        {/* --- DOSEN --- */}
        <div className="md:col-span-2">
          <label className="label-text">Dosen Pengampu</label>
          <select
            name="lecturerId"
            defaultValue={schedule.lecturerId}
            className="input-field"
            required
          >
            {lecturers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- HARI --- */}
        <div>
          <label className="label-text">Hari</label>
          <select
            name="day"
            defaultValue={schedule.day}
            className="input-field"
            required
          >
            {[
              "Senin",
              "Selasa",
              "Rabu",
              "Kamis",
              "Jumat",
              "Sabtu",
              "Minggu",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* --- RUANGAN (SUDAH JADI DROPDOWN) --- */}
        <div>
          <label className="label-text">Ruangan</label>
          <select
            name="roomId" // Pastikan namanya roomId
            defaultValue={schedule.roomId} // Ambil ID Ruangan lama
            className="input-field"
            required
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- KELAS (SUDAH JADI DROPDOWN) --- */}
        <div className="md:col-span-2">
          <label className="label-text">Kelas</label>
          <select
            name="classId" // Pastikan namanya classId
            defaultValue={schedule.classId} // Ambil ID Kelas lama
            className="input-field"
            required
          >
            {/* Looping data classes (studyClass) */}
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- JAM MULAI & SELESAI --- */}
        {/* <div>
          <label className="label-text">Jam Mulai</label>
          <input
            type="time"
            name="startTime"
            defaultValue={schedule.startTime}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label-text">Jam Selesai</label>
          <input
            type="time"
            name="endTime"
            defaultValue={schedule.endTime}
            className="input-field"
            required
          />
        </div> */}

        <div>
          <TimeSelector
            label="Jam Mulai"
            name="startTime"
            defaultValue={schedule.startTime} // Load jam lama
          />
        </div>

        <div>
          <TimeSelector
            label="Jam Selesai"
            name="endTime"
            defaultValue={schedule.endTime} // Load jam lama
          />
        </div>

        {/* --- TOMBOL AKSI --- */}
        <div className="md:col-span-2 flex gap-3 mt-4">
          <SubmitButton label="Simpan Perubahan" loadingLabel="Menyimpan..." />

          <Link
            href="/admin/schedules"
            className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded text-center hover:bg-gray-300 flex items-center justify-center"
          >
            Batal
          </Link>
        </div>
      </form>

      {/* Helper CSS (Sesuai style Anda sebelumnya) */}
      <style>{`
        .label-text { display: block; font-size: 0.875rem; font-weight: 700; color: #374151; margin-bottom: 0.25rem; }
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background-color: #f9fafb; outline: none; }
        .input-field:focus { border-color: #ea580c; ring: 2px solid #ea580c; }
      `}</style>
    </div>
  );
}
