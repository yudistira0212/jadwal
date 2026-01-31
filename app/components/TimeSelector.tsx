"use client";

import { useState } from "react";

export default function TimeSelector({
  label,
  name,
  defaultValue = "07:00",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  // Pecah defaultValue (misal "13:30") jadi jam dan menit
  // Jika data kosong, default ke "07" dan "00"
  const [defaultHour, defaultMinute] = (defaultValue || "07:00").split(":");

  const [hour, setHour] = useState(defaultHour || "07");
  const [minute, setMinute] = useState(defaultMinute || "00");

  // --- LOGIC BARU: FULL 24 JAM ---

  // Generate Jam 00 sampai 23
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  // Generate Menit kelipatan 5 (00, 05, 10, ... 55) agar lebih presisi
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0"),
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">{label}</label>

      {/* INPUT RAHASIA (Value ini yang dikirim ke Database) */}
      <input type="hidden" name={name} value={`${hour}:${minute}`} />

      <div className="flex gap-2 items-center">
        {/* Dropdown JAM (00 - 23) */}
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-lg cursor-pointer h-11"
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span className="font-bold text-gray-500">:</span>

        {/* Dropdown MENIT (00 - 55) */}
        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-lg cursor-pointer h-11"
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
          WIB
        </span>
      </div>
    </div>
  );
}
