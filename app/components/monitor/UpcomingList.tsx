import { ScheduleWithDetails } from "../../types";

export default function UpcomingList({
  schedules,
}: {
  schedules: ScheduleWithDetails[];
}) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-300 mb-4 uppercase tracking-widest border-l-4 border-cyan-500 pl-3">
        Jadwal Berikutnya
      </h2>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {schedules.length === 0 ? (
          <p className="text-gray-500 italic">
            Tidak ada jadwal lagi hari ini.
          </p>
        ) : (
          schedules.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-5 rounded-xl border-l-4 border-gray-600 hover:border-cyan-400 transition-colors"
            >
              <div className="flex justify-between mb-1">
                <span className="text-cyan-400 font-bold font-mono text-lg">
                  {item.startTime}
                </span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  R. {item.room.name}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {item.subject.name}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{item.lecturer.name}</p>
              <p className="text-xs text-cyan-600 mt-1 font-bold">
                {item.studyClass.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
