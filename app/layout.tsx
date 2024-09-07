import "./globals.css";
import type { Metadata } from "next";
import { Abel, Inter, Nunito } from "next/font/google";
import Providers from "@/components/Providers";
import DrawerButton from "@/components/DrawerButton";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/header/Header";

const inter = Abel({ subsets: ["latin"], weight: ["400"] });

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
            <div className="drawer-content">
              <div className="min-h-screen flex flex-col">
                <Header />
                {children}
                <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                  <p>
                    Copyright © 2023 - All right reserved by Next Amazona V2
                  </p>
                </footer>
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
