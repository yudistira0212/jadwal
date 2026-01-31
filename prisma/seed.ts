const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Data Jadwal dari File Excel Anda
const schedulesData = [
  {
    day: "Senin",
    startTime: "08:00",
    endTime: "10:00",
    subjectCode: "D65203",
    lecturerName: "Josua Josen A. Limbong, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "A",
  },
  {
    day: "Senin",
    startTime: "08:00",
    endTime: "10:00",
    subjectCode: "D65403",
    lecturerName: "Andreas Sumendap, S.T., M.T/Claudia Sawaki, S.T",
    roomName: "Lab Jaringan",
    className: "AB",
  },
  {
    day: "Senin",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65203",
    lecturerName: "Josua Josen A. Limbong, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "B",
  },
  {
    day: "Senin",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65408",
    lecturerName: "Prof. Dr. Eng. Ir. Adelhard B. Rehiara, S.T., MCSE., IPM",
    roomName: "Lab Jaringan",
    className: "A",
  },
  {
    day: "Senin",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65506",
    lecturerName: "Marlinda Sanglise, S.Kom.,M.T",
    roomName: "Teknik 18",
    className: "C",
  },
  {
    day: "Senin",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65203",
    lecturerName: "Lilis Indrayani,S.Kom.,M.Kom",
    roomName: "Lab Pemrograman",
    className: "C",
  },
  {
    day: "Senin",
    startTime: "15:00",
    endTime: "17:00",
    subjectCode: "D65404",
    lecturerName: "Prof. Dedi Iskandar Inan, S.T., M.T., Ph.D",
    roomName: "Lab Pemrograman",
    className: "ABC",
  },
  {
    day: "Senin",
    startTime: "15:00",
    endTime: "17:00",
    subjectCode: "D65202W",
    lecturerName: "Lilis Indrayani,S.Kom.,M.Kom",
    roomName: "Teknik 2,Teknik 4",
    className: "AB",
  },
  {
    day: "Senin",
    startTime: "15:00",
    endTime: "17:00",
    subjectCode: "D65202W",
    lecturerName: "Andreas Sumendap, S.T., M.T",
    roomName: "Teknik 18",
    className: "CD",
  },
  {
    day: "Senin",
    startTime: "10:00",
    endTime: "13:00",
    subjectCode: "D65603",
    lecturerName: "Flora Kambuaya, S.T., M.T",
    roomName: "Teknik 18",
    className: "Regular",
  },
  {
    day: "Selasa",
    startTime: "08:00",
    endTime: "09:40",
    subjectCode: "D65407",
    lecturerName: "Christian D, Suhendra, S.T., M.Cs",
    roomName: "Lab Pemrograman",
    className: "A",
  },
  {
    day: "Selasa",
    startTime: "10:00",
    endTime: "11:40",
    subjectCode: "D65201",
    lecturerName: "Alex De Kweldju, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "A",
  },
  {
    day: "Selasa",
    startTime: "08:00",
    endTime: "10:00",
    subjectCode: "D65403",
    lecturerName: "Andreas Sumendap, S.T., M.T/Claudia Sawaki, S.T",
    roomName: "Lab Jaringan",
    className: "C",
  },
  {
    day: "Selasa",
    startTime: "19:00",
    endTime: "20:00",
    subjectCode: "D65506",
    lecturerName: "Lion Ferdinand Marini,S.T., M.MT",
    roomName: "Belum Ditentukan",
    className: "AB",
  },
  {
    day: "Selasa",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65408",
    lecturerName: "Abdul Zaid Pattiran, S.T., M.Eng",
    roomName: "Lab Jaringan",
    className: "BC",
  },
  {
    day: "Selasa",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65201",
    lecturerName: "Alex De Kweldju, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "A",
  },
  {
    day: "Selasa",
    startTime: "15:00",
    endTime: "17:00",
    subjectCode: "D65203",
    lecturerName: "Lilis Indrayani,S.Kom.,M.Kom",
    roomName: "Lab Pemrograman",
    className: "D",
  },
  {
    day: "Selasa",
    startTime: "12:00",
    endTime: "14:00",
    subjectCode: "Pilihan",
    lecturerName: "Alex De Kweldju, S.Kom., M.Kom",
    roomName: "Lab Jaringan",
    className: "Regular",
  },
  {
    day: "Selasa",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65405",
    lecturerName: "Marlinda Sanglise, S.Kom.,M.T/Lorna Y. Baisa, S.T., M.Kom",
    roomName: "Teknik 2",
    className: "CD",
  },
  {
    day: "Rabu",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65407",
    lecturerName: "Julius P.P. Naibaho, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "C",
  },
  {
    day: "Rabu",
    startTime: "10:00",
    endTime: "11:40",
    subjectCode: "D65406",
    lecturerName: "Prof. Dedi Iskandar Inan, S.T., M.T",
    roomName: "Teknik 2",
    className: "ABC",
  },
  {
    day: "Rabu",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65201",
    lecturerName: "Ratna Julita, S.T.,M.T/Fernando Manuhutu, S.T",
    roomName: "Lab Pemrograman",
    className: "C",
  },
  {
    day: "Rabu",
    startTime: "08:00",
    endTime: "10:00",
    subjectCode: "D65601/C65051",
    lecturerName: "Prof. Dedi Iskandar Inan, S.T., M.T",
    roomName: "Teknik 18",
    className: "CD",
  },
  {
    day: "Rabu",
    startTime: "08:00",
    endTime: "09:40",
    subjectCode: "D61045210W",
    lecturerName: "Layanan",
    roomName: "Teknik 2,Teknik 4",
    className: "ABC",
  },
  {
    day: "Rabu",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D65913",
    lecturerName: "Prof. Dedi Iskandar Inan, S.T., M.T",
    roomName: "Teknik 18",
    className: "AB",
  },
  {
    day: "Kamis",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65405",
    lecturerName: "Marlinda Sanglise, S.Kom.,M.T/Lorna Y. Baisa, S.T., M.Kom",
    roomName: "Teknik 2,Teknik 4",
    className: "AB",
  },
  {
    day: "Kamis",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65201",
    lecturerName: "Ratna Julita, S.T.,M.T/Fernando Manuhutu, S.T",
    roomName: "Lab Pemrograman",
    className: "D",
  },
  {
    day: "Kamis",
    startTime: "10:00",
    endTime: "12:00",
    subjectCode: "D65602W",
    lecturerName: "Ratna Julita, S.T.,M.T",
    roomName: "Teknik 18",
    className: "Regular",
  },
  {
    day: "Kamis",
    startTime: "12:00",
    endTime: "13:40",
    subjectCode: "D61045210W",
    lecturerName: "Layanan",
    roomName: "Teknik 2,Teknik 4",
    className: "ABC",
  },
  {
    day: "Kamis",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "D61045214W",
    lecturerName: "layanan",
    roomName: "Teknik 2,Teknik 4",
    className: "ABC",
  },
  {
    day: "Kamis",
    startTime: "15:00",
    endTime: "17:00",
    subjectCode: "D65905P",
    lecturerName: "Julius P.P. Naibaho, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "Regular",
  },
  {
    day: "Kamis",
    startTime: "13:00",
    endTime: "15:00",
    subjectCode: "Pilihan",
    lecturerName: "Lorna Y. Baisa, S.T., M.Kom",
    roomName: "Teknik 18",
    className: "Regular",
  },
  {
    day: "Kamis",
    startTime: "07:00",
    endTime: "08:00",
    subjectCode: "D65602",
    lecturerName: "Christian D, Suhendra, S.T., M.Cs",
    roomName: "Teknik 2, Teknik 4",
    className: "ABCD",
  },
  {
    day: "Kamis",
    startTime: "08:00",
    endTime: "10:00",
    subjectCode: "D65407",
    lecturerName: "Julius P.P. Naibaho, S.Kom., M.Kom",
    roomName: "Lab Pemrograman",
    className: "B",
  },
  {
    day: "Jumat",
    startTime: "08:00",
    endTime: "12:00",
    subjectCode: "C65000",
    lecturerName: "Christian D. Suhendra, ST., M.Cs/Dosen Teknik Informatika",
    roomName: "Belum Ditentukan",
    className: "Regular",
  },
  {
    day: "Jumat",
    startTime: "10:00",
    endTime: "11:40",
    subjectCode: "D61045207W",
    lecturerName: "Layanan",
    roomName: "Teknik 2, Teknik 4",
    className: "ABC",
  },
  {
    day: "Jumat",
    startTime: "13:30",
    endTime: "15:00",
    subjectCode: "D61045216W",
    lecturerName: "Layanan",
    roomName: "Teknik 2, Teknik 4",
    className: "ABC",
  },
  {
    day: "Jumat",
    startTime: "13:00",
    endTime: "17:00",
    subjectCode: "C65053",
    lecturerName: "Christian D. Suhendra, ST., M.Cs/Dosen Teknik Informatika",
    roomName: "Belum Ditentukan",
    className: "Regular",
  },
  {
    day: "Jumat",
    startTime: "08:00",
    endTime: "09:40",
    subjectCode: "D61045206W",
    lecturerName: "Layanan",
    roomName: "Teknik 2, Teknik 4",
    className: "ABC",
  },
];

