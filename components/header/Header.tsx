"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Mobilemenu from "./Mobilemenu";
import Nav from "./Nav";
import { ShoppingCartIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "../heropage/Drawer";
import Menu from "./Menu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = pathname === "/";

  return (
    <div
      className={`w-full max-w-[2000px] ${
        isHomePage ? "bg-background" : "bg-black bg-opacity-65 backdrop-blur-md"
      } z-50 flex justify-between items-center py-3 px-[5vw] sticky top-0 transition-colors duration-300`}
    >
      <div className="flex items-center gap-5">
        <Mobilemenu />
        <div className="hidden sm:block">
          <Nav />
        </div>
      </div>
      <Link href="/">
        <Image
          src="/whitelogo.png"
          width={45}
          height={45}
          alt="/"
          className="hidden md:block"
        />
      </Link>
      <div className="flex items-center md:gap-5 gap-2">
        <Input type="email" placeholder="Search here" />
        {/* <Drawer /> */}
        <Menu />
      </div>
    </div>
  );
};

export default Header;
