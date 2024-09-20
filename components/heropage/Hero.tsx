import { Lobster } from "next/font/google";
import { AuroraBackground } from "../../components/magicui/Aurorabg";
import Link from "next/link";
import Header from "../header/Header";

const heroFont = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

export function Hero() {
  return (
    <div className="relative xl:h-screen">
      <AuroraBackground>
        <Header/>
        <div className="flex flex-col justify-center items-center h-full w-[90%] mx-auto z-20">
          <div className="space-y-6 text-center mt-44 md:mt-44 xl:mt-0">
            <h1
              className={`${heroFont.className} text-white text-6xl md:text-6xl xl:text-[9rem] font-semibold`}
            >
              Sia Graphics
            </h1>
            <h2 className="text-gray-200 text-xl">
              Take your printing game to the next level with Sia Graphics
            </h2>
          </div>
          <div className="flex justify-center items-center gap-5 mt-8 mb-44 xl:mb-0 z-20">
            <Link href="/collection">
              <button className="px-4 py-2 text-white border-[2px] border-gray-200 rounded-[1em] hover:bg-gray-200 hover:text-zinc-600 bg-transparent cursor-pointer duration-300">
                Explore
              </button>
            </Link>
            <button className="px-4 py-2 text-white border-[2px] border-gray-200 rounded-[1em] hover:bg-gray-200 hover:text-zinc-600 bg-transparent cursor-pointer duration-300">
              About us
            </button>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
