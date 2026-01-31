import { ScheduleWithDetails } from "../../types";

export default function ActiveSession({
  schedule,
}: {
  schedule?: ScheduleWithDetails;
}) {
  if (!schedule) {
    return (
      <div className="h-full bg-gray-800 rounded-3xl border border-gray-700 flex flex-col items-center justify-center text-gray-500">
        <p className="text-3xl font-light">Tidak ada perkuliahan aktif</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-linear-to-br from-cyan-900 to-gray-900 rounded-3xl border border-cyan-600 p-8 flex flex-col justify-center relative shadow-2xl overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-white select-none">
        {schedule.room.name}
      </div>

      <div className="z-10 space-y-6">
        <div className="flex justify-between items-start">
          <span className="bg-cyan-600 text-white px-4 py-1 rounded-full text-lg font-bold">
            Kelas {schedule.studyClass.name}
          </span>
          <span className="text-3xl font-mono font-bold text-cyan-300">
            {schedule.startTime} - {schedule.endTime}
          </span>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-white leading-tight mb-2">
            {schedule.subject.name}
          </h2>
          <p className="text-2xl text-cyan-200 font-mono">
            {schedule.subject.code} • {schedule.subject.sks} SKS
          </p>
        </div>

        <div className="border-t border-cyan-700 pt-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
            Dosen Pengampu
          </p>
          <p className="text-3xl font-semibold text-white">
            {schedule.lecturer.name}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
            Lokasi
          </p>
          <p className="text-3xl font-bold text-yellow-400">
            {schedule.room.name}
          </p>
        </div>
      </div>
    </div>
  );
}
