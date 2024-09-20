import * as React from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Component() {
  const [open, setOpen] = React.useState(false);
  const [drawerHeight, setDrawerHeight] = React.useState(70);
  const dragStartY = React.useRef(0);
  const isDragging = React.useRef(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const lastValidHeight = React.useRef(70);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    dragStartY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || !drawerRef.current) return;

    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - dragStartY.current;
    const windowHeight = window.innerHeight;
    const newHeightPercentage =
      ((windowHeight - currentY) / windowHeight) * 100;

    const stiffness = 0.5;
    const adjustedHeight =
      lastValidHeight.current +
      (newHeightPercentage - lastValidHeight.current) * stiffness;

    if (adjustedHeight > 20 && adjustedHeight <= 100) {
      setDrawerHeight(adjustedHeight);
      lastValidHeight.current = adjustedHeight;
    }

    dragStartY.current = currentY;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (drawerHeight <= 25) {
      setOpen(false);
    } else if (drawerHeight > 95) {
      setDrawerHeight(100);
    }
  };

  React.useEffect(() => {
    if (open) {
      setDrawerHeight(70);
      lastValidHeight.current = 70;
    }
  }, [open]);

  React.useEffect(() => {
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  React.useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (open && drawerHeight < 100) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("touchmove", preventScroll, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener("touchmove", preventScroll);
    };
  }, [open, drawerHeight]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <ShoppingCart className="text-white text-xl" />
      </DrawerTrigger>
      <DrawerContent
        ref={drawerRef}
        style={{ height: `${drawerHeight}vh` }}
        className="fixed bottom-0 left-0 right-0 transition-all duration-300 ease-out overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-6 bg-gray-200 cursor-grab"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        />
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-sm overflow-y-auto h-full"
          style={{
            overflowY: drawerHeight === 100 ? "auto" : "hidden",
            touchAction: drawerHeight === 100 ? "auto" : "none",
          }}
        >
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <p>Your cart items will appear here.</p>
            {/* Add more content here to make it scrollable when fully expanded */}
            {Array(40)
              .fill(0)
              .map((_, i) => (
                <p key={i}>Item {i + 1}</p>
              ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
