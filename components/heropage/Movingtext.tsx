import { motion } from "framer-motion";
import React from "react";

const MarqueeText = () => {
  return (
    <div className="overflow-hidden bg-black text-white py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        <span className="text-xl mx-4">Worldwide Shipping&nbsp;</span>
        <span className="text-xl mx-4">24/7 Customer Support&nbsp;</span>
        <span className="text-xl mx-4">
          Highly customizable look and theme&nbsp;
        </span>
        <span className="text-xl mx-4">Developed by Eazweb&nbsp;</span>
        <span className="text-xl mx-4">
          Premium affordable Shopping Theme&nbsp;
        </span>
        {/* Duplicate content for continuous scrolling */}
        <span className="text-xl mx-4">Worldwide Shipping&nbsp;</span>
        <span className="text-xl mx-4">24/7 Customer Support&nbsp;</span>
        <span className="text-xl mx-4">
          Highly customizable look and theme&nbsp;
        </span>
        <span className="text-xl mx-4">Developed by Eazweb&nbsp;</span>
        <span className="text-xl mx-4">
          Premium affordable Shopping Theme&nbsp;
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
