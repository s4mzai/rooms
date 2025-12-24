"use client"

import ButtonCopy from "@/components/ui/copyButton"
import useUsername from "@/hooks/username"
import { client } from "@/lib/eden"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"
import { format } from "date-fns";
import { useRealtime } from "@/lib/realtime-client"
import { useRouter } from "next/navigation"

const Page = ()=>{
    const params = useParams()
    const roomId = String(params.roomId)
    const username = useUsername();
    const [input,setInput] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async ({ text }: { text: string }) => {
          await client.messages.post({ sender: username, text }, { query: { roomId } })
    
          setInput("")
        },
    })
    
    const { data: messages, refetch } = useQuery({
        queryKey: ["messages", roomId],
        queryFn: async () => {
          const res = await client.messages.get({ query: { roomId } })
          return res.data
        },
    })

    
    useRealtime({
        channels: [roomId],
        events: ["chat.message", "chat.destroy"],
        onData: ({ event }) => {
        if (event === "chat.message") {
            refetch()
        }

        if (event === "chat.destroy") {
            router.push("/?destroyed=true")
        }
        },
    })
    return(
        <div className="bg-black text-white min-h-dvh flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-evenly p-5 border-b border-zinc-800/70 bg-zinc-900/40">
                <div className="w-full">
                    <h2 className="uppercase text-zinc-400 text-sm ">ROOM ID</h2>
                    <div className="flex gap-4">
                        <p className="font-lg text-green-500">{roomId}</p>
                        <ButtonCopy duration={1000} loadingDuration={500} onCopy={async()=>{await navigator.clipboard.writeText(roomId);}}/>
                    </div>
                </div>

                <div className="h-10 w-0.5 bg-white/10 mr-5 hidden sm:block"/>
                <div className="w-full flex items-center sm:justify-end gap-20">
                    <div>
                        <h2 className="uppercase text-zinc-400 text-sm ">SELF-DESTRUCT</h2>
                        <p className="font-lg text-red-500">0:51</p>
                    </div>
                    <button className="relative p-2 text-xs cursor-pointer overflow-hidden rounded-sm bg-zinc-800 hover:bg-zinc-800/80 active:bg-zinc-800 focus:bg-zinc-800 disabled:bg-zinc-800 disabled:opacity-50 text-red-500 font-bold hover:text-red-500/80">DESTROY NOW</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages?.messages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                    <p className="text-zinc-600 text-sm font-mono">
                        No messages yet, start the conversation.
                    </p>
                    </div>
                )}
                
                {messages?.messages.map((msg) => (
                    <div key={msg.id} className="flex flex-col items-start">
                    <div className="max-w-[80%] group">
                        <div className="flex items-baseline gap-3 mb-1">
                        <span
                            className={`text-xs font-bold ${
                            msg.sender === username ? "text-green-500" : "text-blue-500"
                            }`}
                        >
                            {msg.sender === username ? "YOU" : msg.sender}
                        </span>
                
                        <span className="text-[10px] text-zinc-600">
                            {format(msg.timestamp, "HH:mm")}
                        </span>
                        </div>
                
                        <p className="text-sm text-zinc-300 leading-relaxed break-all">
                        {msg.text}
                        </p>
                    </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-5 items-center p-5 border-b border-zinc-800/70 bg-zinc-900/40 h-25 md:px-">
                <input
                    autoFocus
                    type="text"
                    className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm"
                    placeholder="Type Message..."
                    value={input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) {
                          sendMessage({ text: input })
                          inputRef.current?.focus()
                        }
                    }}
                    onChange={(e)=>setInput(e.target.value)}
                />
                
                <button
                onClick={() => {
                    sendMessage({ text: input })
                    inputRef.current?.focus()
                  }}
                disabled={!input.trim() || isPending}
                className="uppercase bg-zinc-700 py-2 px-5 cursor-pointer hover:text-white/90"
                >
                    SEND
                </button>
            </div>
        </div>
    )
}

export default Page
