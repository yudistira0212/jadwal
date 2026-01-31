"use client";
import { useState, useEffect } from "react";

export default function ClockHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-end border-b border-gray-700 pb-4 mb-6">
      <div>
        <h1 className="text-4xl font-bold text-cyan-400">JADWAL KULIAH</h1>
        <p className="text-xl text-gray-400">Teknik Informatika</p>
      </div>
      <div className="text-right">
        <div className="text-6xl font-mono font-bold tracking-widest text-white">
          {time.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="text-2xl text-cyan-200 mt-1">
          {time.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}
