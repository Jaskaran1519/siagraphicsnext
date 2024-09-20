import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Sarabun } from "next/font/google";
import Providers from "@/components/Providers";
import DrawerButton from "@/components/DrawerButton";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Image from "next/image";

const inter = Manrope({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const metadata: Metadata = {
  title: "Sia Graphics",
  description: "Modern ECommerce Website",
  icons: {
    icon: "/whitelogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // className="scroll-smooth"
      // style={{ scrollBehavior: "smooth" }}
    >
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
