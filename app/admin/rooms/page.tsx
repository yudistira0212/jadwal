import { prisma } from "../../lib/prisma";
import { deleteRoom } from "@/app/actions/manage-data";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
import CreateRoomButton from "../../components/admin/CreateRoomButton";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Ruangan</h1>
        <CreateRoomButton />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Nama Ruangan</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-700">{r.name}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Link
                    href={`/admin/rooms/${r.id}`}
                    className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                  <DeleteButton id={r.id} deleteAction={deleteRoom} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
