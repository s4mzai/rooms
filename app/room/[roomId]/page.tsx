"use client"

import ButtonCopy from "@/components/ui/copyButton"
import { useParams } from "next/navigation"

const Page = ()=>{
    const params = useParams()
    const roomId = params.roomId
    return(
        <div className="bg-black text-white min-h-dvh flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-evenly p-5 border-b border-zinc-800/70 bg-zinc-900/40">
                <div className="w-full">
                    <h2 className="uppercase text-zinc-400 text-sm ">ROOM ID</h2>
                    <div className="flex gap-4">
                        <p className="font-lg text-green-500">{roomId}</p>
                        <ButtonCopy duration={1000} loadingDuration={500} onCopy={async()=>{await navigator.clipboard.writeText(String(roomId));}}/>
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

            <div>
                {/* MESSAGES LIST COMPONENT */}
            </div>

            <div className="flex gap-5 items-center p-5 border-b border-zinc-800/70 bg-zinc-900/40 h-25 md:px-">
                <input
                    type="text"
                    className="w-full py-2 px-5 border border-zinc-800/90  text-green-500/80 placeholder:text-zinc-500/50 focus:outline-none focus:ring-0"
                    placeholder="Type Message..."
                />
                
                <button className="uppercase bg-zinc-700 py-2 px-5 cursor-pointer hover:text-white/90">SEND</button>
            </div>
        </div>
    )
}

export default Page
