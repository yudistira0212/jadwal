import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./app/lib/auth";

// PERUBAHAN: Gunakan 'export default' agar Next.js lebih mudah membacanya
export default async function middleware(request: NextRequest) {
  // 1. Coba update session (memperpanjang waktu login)
  await updateSession(request);

  const path = request.nextUrl.pathname;
  const session = request.cookies.get("session")?.value;

  // 2. PROTEKSI: Jika mau masuk /admin tapi BELUM login -> Tendang ke /login
  if (path.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. REDIRECT: Jika mau masuk /login tapi SUDAH login -> Tendang ke /admin
  if (path.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
