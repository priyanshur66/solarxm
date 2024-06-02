import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "Sustainable", "beautiful", "modern"];

  return (
    <div className="h-[8rem] flex justify-center items-center px-2">
      <div className="text-8xl font-Roboto text-white font-bold">
        Build
        <FlipWords words={words} /> <br />
        Future with us !
      </div>
    </div>
  );
}
