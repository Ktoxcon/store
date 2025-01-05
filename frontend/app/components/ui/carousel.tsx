import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, ScrollArea } from "@radix-ui/themes";
import { useRef, type ReactNode } from "react";

export type CarouselProps = { scrollStep?: number; children?: ReactNode };

export function Carousel({ scrollStep = 100, children }: CarouselProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleControlClick = (direction: "right" | "left") => {
    if (!scrollAreaRef.current) return;

    const step = direction === "right" ? scrollStep : -scrollStep;

    scrollAreaRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <ScrollArea
      type="hover"
      ref={scrollAreaRef}
      scrollbars="horizontal"
      style={{
        position: "relative",
      }}
    >
      <Flex gap="2" py="4">
        {children}
      </Flex>
      <IconButton
        style={{
          top: "50%",
          left: "100%",
          position: "absolute",
          transform: "translate(-100%, -50%)",
        }}
        onClick={() => handleControlClick("right")}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        style={{
          position: "absolute",
          top: "50%",
          right: "100%",
          transform: "translate(100%, -50%)",
        }}
        onClick={() => handleControlClick("left")}
      >
        <ChevronLeftIcon />
      </IconButton>
    </ScrollArea>
  );
}
