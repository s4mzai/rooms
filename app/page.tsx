"use client"
import { useState } from "react";
import { TextMorph } from "@/components/ui/text-morph";
import { TypingAnimation } from "@/components/ui/typing-animation"

export default function Home() {
  const [text, setText] = useState<string>("Create Room")
  const [disable, setDisable] = useState<boolean>(false)
  return (
    <div className="flex flex-col items-center justify-center h-dvh px-4 bg-black">
      <div className="w-full max-w-md mx-auto mb-6 text-center">
        <h1 className="text-green-500 text-4xl font-bold tracking-wide mb-2 ">{">"}private_chat</h1>
        <TypingAnimation className="text-zinc-400 text-lg font-medium tracking-wide">A private, self-destructing chat room</TypingAnimation>
      </div>
      <div className="w-full max-w-md mx-auto flex flex-col bg-zinc-900/50 justify-center gap-4 p-6 sm:p-8 shadow-lg border border-zinc-800 min-h-[240px]">
        <h2 className="text-zinc-400">Your Identity</h2>
        <input type="text" value={"hello"} disabled={true} className="bg-black/80 text-zinc-400 p-2 w-full" />
        {/* TODO: ADD A WORK HERE */}
        <button onClick={()=>{
            setDisable(true)
            setText(text == "Create Room"? "Creating Room...":"Create Room")
            setTimeout(() => {
              setDisable(false)
              setText("Create Room")
            }, 2000)
          }}
          className="bg-white text-black p-2 w-full hover:bg-white/80 transition-colors"
          disabled={disable}
        >

          <TextMorph>{text}</TextMorph>
        </button>
      </div>
    </div>
  );
}