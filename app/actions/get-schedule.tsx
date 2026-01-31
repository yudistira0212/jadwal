"use server";

import { prisma } from "../lib/prisma";

export async function getFullSchedule() {
  return await prisma.schedule.findMany({
    include: {
      lecturer: true,
      subject: true,
      room: true,
      studyClass: true, // <--- Ganti jadi studyClass
    },
    orderBy: { startTime: "asc" },
  });
}

export async function getMasterData() {
  const lecturers = await prisma.lecturer.findMany({
    orderBy: { name: "asc" },
  });
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } });
  const rooms = await prisma.room.findMany({ orderBy: { name: "asc" } });

  // Ganti jadi studyClass
  const classes = await prisma.studyClass.findMany({
    orderBy: { name: "asc" },
  });

  return { lecturers, subjects, rooms, classes };
}
