import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";
import { Lilita_One } from "next/font/google";
import { MenuIcon } from "lucide-react";

const logoFont = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  return (
    <header className="w-full md:px-[5%] bg-base-300">
      <nav>
        <div className="navbar justify-between ">
          <div>
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <MenuIcon/>
            </label>
            <Link
              href="/"
              className={` ${logoFont.className} hidden md:flex text-2xl btn btn-ghost`}
            >
              LIFT LOCK
            </Link>
          </div>

          <Menu />
        </div>
        {/* <div className="bg-base-300 block md:hidden text-center pb-3">
          <SearchBox />
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
