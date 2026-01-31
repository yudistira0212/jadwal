import { prisma } from "../../../lib/prisma";
import { updateSubject } from "@/app/actions/manage-data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "../../../components/SubmitButton";

export default async function EditSubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subject = await prisma.subject.findUnique({ where: { id } });

  if (!subject) redirect("/admin/subjects");

  const updateAction = updateSubject.bind(null, subject.id);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow mt-10 border-t-4 border-purple-500">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Mata Kuliah
      </h1>

      <form action={updateAction} className="flex flex-col gap-4">
        <div>
          <label className="font-bold text-sm text-gray-600">Kode MK</label>
          <input
            name="code"
            defaultValue={subject.code}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="font-bold text-sm text-gray-600">
            Nama Mata Kuliah
          </label>
          <input
            name="name"
            defaultValue={subject.name}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="font-bold text-sm text-gray-600">SKS</label>
          <input
            name="sks"
            type="number"
            defaultValue={subject.sks}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        {/* DROPDOWN PRODI */}
        <div>
          <label className="font-bold text-sm text-gray-600">
            Program Studi
          </label>
          <select
            name="prodi"
            defaultValue={subject.prodi} // Load prodi lama
            className="w-full border p-3 rounded bg-white"
            required
          >
            <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
            <option value="D3 Teknik Komputer">D3 Teknik Komputer</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <SubmitButton label="Simpan Perubahan" />
          <Link
            href="/admin/subjects"
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-bold text-center hover:bg-gray-300 flex items-center justify-center"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
