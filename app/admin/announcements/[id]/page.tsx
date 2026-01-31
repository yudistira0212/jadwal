import { prisma } from "../../../lib/prisma";
import { updateAnnouncement } from "@/app/actions/announcement";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageInput from "../../../components/ImageInput";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await prisma.announcement.findUnique({ where: { id } });

  if (!data) redirect("/admin/announcements");

  const updateAction = updateAnnouncement.bind(null, data.id);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-10 border-t-4 border-pink-500">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Pengumuman</h1>

      <form action={updateAction} className="flex flex-col gap-6">
        <div>
          <label className="font-bold text-gray-700 block mb-2 text-sm">
            Judul
          </label>
          <input
            name="title"
            defaultValue={data.title}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 text-sm block mb-2">
            Deskripsi / Isi Pengumuman
          </label>
          <textarea
            name="content"
            rows={5}
            defaultValue={data.content || ""}
            className="w-full border p-3 rounded"
          ></textarea>
        </div>

        <ImageInput defaultImage={data.image} />

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 bg-pink-600 text-white py-3 rounded font-bold hover:bg-pink-700"
          >
            Simpan Perubahan
          </button>
          <Link
            href="/admin/announcements"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-bold text-center hover:bg-gray-300 flex items-center justify-center"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
