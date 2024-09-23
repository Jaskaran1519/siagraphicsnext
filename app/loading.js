import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader className="animate-spin text-gray-700 w-12 h-12" />
    </div>
  );
}
