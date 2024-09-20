import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import Image from "next/image";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex justify-between items-center mt-5">
            <Image src="/logo.webp" width={40} height={40} alt="/" />
            <User />
          </div>
        </SheetHeader>
        <div className="flex flex-col space-y-5 text-left mt-10">
          <Label htmlFor="name" className="">
            Our Collections
          </Label>
          <hr />
          <Label htmlFor="username" className="t">
            Printing Categories
          </Label>
          <hr />
          <Label htmlFor="username" className="t">
            Purchase History
          </Label>
          <hr />
          <Label htmlFor="username" className="t">
            Track your order
          </Label>
          <hr />
          <Label htmlFor="username" className="t">
            Contact Us
          </Label>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDemo;
