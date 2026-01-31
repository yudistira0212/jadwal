import { Prisma } from "@prisma/client";

// Tipe data Schedule yang sudah join dengan Subject dan Lecturer
export type ScheduleWithDetails = Prisma.ScheduleGetPayload<{
  include: {
    subject: true;
    lecturer: true;
    room: true;
    studyClass: true; // <--- Ganti 'class' jadi 'studyClass'
  };
}>;
