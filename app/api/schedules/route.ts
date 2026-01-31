import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

// PENTING: Paksa agar API ini selalu mengambil data baru (tidak di-cache)
// export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        lecturer: true,
        subject: true,
        room: true,
        studyClass: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}
