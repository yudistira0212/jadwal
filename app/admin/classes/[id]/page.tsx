import { prisma } from "../../../lib/prisma";
import { updateClass } from "@/app/actions/manage-data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await params

  // Ingat pakai studyClass
  const studyClass = await prisma.studyClass.findUnique({ where: { id } });
  if (!studyClass) redirect("/admin/classes");

  const updateAction = updateClass.bind(null, studyClass.id);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Data Kelas</h1>

      <form action={updateAction} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nama Kelas
          </label>
          <input
            name="name"
            defaultValue={studyClass.name}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          <SubmitButton
            label="Simpan"
            className=""
            loadingLabel="Sedang Menyimpan..."
          />
          <Link
            href="/admin/classes"
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-bold text-center hover:bg-gray-300 transition"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
