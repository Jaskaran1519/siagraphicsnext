import React from "react";
import { InfiniteMovingCards } from "../components/infinitmovingcards";
import { Maven_Pro } from "next/font/google";

const heading = Maven_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="w-full mt-10 py-10 text-center font-medium bg-gray-100">
      <h1 className="pt-10 text-xl font-semibold md:text-3xl xl:text-5xl">
        What they had to say...
      </h1>
      <h2 className="text-lg mt-3 text-gray-700">
        Some reviews about us from our proud customers
      </h2>
      <div className=" mt-10 rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Excellent belt! Provides great support during my lifts. Highly recommend it.",
    name: "Ravi Patel",
    title: "High quality",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "As a beginner, this belt has been a game-changer for me. It’s comfortable and supportive",
    name: "Aisha Sharma",
    title: "Hamlet",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Very satisfied with my purchase. The belt offers excellent stability and fits well",
    name: "Arjun Rao",
    title: "A Dream Within a Dream",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Fantastic product! Durable and supportive. It's made a big difference in my lifting",
    name: "Neha Desai",
    title: "Pride and Prejudice",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Great belt for serious lifters. The material is strong and it holds up well",
    name: "Vikram Singh",
    title: "Moby-Dick",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Love this belt! It's exactly what I needed for better support during my exercise",
    name: "Simran Kaur",
    title: "Moby-Dick",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Impressed with the belt’s performance. It’s comfortable and provides excellent support",
    name: "Harpreet Gil",
    title: "Moby-Dick",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
  {
    quote:
      "Good quality and reliable. The belt has been perfect for my strength training",
    name: "Jaspreet Sidhu",
    title: "Moby-Dick",
    avtar: "/placeholder.svg",
    img: "/placeholder.svg",
  },
];
