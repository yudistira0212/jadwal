"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ============================================================================
// 1. MANAJEMEN DOSEN (LECTURER)
// ============================================================================

export async function createLecturer(formData: FormData) {
  await prisma.lecturer.create({
    data: {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
    },
  });
  revalidatePath("/admin/lecturers");
}

export async function updateLecturer(id: string, formData: FormData) {
  await prisma.lecturer.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
    },
  });
  revalidatePath("/admin/lecturers");
  redirect("/admin/lecturers");
}

export async function deleteLecturer(id: string) {
  try {
    await prisma.lecturer.delete({ where: { id } });
    revalidatePath("/admin/lecturers");
    return { success: true, message: "Data Dosen berhasil dihapus." };
  } catch (error: any) {
    if (error.code === "P2003") {
      return {
        success: false,
        message:
          "Gagal! Dosen ini masih memiliki Jadwal Mengajar. Hapus jadwalnya dulu.",
      };
    }
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// ============================================================================
// 2. MANAJEMEN MATA KULIAH (SUBJECT)
// ============================================================================

export async function createSubject(formData: FormData) {
  await prisma.subject.create({
    data: {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      sks: Number(formData.get("sks") || 0),
      prodi: formData.get("prodi") as string, // <--- TAMBAHAN
    },
  });
  revalidatePath("/admin/subjects");
}

export async function updateSubject(id: string, formData: FormData) {
  await prisma.subject.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      sks: Number(formData.get("sks") || 0),
      prodi: formData.get("prodi") as string, // <--- TAMBAHAN
    },
  });
  revalidatePath("/admin/subjects");
  redirect("/admin/subjects");
}

export async function deleteSubject(id: string) {
  try {
    await prisma.subject.delete({ where: { id } });
    revalidatePath("/admin/subjects");
    return { success: true, message: "Mata Kuliah berhasil dihapus." };
  } catch (error: any) {
    if (error.code === "P2003") {
      return {
        success: false,
        message:
          "Gagal! Mata Kuliah ini masih ada di dalam Jadwal. Hapus jadwalnya dulu.",
      };
    }
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// ============================================================================
// 3. MANAJEMEN RUANGAN (ROOM)
// ============================================================================

export async function createRoom(formData: FormData) {
  await prisma.room.create({
    data: { name: formData.get("name") as string },
  });
  revalidatePath("/admin/rooms");
}

export async function updateRoom(id: string, formData: FormData) {
  await prisma.room.update({
    where: { id },
    data: { name: formData.get("name") as string },
  });
  revalidatePath("/admin/rooms");
  redirect("/admin/rooms");
}

export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({ where: { id } });
    revalidatePath("/admin/rooms");
    return { success: true, message: "Ruangan berhasil dihapus." };
  } catch (error: any) {
    if (error.code === "P2003") {
      return {
        success: false,
        message:
          "Gagal! Ruangan ini sedang dipakai di Jadwal. Hapus jadwalnya dulu.",
      };
    }
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// ============================================================================
// 4. MANAJEMEN KELAS (STUDY CLASS)
// ============================================================================

export async function createClass(formData: FormData) {
  await prisma.studyClass.create({
    data: { name: formData.get("name") as string },
  });
  revalidatePath("/admin/classes");
}

export async function updateClass(id: string, formData: FormData) {
  await prisma.studyClass.update({
    where: { id },
    data: { name: formData.get("name") as string },
  });
  revalidatePath("/admin/classes");
  redirect("/admin/classes");
}

export async function deleteClass(id: string) {
  try {
    await prisma.studyClass.delete({ where: { id } });
    revalidatePath("/admin/classes");
    return { success: true, message: "Kelas berhasil dihapus." };
  } catch (error: any) {
    if (error.code === "P2003") {
      return {
        success: false,
        message:
          "Gagal! Kelas ini masih memiliki Jadwal aktif. Hapus jadwalnya dulu.",
      };
    }
    return { success: false, message: "Terjadi kesalahan sistem." };
  }
}

// ============================================================================
// 5. MANAJEMEN JADWAL (SCHEDULE)
// ============================================================================

export async function createSchedule(formData: FormData) {
  await prisma.schedule.create({
    data: {
      subjectId: formData.get("subjectId") as string,
      lecturerId: formData.get("lecturerId") as string,
      roomId: formData.get("roomId") as string,
      classId: formData.get("classId") as string,
      day: formData.get("day") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/schedules");
}

export async function updateSchedule(id: string, formData: FormData) {
  await prisma.schedule.update({
    where: { id },
    data: {
      subjectId: formData.get("subjectId") as string,
      lecturerId: formData.get("lecturerId") as string,
      roomId: formData.get("roomId") as string,
      classId: formData.get("classId") as string,
      day: formData.get("day") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/schedules");
  redirect("/admin/schedules");
}

export async function deleteSchedule(id: string) {
  try {
    await prisma.schedule.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/schedules");
    return { success: true, message: "Jadwal berhasil dihapus." };
  } catch (error) {
    return { success: false, message: "Gagal menghapus jadwal." };
  }
}
