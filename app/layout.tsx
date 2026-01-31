import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader"; // <--- 1. Import ini

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Jadwal Kuliah",
  description: "Jadwal TV Monitor Otomatis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* 2. Pasang komponen ini di sini */}
        <NextTopLoader
          color="#0891b2" // Warna Cyan (sesuai tema kita)
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Matikan spinner bulat (biar bersih, cuma garis aja)
          easing="ease"
          speed={200}
          shadow="0 0 10px #06b6d4,0 0 5px #06b6d4"
        />
        {children}
      </body>
    </html>
  );
}
