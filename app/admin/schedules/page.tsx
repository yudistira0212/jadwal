import { prisma } from "../../lib/prisma"; // Sesuaikan path import Anda
import { getMasterData } from "@/app/actions/get-schedule";
import { deleteSchedule } from "@/app/actions/manage-data";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
import CreateScheduleButton from "../../components/admin/CreateScheduleButton";
import Search from "../../components/Search"; // Import komponen Search baru
import { PencilSquareIcon } from "@heroicons/react/16/solid";

// 1. Terima props searchParams
export default async function SchedulesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || ""; // Ambil text pencarian

  // Ambil semua data pendukung
  const { lecturers, subjects, rooms, classes } = await getMasterData();

  // 2. Update Query Prisma dengan Filter
  const schedules = await prisma.schedule.findMany({
    where: {
      OR: [
        // Cari berdasarkan Nama Mata Kuliah
        { subject: { name: { contains: query, mode: "insensitive" } } },
        // Cari berdasarkan Nama Dosen
        { lecturer: { name: { contains: query, mode: "insensitive" } } },
        // Cari berdasarkan Nama Ruangan
        { room: { name: { contains: query, mode: "insensitive" } } },
        // Cari berdasarkan Nama Kelas
        { studyClass: { name: { contains: query, mode: "insensitive" } } },
        // Cari berdasarkan Kode Mata Kuliah
        { subject: { code: { contains: query, mode: "insensitive" } } },
        // cari berdasarkan hari
        { day: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { subject: true, lecturer: true, room: true, studyClass: true },
    orderBy: { startTime: "asc" },
  });

  return (
    <div className="max-w-6xl pb-20">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Jadwal</h1>

          {/* Pass data ke tombol popup */}
          <CreateScheduleButton
            lecturers={lecturers}
            subjects={subjects}
            rooms={rooms}
            classes={classes}
          />
        </div>

        {/* 3. Pasang Komponen Search disini */}
        <div className="w-full md:w-1/2">
          <Search placeholder="Cari MK, Dosen, atau Ruangan..." />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Hari / Jam</th>
              <th className="p-4">Mata Kuliah</th>
              <th className="p-4">Dosen</th>
              <th className="p-4">Ruangan / Kelas</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Tidak ada jadwal yang ditemukan untuk "{query}".
                </td>
              </tr>
            ) : (
              schedules.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{s.day}</div>
                    <div className="text-sm text-gray-500 font-mono">
                      {s.startTime} - {s.endTime}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-cyan-700">
                    {s.subject.name}
                  </td>
                  <td className="p-4 text-sm">{s.lecturer.name}</td>
                  <td className="p-4">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-bold mr-1">
                      {s.room.name}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                      {s.studyClass.name}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2 items-center">
                    <Link
                      href={`/admin/schedules/${s.id}`}
                      className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <DeleteButton id={s.id} deleteAction={deleteSchedule} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
