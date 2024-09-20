// "use client";
import Hero from "@/components/heropage/Hero";
import Movingtext from "@/components/heropage/Movingtext";
import Pagecontent from "@/components/heropage/PageContent";

import Lenis from "lenis";
import React, { useEffect } from "react";

const page = () => {
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time: any) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  return (
    <div>
      <Hero />
      {/* <Movingtext /> */}
      <Pagecontent />
    </div>
  );
};

export default page;
