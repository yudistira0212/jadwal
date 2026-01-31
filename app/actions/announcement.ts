"use server";

import { prisma } from "../lib/prisma";
import { saveFile, deleteFile } from "../lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string; // <--- Ambil Content
  const file = formData.get("image") as File;

  let imagePath = "";
  if (file && file.size > 0) {
    imagePath = await saveFile(file);
  }

  await prisma.announcement.create({
    data: { title, content, image: imagePath },
  });

  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncement(id: string) {
  try {
    const data = await prisma.announcement.findUnique({ where: { id } });

    // Hapus file gambar jika ada
    if (data?.image) {
      await deleteFile(data.image);
    }

    // Hapus data dari DB
    await prisma.announcement.delete({ where: { id } });

    revalidatePath("/admin/announcements");

    // PENTING: Harus return object ini agar DeleteButton tidak error
    return { success: true, message: "Pengumuman berhasil dihapus" };
  } catch (error) {
    console.error("Gagal hapus pengumuman:", error);
    return { success: false, message: "Gagal menghapus pengumuman" };
  }
}

export async function updateAnnouncement(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string; // <--- Ambil Content
  const file = formData.get("image") as File;

  const oldData = await prisma.announcement.findUnique({ where: { id } });

  let imagePath = oldData?.image;

  if (file && file.size > 0) {
    if (oldData?.image) await deleteFile(oldData.image);
    imagePath = await saveFile(file);
  }

  await prisma.announcement.update({
    where: { id },
    data: { title, content, image: imagePath },
  });

  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}
