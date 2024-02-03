import NavBar from "@/components/nav-nar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Commerce",
  description: "A modern e-commerce platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex justify-center h-screen w-screen">
          <NavBar />
          <div className="w-full pt-24 px-4 md:px-6 lg:px-12 max-w-screen-lg">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
