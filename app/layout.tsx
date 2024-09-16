import "./globals.css";
import type { Metadata } from "next";
import { Abel, Inter, Nunito, Sarabun } from "next/font/google";
import Providers from "@/components/Providers";
import DrawerButton from "@/components/DrawerButton";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const inter = Sarabun({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Lift Lock",
  description: "Modern ECommerce Website",
  icons: {
    icon: "/black-logo.png", // Path to your logo with a white background
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="drawer">
            <DrawerButton />
            <a
              href="https://wa.me/message/3BKOF3I2XU4NA1"
              target="_blank"
              className="fixed bottom-10 right-10 z-50"
            >
              <Image
                width={50}
                height={50}
                src="/whatsapp.svg"
                className="rounded-full"
                alt=""
              />
            </a>
            <div className="drawer-content">
              <div className="min-h-screen flex flex-col">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
