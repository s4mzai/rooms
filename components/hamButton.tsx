"use client";

import type { MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";

export default function HamButton({ open, onClick }: { open: boolean; onClick?: MouseEventHandler<HTMLButtonElement> }) {

  return (
    <Button
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`absolute flex sm:hidden top-4 right-4 group bg-black text-white border-0 hover:bg-black hover:text-white size-10`}
      onClick={onClick}
      size="icon"
      variant="outline"
    >
      <svg
        className="pointer-events-none"
        fill="none"
        height={16}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={16}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
          d="M4 12L20 12"
        />
        <path
          className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          d="M4 12H20"
        />
        <path
          className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
          d="M4 12H20"
        />
      </svg>
    </Button>
  );
}
