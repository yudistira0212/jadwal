import Link from "next/link";
import { prisma } from "../lib/prisma"; // Pastikan path import benar
import { getSession } from "../lib/auth"; // Import Helper Session
import { UserCircleIcon, BellIcon } from "@heroicons/react/24/solid";

export default async function AdminDashboard() {
  // 1. Ambil Session User (Untuk Navbar)
  const session = await getSession();

  // 2. Ambil Data Statistik (Parallel Fetching agar cepat)
  const [
    dosenCount,
    mkCount,
    roomCount,
    classCount,
    jadwalCount,
    announcementCount, // <--- DATA BARU
    allSchedules,
  ] = await Promise.all([
    prisma.lecturer.count(),
    prisma.subject.count(),
    prisma.room.count(),
    prisma.studyClass.count(),
    prisma.schedule.count(),
    prisma.announcement.count(), // <--- Hitung Pengumuman
    // Ambil detail jadwal untuk ditampilkan di Grid
    prisma.schedule.findMany({
      include: {
        subject: true,
        lecturer: true,
        room: true,
        studyClass: true,
      },
      orderBy: { startTime: "asc" },
    }),
  ]);

  // 3. Persiapan Data Kalender & Tanggal
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = today.toLocaleDateString("id-ID", options);

  // Array Hari untuk Looping Grid
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return (
    <div className="pb-10">
      {/* --- NAVBAR PROFIL (BARU) --- */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            👋 Halo,{" "}
            <span className="text-cyan-600 capitalize">
              {session?.username || "Admin"}
            </span>
          </h2>
          <p className="text-xs text-gray-400">
            Selamat datang kembali di Panel Admin.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Tombol Notifikasi (Hiasan) */}
          <button className="relative p-2 text-gray-400 hover:text-cyan-600 transition">
            <BellIcon className="h-6 w-6" />
            {/* <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span> */}
          </button>

          {/* Profil Admin */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-700 capitalize">
                {session?.username || "Super Admin"}
              </p>
              <p className="text-xs text-green-500 font-medium">● Online</p>
            </div>
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden border-2 border-white shadow">
              <UserCircleIcon className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* --- HEADER JUDUL --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Overview Statistik
          </h1>
          <p className="text-gray-500 text-sm">
            Ringkasan data akademik terkini.
          </p>
        </div>

        {/* Widget Tanggal */}
        <div className="bg-white border-l-4 border-cyan-500 shadow-sm px-6 py-2 rounded-r-lg">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Hari ini
          </p>
          <p className="text-base font-bold text-gray-800">{currentDate}</p>
        </div>
      </div>

      {/* --- STATISTIK CARDS (GRID UPDATE 6 KOLOM) --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        <StatCard
          icon="👨‍🏫"
          count={dosenCount}
          label="Dosen"
          href="/admin/lecturers"
          color="cyan"
        />
        <StatCard
          icon="📚"
          count={mkCount}
          label="Mata Kuliah"
          href="/admin/subjects"
          color="purple"
        />
        <StatCard
          icon="🏢"
          count={roomCount}
          label="Ruangan"
          href="/admin/rooms"
          color="orange"
        />
        <StatCard
          icon="👥"
          count={classCount}
          label="Kelas"
          href="/admin/classes"
          color="teal" // Ganti warna biar variatif
        />
        <StatCard
          icon="🗓️"
          count={jadwalCount}
          label="Jadwal Kuliah"
          href="/admin/schedules"
          color="blue"
        />
        {/* KARTU PENGUMUMAN BARU */}
        <StatCard
          icon="📢"
          count={announcementCount}
          label="Info / Pengumuman"
          href="/admin/announcements"
          color="pink"
        />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* KIRI: GRID JADWAL MINGGUAN */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📅 Jadwal Perkuliahan Minggu Ini
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {days.map((day) => {
              const daySchedules = allSchedules.filter((s) => s.day === day);

              return (
                <div
                  key={day}
                  className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col h-full"
                >
                  <div
                    className={`p-3 font-bold text-center text-white ${
                      daySchedules.length > 0 ? "bg-cyan-600" : "bg-gray-400"
                    }`}
                  >
                    {day}
                  </div>

                  <div className="p-4 flex-1">
                    {daySchedules.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-400 text-xs italic py-6">
                        - Kosong -
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {daySchedules.map((s) => (
                          <li
                            key={s.id}
                            className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {s.startTime} - {s.endTime}
                              </span>
                              <span className="text-[10px] font-bold text-cyan-600 border border-cyan-200 px-1 rounded">
                                {s.room.name}
                              </span>
                            </div>
                            <p
                              className="font-bold text-xs text-gray-800 line-clamp-1"
                              title={s.subject.name}
                            >
                              {s.subject.name}
                            </p>
                            <div className="flex justify-between items-end mt-1">
                              <p className="text-[10px] text-gray-500 line-clamp-1 w-2/3">
                                {s.lecturer.name}
                              </p>
                              <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 rounded font-medium">
                                {s.studyClass.name}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KANAN: SIDEBAR KALENDER VISUAL */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Kalender</h3>

            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-red-500 text-white text-center py-2 font-bold uppercase tracking-widest text-sm">
                {today.toLocaleDateString("id-ID", { month: "long" })}
              </div>
              <div className="bg-white text-center py-6">
                <span className="text-5xl font-bold text-gray-800">
                  {today.getDate()}
                </span>
                <p className="text-gray-500 font-medium text-sm mt-1">
                  {today.toLocaleDateString("id-ID", { weekday: "long" })}
                </p>
              </div>
              <div className="bg-gray-50 p-2 text-center border-t">
                <p className="text-xs text-gray-500">
                  Tahun {today.getFullYear()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-gray-700 text-xs uppercase mb-3 tracking-wider">
                Aksi Cepat
              </h4>
              <div className="space-y-2">
                <Link
                  href="/admin/schedules"
                  className="block w-full text-center py-2 rounded bg-cyan-50 text-cyan-700 font-bold text-sm hover:bg-cyan-100 transition"
                >
                  + Tambah Jadwal
                </Link>
                <Link
                  href="/admin/announcements"
                  className="block w-full text-center py-2 rounded bg-pink-50 text-pink-700 font-bold text-sm hover:bg-pink-100 transition"
                >
                  + Buat Pengumuman
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="block w-full text-center py-2 rounded bg-gray-800 text-white font-bold text-sm hover:bg-gray-900 transition items-center justify-center gap-2"
                >
                  <span>📺</span> Lihat Monitor TV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Kecil untuk Card Statistik
function StatCard({ icon, count, label, href, color }: any) {
  const hoverColor = {
    cyan: "hover:border-cyan-500 group-hover:text-cyan-600",
    purple: "hover:border-purple-500 group-hover:text-purple-600",
    orange: "hover:border-orange-500 group-hover:text-orange-600",
    pink: "hover:border-pink-500 group-hover:text-pink-600",
    blue: "hover:border-blue-500 group-hover:text-blue-600",
    teal: "hover:border-teal-500 group-hover:text-teal-600",
  };

  const selectedColor =
    hoverColor[color as keyof typeof hoverColor] || hoverColor.cyan;

  return (
    <Link href={href} className="block group h-full">
      <div
        className={`bg-white p-4 rounded-xl shadow border border-gray-100 transition h-full flex flex-col justify-between ${selectedColor}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-xl font-bold text-gray-700">{count}</span>
        </div>
        <h3
          className={`font-semibold text-gray-600 text-xs uppercase tracking-wide ${selectedColor}`}
        >
          {label}
        </h3>
      </div>
    </Link>
  );
}
