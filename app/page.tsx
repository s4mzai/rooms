

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh px-4">
      <div>
        <h1 className="text-green-500 text-4xl font-bold tracking-wide mb-2 text-center">{">"}private_chat</h1>
        <p className="text-zinc-400 text-center text-lg font-medium mb-6 tracking-wide">A private, self-destructing chat room</p>
      </div>
      <div className="w-full max-w-md mx-auto flex flex-col bg-zinc-900/50 justify-center gap-4 p-6 sm:p-8 shadow-lg border border-zinc-800 min-h-[240px]">
        <h2 className="text-zinc-400">Your Identity</h2>
        <input type="text" value={"hello"} disabled={true} className="bg-black/80 text-zinc-400 p-2 w-full" />
        <button className="bg-white text-black p-2 w-full hover:bg-white/80 transition-colors">Create Room</button>
      </div>
    </div>
  );
}