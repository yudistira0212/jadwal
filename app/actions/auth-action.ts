"use server";

import { prisma } from "../lib/prisma";
import { createSession, logout } from "../lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 1. Cari user di DB
  const user = await prisma.admin.findUnique({
    where: { username },
  });

  // 2. Jika user tidak ada
  if (!user) {
    return { success: false, message: "Username tidak ditemukan." };
  }

  // 3. Cek Password (Hash match)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Password salah." };
  }

  // 4. Buat Session
  await createSession(user.username);

  return { success: true };
}

export async function logoutAction() {
  await logout();
  redirect("/login");
}
