import { prisma } from "../../lib/prisma";
import { deleteSubject } from "@/app/actions/manage-data";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
import CreateSubjectButton from "../../components/admin/CreateSubjectButton";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mata Kuliah</h1>
        <CreateSubjectButton />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Kode</th>
              <th className="p-4">Nama MK</th>
              <th className="p-4">SKS</th>
              <th className="p-4">Prodi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-purple-600 font-bold">
                  {s.code}
                </td>
                <td className="p-4 font-bold">{s.name}</td>
                <td className="p-4">{s.sks}</td>
                <td className="p-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">
                    {s.prodi}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Link
                    href={`/admin/subjects/${s.id}`}
                    className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                  <DeleteButton id={s.id} deleteAction={deleteSubject} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
