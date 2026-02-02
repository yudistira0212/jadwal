import { prisma } from "../lib/prisma";
import MonitorScreen from "../components/monitor/MonitorScreen";
// Revalidate tiap 60 detik agar jika ada perubahan jadwal oleh admin, TV akan update otomatis
export const revalidate = 120;

export default async function MonitorPage() {
  // Ambil semua jadwal (biar client yang filter sendiri)
  const schedules = await prisma.schedule.findMany({
    include: {
      lecturer: true,
      subject: true,
      room: true,
      studyClass: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    // Kirim data ke Client Component
    <MonitorScreen initialSchedules={schedules} />
  );
}
