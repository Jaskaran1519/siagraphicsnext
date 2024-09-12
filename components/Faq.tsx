"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

// Reusable FaqItem Component with animation
const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null); // Use ref to get the content height

  return (
    <div
      className={`accordion py-8 border-b border-solid border-gray-200 ${
        isOpen ? "active" : ""
      }`}
    >
      <button
        className="accordion-toggle group inline-flex items-center justify-between font-normal text-xl leading-8 text-gray-600 w-full transition duration-500 hover:text-zinc-900"
        onClick={onClick}
      >
        <h5 className="mb-4 font-semibold text-left">{question}</h5>
        <svg
          className={`text-gray-900 transition-transform duration-500 group-hover:text-zinc-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <div
        ref={contentRef}
        className="accordion-content overflow-hidden transition-all duration-700 ease-in-out" // Add transition
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px", // Dynamically set height
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pr-4">
          <p className="text-base text-gray-500 font-normal">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// FAQ Component
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What materials are Lift Lock Belts made of?",
      answer:
        "Lift Lock Belts are crafted from high-quality leather and durable stitching to provide maximum support and longevity during your workouts",
    },
    {
      question: "Do Lift Lock Belts provide customized belts?",
      answer:
        "Yes, we offer customization options where you can add your name or logo to the belt, making it uniquely yours while maintaining the same high-quality support",
    },
    {
      question: "Are Lift Lock Belts suitable for beginners?",
      answer:
        "Absolutely, our belts are designed for all lifters, from beginners to professionals, ensuring proper support and stability during workouts",
    },
    {
      question: "How long does delivery take and is there a refund policy?",
      answer:
        "Delivery of Lift Lock Belts typically takes up to 15 business days after placing your order and Yes, we offer a refund policy. Delivery charges will be deducted. If you want to request a refund, please contact us on the provided number or visit our contact page.",
    },
  ];

  return (
    <div>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-start gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
            <div className="w-full lg:w-1/2 relative md:mt-5 md:sticky top-5">
              <Image src="/sizechart.png" width={800} height={800} alt="" />
            </div>
            <div className="w-full mt-5 md:mt-0 lg:w-1/2">
              <div className="lg:max-w-xl">
                <div className="mb-6 lg:mb-16">
                  <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">
                    FAQs
                  </h6>
                  <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                    Looking for answers?
                  </h2>
                </div>
                <div className="accordion-group">
                  {faqItems.map((item, index) => (
                    <FaqItem
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      isOpen={activeIndex === index}
                      onClick={() => toggleAccordion(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
