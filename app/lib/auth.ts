import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface AdminSession {
  username: string;
  [key: string]: any; // Ini agar properti bawaan JWT (iat, exp) tidak error
}
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Ganti dengan string acak panjang

export async function createSession(username: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 Hari
  const session = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires)
    .setIssuedAt()
    .sign(SECRET_KEY);

  // Simpan di Cookies
  (
    await // Simpan di Cookies
    cookies()
  ).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSession;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

// Helper khusus middleware
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh durasi session jika user aktif
  const parsed = await getSession();
  if (!parsed) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  return res;
}
