import { prisma } from "../../../lib/prisma"; // Sesuaikan path import prisma Anda
import { updateRoom } from "@/app/actions/manage-data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // WAJIB: Await params dulu
  const { id } = await params;

  // Ambil data lama
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) redirect("/admin/rooms");

  // Siapkan action dengan ID yang di-bind
  const updateAction = updateRoom.bind(null, room.id);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Data Ruangan
      </h1>

      <form action={updateAction} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nama Ruangan
          </label>
          <input
            name="name"
            defaultValue={room.name}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          {/* <button
            type="submit"
            className="flex-1 bg-cyan-600 text-white py-2 rounded-lg font-bold hover:bg-cyan-700 transition"
          >
            Simpan
          </button> */}

          <SubmitButton label="Simpan" loadingLabel="Menyimpan..." />

          <Link
            href="/admin/rooms"
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-bold text-center hover:bg-gray-300 transition"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
