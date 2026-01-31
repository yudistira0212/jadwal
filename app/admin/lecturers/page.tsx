import { prisma } from "../../lib/prisma";
import { deleteLecturer } from "@/app/actions/manage-data";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
// IMPORT KOMPONEN BARU
import CreateLecturerButton from "../../components/admin/CreateLecturerButton";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default async function LecturersPage() {
  const lecturers = await prisma.lecturer.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Dosen</h1>

        {/* DISINI KITA PAKAI TOMBOL POPUP BARU */}
        <CreateLecturerButton />
      </div>

      {/* Tabel Data (Tetap Sama, tidak berubah) */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Kode</th>
              <th className="p-4">Nama Dosen</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-gray-400 italic"
                >
                  Belum ada data dosen.
                </td>
              </tr>
            ) : (
              lecturers.map((lecturer) => (
                <tr
                  key={lecturer.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-mono text-cyan-600 font-bold text-sm">
                    {lecturer.code}
                  </td>
                  <td className="p-4 font-medium text-gray-700">
                    {lecturer.name}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Link
                      href={`/admin/lecturers/${lecturer.id}`}
                      className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <DeleteButton
                      id={lecturer.id}
                      deleteAction={deleteLecturer}
                    />
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
