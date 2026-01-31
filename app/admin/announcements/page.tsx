import { prisma } from "../../lib/prisma";
import { deleteAnnouncement } from "@/app/actions/announcement";
import DeleteButton from "../../components/DeleteButton";
import Link from "next/link";
import Image from "next/image";
import CreateAnnouncementButton from "../../components/admin/CreateAnnouncementButton";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default async function AnnouncementPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Pengumuman</h1>
        <CreateAnnouncementButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="relative h-48 w-full bg-gray-100 border-b">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Tanpa Gambar
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {item.content || "Tidak ada deskripsi."}
              </p>
              <div className="mt-auto flex gap-2">
                <div className="flex items-center justify-center">
                  <Link
                    href={`/admin/announcements/${item.id}`} // Pastikan href-nya sesuai dengan data Anda
                    className="p-2 rounded-sm text-cyan-500 bg-cyan-50 hover:bg-cyan-200 hover:text-cyan-600 transition flex items-center justify-center"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <DeleteButton
                    id={item.id}
                    deleteAction={deleteAnnouncement}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
