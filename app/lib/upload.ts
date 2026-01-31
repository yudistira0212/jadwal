import fs from "node:fs/promises";
import path from "node:path";

export async function saveFile(file: File): Promise<string> {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);

  // Buat nama file unik (timestamp + nama asli)
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Pastikan folder ada
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  // Return path relatif untuk database
  return `/uploads/${fileName}`;
}

export async function deleteFile(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error("Gagal hapus file:", error);
  }
}
