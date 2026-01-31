import { prisma } from "../../lib/prisma";
import { deleteClass } from "@/app/actions/manage-data";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
import CreateClassButton from "../../components/admin/CreateClassButton";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default async function ClassesPage() {
  const classes = await prisma.studyClass.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Kelas</h1>
        <CreateClassButton />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Nama Kelas</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-700">{c.name}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Link
                    href={`/admin/classes/${c.id}`}
                    className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                  <DeleteButton id={c.id} deleteAction={deleteClass} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
