import { prisma } from "../../../lib/prisma";
import { updateLecturer } from "@/app/actions/manage-data";
import { SubmitButton } from "@/app/components/SubmitButton";
import Link from "next/link";
import { redirect } from "next/navigation";

// 1. Ubah tipe data params menjadi Promise
export default async function EditLecturerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. Wajib AWAIT params terlebih dahulu
  const { id } = await params;

  const lecturer = await prisma.lecturer.findUnique({ where: { id } });

  if (!lecturer) redirect("/admin/lecturers");

  const updateAction = updateLecturer.bind(null, lecturer.id);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Data Dosen</h1>
      <form action={updateAction} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Dosen</label>
          <input
            name="name"
            defaultValue={lecturer.name}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kode Dosen</label>
          <input
            name="code"
            defaultValue={lecturer.code || ""}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex gap-2 mt-4">
          {/* <button
            type="submit"
            className="flex-1 btn-outline-danger bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 hover:cursor-pointer"
          >
            Simpan Perubahan
          </button> */}
          <SubmitButton
            label="Simpan"
            className=""
            loadingLabel="Sedang Menyimpan..."
          />
          <Link
            href="/admin/lecturers"
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-bold text-center hover:bg-gray-300 hover:cursor-pointer"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
