import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareOn 위약금 계산기",
  description: "CCTV 위약금, 얼마나 나올까? 10초 만에 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
