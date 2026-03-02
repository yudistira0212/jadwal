"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

type ScheduleType = {
  id: string;
  subject: { name: string; code: string; prodi: string };
  lecturer: { name: string; code: string | null };
  room: { name: string };
  studyClass: { name: string };
  startTime: string;
  endTime: string;
  day: string;
};

type AnnouncementType = {
  id: string;
  title: string;
  content: string | null;
  image: string | null;
};

export default function MonitorScreen({
  initialSchedules,
}: {
  initialSchedules: ScheduleType[];
}) {
  const [schedules, setSchedules] = useState<ScheduleType[]>(initialSchedules);
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sidebar States
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 1. Fetch Data & Clock
  useEffect(() => {
    // Penanda komponen telah dimuat
    setMounted(true);
    // A. Logika Jam Digital (Update tiap 1 detik)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // B. Fungsi Pengambil Data ke Server
    const fetchData = async () => {
      try {
        // Mengambil data Jadwal terbaru
        const resSchedule = await fetch("/api/schedules");
        if (resSchedule.ok) setSchedules(await resSchedule.json());

        // Mengambil data Pengumuman terbaru
        const resAnnounce = await fetch("/api/announcements");
        if (resAnnounce.ok) setAnnouncements(await resAnnounce.json());
      } catch (e) {
        console.error("Gagal melakukan sinkronisasi data");
      }
    };
    // Jalankan fetch pertama kali
    fetchData();
    // C. Logika Polling Data (Update tiap 10 detik)
    const dataInterval = setInterval(fetchData, 60000);
    // Membersihkan interval saat komponen dilepas (Cleanup)
    return () => {
      clearInterval(timer);
      clearInterval(dataInterval);
    };
  }, []);

  // 2. Slide Pengumuman (Jalan Terus)
  useEffect(() => {
    if (announcements.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % announcements.length);
      }, 20000); // Ganti gambar tiap 5 detik
      return () => clearInterval(slideInterval);
    }
  }, [announcements]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const timeString = currentTime
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(".", ":")
    .substring(0, 5);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDayName = days[currentTime.getDay()];

  const activeSessions = schedules.filter(
    (s) =>
      s.day === currentDayName &&
      s.startTime <= timeString &&
      s.endTime > timeString,
  );

  // console.log(activeSessions);

  // Ambil hanya 3-4 jadwal ke depan agar muat di kotak kecil
  const upcomingSessions = schedules
    .filter((s) => s.day === currentDayName && s.startTime > timeString)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 4);

  const getGridClass = (count: number) => {
    if (count <= 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count >= 3 && count <= 4) return "grid-cols-2 grid-rows-2";
    return "grid-cols-3 grid-rows-2";
  };

  

  if (!mounted)
    return <div className="bg-black h-screen text-white">Loading...</div>;

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-gray-800 p-2 md:p-6 flex justify-between items-center shadow-lg border-b-4 border-cyan-500 z-20 relative shrink-0 h-[10vh]">
        <div>
          <h1 className="text-md md:text-1xl font-bold text-cyan-400 tracking-wider">
            TEKNIK INFORMATIKA
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase">
            Jadwal Perkuliahan Real-time
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-2xl font-mono font-bold text-white flex items-center gap-4">
            <ClockIcon className="h-5 w-8 md:h-7 md:w-7 text-cyan-500 animate-pulse" />
            {currentTime.toLocaleTimeString("id-ID", { hour12: false })}
          </div>
          <p className="text-cyan-400 font-bold mt-1 text-sm md:text-md">
            {currentTime.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </header>

      {/* CONTENT WRAPPER */}
      <div className="h-[90vh] flex overflow-hidden">
        {/* KOLOM KIRI: ACTIVE SESSIONS (2/3 Layar) */}
        <div className="w-2/3 p-4 h-full overflow-hidden bg-gray-900 relative border-r border-gray-700">
          {activeSessions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center animate-pulse">
              <h2 className="text-6xl font-bold text-gray-700 mb-4">
                TIDAK ADA PERKULIAHAN
              </h2>
              <p className="text-2xl text-gray-500">
                Saat ini sedang tidak ada kelas aktif.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-2 h-full w-full ${getGridClass(
                activeSessions.length,
              )}`}
            >
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="relative  bg-linear-to-br from-blue-900 to-gray-900 rounded-2xl border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] p-0 md:p-2 flex flex-col justify-center text-center group overflow-hidden min-h-0"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none z-0">
                    <span className="text-3xl md:text-9xl font-bold text-white">
                      {session.room.name.replace(/\D/g, "")} 
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-4 text-right z-0 pointer-events-none">
                    <p className="text-4xl md:text-6xl font-mono font-bold text-gray-600 opacity-20">
                      {session.endTime}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <span className="bg-red-600 text-white px-1 py-1 rounded-full text-xs md:text-sm font-bold animate-pulse shadow-lg">
                        Berlangsung
                      </span>
                      <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest">
                        {session.startTime} - {session.endTime}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <h2 className="text-base md:text-sm font-bold text-white bg-clip-text bg-linear-to-r from-white to-cyan-200 leading-tight">
                        {session.room.name} 
                      </h2>
                    </div>

                    <div className="flex-1 flex flex-col justify-center my-2">
                      <h3 className="text-2xl md:text-sm font-bold text-cyan-400 leading-tight drop-shadow-md line-clamp-2">
                        {session.subject.name} 
                      </h3> 
                      <div className="mt-2">
                        <span className="text-gray-300 text-sx md:text-lg font-medium bg-gray-800/50 px-3 py-1 rounded">
                          {session.subject.prodi} 
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 border-t border-gray-700/50 pt-4 bg-gray-900/30 rounded-xl p-2 backdrop-blur-sm mt-auto shrink-0">
                      <div className="text-left w-full col-span-3 overflow-hidden grid">
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase mb-1">
                          Dosen
                        </p>
                        <div className="text-xs md:text-lg font-bold text-white wrap-break-word  animate-marquee whitespace-nowrap">
                          {session.lecturer.name}
                        </div>
                      </div>
                      {/* <div className="text-left overflow-hidden">
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase mb-1">
                          Waktu
                        </p>
                        <p className="text-sm md:text-lg font-bold text-white truncate">
                          {session.startTime} - {session.endTime}
                        </p>
                      </div> */}
                      <div className="text-right  ">
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase mb-1">
                          Kelas
                        </p>
                        <span className="inline-block truncate bg-cyan-600 text-white  md:px-3 md:py-1 rounded-lg font-bold text-sm md:text-sm shadow-lg">
                          {session.studyClass.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KOLOM KANAN: SIDEBAR (1/3 Layar) */}
        <div className="w-1/3 bg-gray-800 flex flex-col z-20 shadow-2xl h-full border-l border-gray-700">
          {/* BAGIAN ATAS: JADWAL SELANJUTNYA (50% dari area konten sidebar) */}
          <div className="flex-1 flex flex-col overflow-hidden border-b border-gray-600 bg-gray-800">
            <div className="p-1 bg-gray-900 border-b border-gray-700 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-yellow-500">🔜</span> Selanjutnya
              </h3>
            </div>

            <div className="flex-1 overflow-hidden p-3 space-y-3 relative">
              {upcomingSessions.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 italic text-sm">
                    Tidak ada jadwal lagi.
                  </p>
                </div>
              ) : (
                // Menggunakan slice di atas agar tidak perlu scroll
                upcomingSessions.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700/50 p-3 rounded-lg border-l-4 border-yellow-500 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lg font-bold text-white font-mono">
                        {item.startTime} - {item.endTime}
                      </span>
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded font-bold border border-gray-600">
                        {item.room.name}
                      </span>
                    </div>
                    <h4 className="font-bold text-cyan-400 text-sm leading-tight mb-1 line-clamp-1">
                      {item.subject.name}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] text-gray-300">
                      <span className="truncate w-2/3  ">
                        {item.lecturer.name}
                      </span>
                      <span className="text-yellow-500 font-bold">
                        {item.studyClass.name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* BAGIAN BAWAH: PENGUMUMAN (50% dari area konten sidebar) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
            <div className="p-1 bg-gray-900 border-b border-gray-700 border-t flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-pink-500">📢</span> Informasi
              </h3>
            </div>

            <div className="flex-1 relative overflow-hidden p-3">
              {announcements.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                  <p>Tidak ada pengumuman.</p>
                </div>
              ) : (
                <div
                  className="w-full h-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 flex flex-col shadow-lg animate-in fade-in duration-500"
                  key={currentSlideIndex}
                >
                  {announcements[currentSlideIndex].image ? (
                    <>
                      <div className="relative h-3/4 w-full bg-black">
                        <Image
                          src={announcements[currentSlideIndex].image!}
                          alt="Info"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="h-1/5 px-3 bg-gray-800 flex flex-col justify-center">
                        <h4 className="text-pink-400 font-bold text-sm leading-tight line-clamp-1 mb-1">
                          {announcements[currentSlideIndex].title} 
                        </h4>
                        {/* <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
                          {announcements[currentSlideIndex].content}
                        </p> */}
                      
                      </div>
                      <div className="bg-cyan-700 p-2 overflow-hidden whitespace-nowrap shrink-0 h-10 flex items-center z-30">
                        <div className="animate-marquee text-white font-bold text-sm inline-block">
                          {announcements[currentSlideIndex].content} 
                        </div>
                      </div>
                    </>
                  ) : (<>
                  <div className="relative h-3/4 w-full bg-black">
                     <div className="relative h-3/4 w-full bg-black">
                        {/* <Image
                          src={announcements[currentSlideIndex].image!}
                          alt="Info"
                          fill
                          className="object-contain"
                        /> */}
                      </div>
                  </div>
                  <div className="h-full w-full p-4 flex flex-col justify-center text-center bg-gray-800">
                      <h4 className="text-pink-400 font-bold text-lg mb-2 border-b border-gray-700 pb-2">
                        {announcements[currentSlideIndex].title}
                      </h4>
                      {/* <p className="text-white text-sm whitespace-pre-wrap leading-relaxed line-clamp-6">
                        {announcements[currentSlideIndex].content}
                      </p> */}
                      
                    </div>
                     <div className="bg-cyan-700 p-2  overflow-hidden whitespace-nowrap shrink-0 h-10 flex items-center z-30">
                        <div className="animate-marquee text-white font-bold text-sm inline-block">
                          {announcements[currentSlideIndex].content} 
                        </div>
                      </div>
                  </>
                    
                  )}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER: MARQUEE (Tetap di paling bawah) */}
        </div>
      </div>

      <button
        onClick={toggleFullScreen}
        className="fixed bottom-6 right-6 bg-cyan-600/80 hover:bg-cyan-500 text-white p-3 rounded-full shadow-2xl backdrop-blur-sm transition-all z-50 group"
      >
        {isFullScreen ? (
          <ArrowsPointingInIcon className="h-6 w-6" />
        ) : (
          <ArrowsPointingOutIcon className="h-6 w-6" />
        )}
      </button>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
