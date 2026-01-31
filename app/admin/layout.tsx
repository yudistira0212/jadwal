"use client"; // 1. Wajib tambahkan ini untuk interaksi

import { useState } from "react";
import { usePathname } from "next/navigation"; // 2. Hook untuk cek URL aktif
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth-action";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import {
  UserIcon,
  CalendarDateRangeIcon,
  BookOpenIcon,
  HomeIcon,
  Bars3Icon, // Icon Burger
  ChevronLeftIcon, // Icon Panah Kiri
  ComputerDesktopIcon, // Icon Monitor TV
  BuildingOfficeIcon,
  UserGroupIcon,
  MegaphoneIcon, // <--- ICON BARU UNTUK PENGUMUMAN
} from "@heroicons/react/16/solid";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true); // State untuk buka/tutup sidebar
  const pathname = usePathname(); // Ambil URL sekarang

  // Daftar Menu agar kodingan lebih bersih
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Data Dosen", href: "/admin/lecturers", icon: UserIcon },
    { name: "Data Mata Kuliah", href: "/admin/subjects", icon: BookOpenIcon },
    { name: "Data Ruangan", href: "/admin/rooms", icon: BuildingOfficeIcon },
    { name: "Data Kelas", href: "/admin/classes", icon: UserGroupIcon },
    {
      name: "Kelola Jadwal",
      href: "/admin/schedules",
      icon: CalendarDateRangeIcon,
    },
    // --- MENU BARU ---
    { name: "Pengumuman", href: "/admin/announcements", icon: MegaphoneIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* SIDEBAR */}
      <aside
        className={`bg-white border-r shadow-sm fixed h-full transition-all duration-300 ease-in-out z-20 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* HEADER SIDEBAR */}
        <div className="p-4 border-b flex items-center justify-between h-20">
          {/* Tampilkan Judul hanya jika terbuka */}
          <div
            className={`overflow-hidden transition-all ${
              isOpen ? "w-auto opacity-100" : "w-0 opacity-0 hidden"
            }`}
          >
            <h2 className="text-xl font-bold text-cyan-700 whitespace-nowrap">
              Admin
            </h2>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              Prodi Informatika
            </p>
          </div>

          {/* Tombol Burger / Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 focus:outline-none"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* NAVIGATION LIST */}
        <nav className="p-3 space-y-2 mt-2">
          {menuItems.map((item) => {
            // Logic Active State: Cek apakah URL sama persis
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-cyan-100 text-cyan-700" // Warna Aktif
                    : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-700" // Warna Tidak Aktif
                } ${isOpen ? "justify-start" : "justify-center"}`} // Posisi tengah jika tertutup
                title={!isOpen ? item.name : ""} // Tooltip saat hover jika tertutup
              >
                {/* Icon: Ukuran tetap */}
                <item.icon
                  className={`h-6 w-6 shrink-0 ${
                    isActive ? "text-cyan-700" : ""
                  }`}
                />

                {/* Text: Hilang jika sidebar tertutup */}
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          <hr className="my-4 border-gray-200" />

          {/* Link Monitor TV (Spesial Case) */}
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium bg-gray-800 text-white hover:bg-gray-900 ${
              isOpen ? "justify-start" : "justify-center"
            }`}
            title={!isOpen ? "Lihat Monitor TV" : ""}
          >
            <ComputerDesktopIcon className="h-6 w-6 shrink-0" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
              }`}
            >
              Lihat Monitor TV
            </span>
          </Link>

          <hr className="my-4 border-gray-200" />
          {/* Tombol Logout */}
          <form action={logoutAction}>
            <button
              type="submit"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium text-red-600 hover:bg-red-50 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
              title={!isOpen ? "Keluar" : ""}
            >
              <ArrowLeftStartOnRectangleIcon className="h-6 w-6 shrink-0" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
                }`}
              >
                Keluar
              </span>
            </button>
          </form>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      {/* Margin kiri konten utama menyesuaikan lebar sidebar */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