async function main() {
  console.log("🔄 Memulai proses seeding JADWAL...");

  // 1. Ambil data Master dari Database
  console.log("📥 Mengambil data Dosen, Ruangan, MK, dan Kelas dari DB...");

  const allLecturers = await prisma.lecturer.findMany();
  const allRooms = await prisma.room.findMany();
  const allClasses = await prisma.studyClass.findMany();
  const allSubjects = await prisma.subject.findMany();

  // Buat Map untuk pencarian cepat (Case insensitive & Trimmed)
  const lecturerMap = new Map(
    allLecturers.map((l: { name: string; id: any }) => [
      l.name.toLowerCase().trim(),
      l.id,
    ]),
  );
  const roomMap = new Map(
    allRooms.map((r: { name: string; id: any }) => [
      r.name.toLowerCase().trim(),
      r.id,
    ]),
  );
  const classMap = new Map(
    allClasses.map((c: { name: string; id: any }) => [
      c.name.toLowerCase().trim(),
      c.id,
    ]),
  );
  const subjectMap = new Map(
    allSubjects.map((s: { code: string; id: any }) => [
      s.code.toLowerCase().trim(),
      s.id,
    ]),
  );

  // 2. Bersihkan Jadwal Lama (Opsional, agar tidak duplikat)
  console.log("🗑️  Menghapus jadwal lama untuk mencegah duplikasi...");
  await prisma.schedule.deleteMany({});

  // 3. Masukkan Jadwal Baru
  console.log("📅 Memproses Jadwal...");

  let successCount = 0;
  let failCount = 0;

  for (const s of schedulesData) {
    // Cari ID berdasarkan data di JSON (dicocokkan dengan data manual di DB)
    const lecturerId = lecturerMap.get(s.lecturerName.toLowerCase().trim());
    const roomId = roomMap.get(s.roomName.toLowerCase().trim());
    const classId = classMap.get(s.className.toLowerCase().trim());
    const subjectId = subjectMap.get(s.subjectCode.toLowerCase().trim());

    if (lecturerId && roomId && classId && subjectId) {
      await prisma.schedule.create({
        data: {
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          subjectId: subjectId,
          lecturerId: lecturerId,
          roomId: roomId,
          classId: classId,
        },
      });
      successCount++;
    } else {
      console.warn(
        `⚠️  Gagal insert jadwal untuk MK Kode: ${s.subjectCode} (${s.className})`,
      );
      console.warn(
        `   Penyebab: Data master tidak ditemukan di DB manual Anda.`,
      );
      if (!lecturerId)
        console.warn(`   -> Dosen tidak ketemu: "${s.lecturerName}"`);
      if (!roomId) console.warn(`   -> Ruangan tidak ketemu: "${s.roomName}"`);
      if (!classId) console.warn(`   -> Kelas tidak ketemu: "${s.className}"`);
      if (!subjectId) console.warn(`   -> MK tidak ketemu: "${s.subjectCode}"`);
      console.warn("------------------------------------------------");
      failCount++;
    }
  }

  console.log(
    `✅ Seeding selesai! Sukses: ${successCount}, Gagal: ${failCount}`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Terjadi Error Fatal:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
