import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Jaspreet Sidhu",
    username: "@Jass",
    body: "Good quality and reliable. The belt has been perfect for my strength training",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Harpreet Gill",
    username: "@gill",
    body: "Impressed with the belt’s performance. It’s comfortable and provides excellent support",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Simran Kaur",
    username: "@simran",
    body: "Love this belt! It's exactly what I needed for better support during my exercises",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Vikram Singh",
    username: "@jane",
    body: "Great belt for serious lifters. The material is strong and it holds up well.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Neha Desai",
    username: "@jenny",
    body: "Fantastic product! Durable and supportive. It's made a big difference in my lifting.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Arjun Rao",
    username: "@raosahab",
    body: "Very satisfied with my purchase. The belt offers excellent stability and fits well",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden  rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] bg-zinc-200 hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center  gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium ">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
