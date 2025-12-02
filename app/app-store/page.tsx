"use client";

import { useState } from "react";
import { 
  Search, LayoutGrid, Image as ImageIcon, Music, Video, 
  Check, Gamepad2, Box, Loader2
} from "lucide-react";

// --- 1. 模拟数据 ---
const APPS = [
  {
    id: 1,
    name: "Pixel Pro",
    category: "Photography",
    desc: "Professional photo editing tools.",
    icon: <ImageIcon className="text-white" size={28} />,
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
    price: "GET",
  },
  {
    id: 2,
    name: "Sonic Flow",
    category: "Music",
    desc: "Stream lossless audio anywhere.",
    icon: <Music className="text-white" size={28} />,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    price: "GET",
  },
  {
    id: 3,
    name: "Cinema X",
    category: "Entertainment",
    desc: "Watch 4K movies offline.",
    icon: <Video className="text-white" size={28} />,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    price: "GET",
  },
  {
    id: 4,
    name: "Task Master",
    category: "Productivity",
    desc: "Organize your life efficiently.",
    icon: <Check className="text-white" size={28} />,
    color: "bg-gradient-to-br from-emerald-400 to-teal-600",
    price: "$4.99",
  },
  {
    id: 5,
    name: "Nebula Glide",
    category: "Games",
    desc: "Arcade racing in space.",
    icon: <Gamepad2 className="text-white" size={28} />,
    color: "bg-gradient-to-br from-orange-400 to-red-600",
    price: "GET",
  },
  {
    id: 6,
    name: "Cloud Box",
    category: "Utilities",
    desc: "Secure storage for everyone.",
    icon: <Box className="text-white" size={28} />,
    color: "bg-gradient-to-br from-sky-400 to-cyan-600",
    price: "GET",
  },
];

export default function AppStore() {
  const [searchTerm, setSearchTerm] = useState("");

  // 过滤逻辑
  const filteredApps = APPS.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 selection:bg-blue-500/20 pb-[env(safe-area-inset-bottom)]">
      
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/85 backdrop-blur-md border-b border-zinc-200/60 supports-[backdrop-filter]:bg-[#F5F5F7]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center gap-3">
          
          {/* Logo */}
          <div className="w-8 h-8 md:w-9 md:h-9 bg-zinc-900 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
              <LayoutGrid size={16} className="md:w-5 md:h-5" />
          </div>
          
          {/* Search Bar */}
          <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-200/60 focus:bg-white border border-transparent focus:border-blue-500/20 rounded-xl py-2 pl-9 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-zinc-500/80 shadow-inner md:shadow-none"
            />
          </div>

          {/* Avatar Placeholder */}
          <div className="hidden md:block w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* --- App List Section --- */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 删除了 justify-between 和 See All 按钮，现在标题独占一行 */}
            <div className="mb-4 px-1">
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">Today's Favorites</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                ))}
                
                {filteredApps.length === 0 && (
                    <div className="col-span-full py-12 text-center flex flex-col items-center justify-center text-zinc-400">
                        <Search size={48} className="opacity-20 mb-4" />
                        <p>No apps found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-zinc-200 text-center">
            <p className="text-xs text-zinc-400">
                Copyright © 2024 Apple Style Store Inc. All rights reserved.
            </p>
        </footer>
      </main>
    </div>
  );
}

// --- 子组件：App 卡片 ---
function AppCard({ app }: { app: typeof APPS[0] }) {
    return (
        <div className="group bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-zinc-100 md:hover:shadow-xl md:hover:shadow-zinc-200/50 md:hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 md:gap-4 active:scale-[0.98]">
            
            {/* Icon */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-[1.2rem] ${app.color} flex items-center justify-center shadow-md shadow-zinc-200/50 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                <div className="scale-90 md:scale-100 transform transition-transform">
                    {app.icon}
                </div>
            </div>
            
            {/* Text Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                <h3 className="font-semibold text-base md:text-lg text-zinc-900 truncate leading-tight">{app.name}</h3>
                <p className="text-[10px] md:text-xs text-zinc-400 font-medium mb-0.5 uppercase tracking-wide">{app.category}</p>
                <p className="text-xs text-zinc-500 line-clamp-1 md:line-clamp-2 leading-relaxed hidden xs:block">{app.desc}</p>
            </div>
            
            {/* Action Button */}
            <div className="shrink-0 flex flex-col items-center justify-center pl-1">
                 <GetButton initialLabel={app.price} />
                 <span className="text-[9px] md:text-[10px] text-zinc-400 mt-1 font-medium scale-90 md:scale-100 origin-top">In-App</span>
            </div>
        </div>
    );
}

// --- 子组件：GET 按钮 ---
function GetButton({ initialLabel = "GET" }: { initialLabel?: string }) {
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

    const handleClick = () => {
        if (status !== "idle") return;
        setStatus("loading");
        setTimeout(() => setStatus("done"), 1500);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                relative overflow-hidden font-bold text-xs md:text-sm tracking-wide rounded-full transition-all duration-500
                flex items-center justify-center select-none
                ${status === "idle" 
                    ? "bg-zinc-100 text-blue-600 hover:bg-blue-100 w-[4.5rem] h-7 md:w-20 md:h-8 active:scale-90" 
                    : ""}
                ${status === "loading" 
                    ? "w-7 h-7 md:w-8 md:h-8 bg-zinc-100 cursor-wait" 
                    : ""}
                ${status === "done" 
                    ? "bg-transparent text-zinc-400 ring-1 md:ring-2 ring-inset ring-zinc-200 w-[4.5rem] h-7 md:w-20 md:h-8 cursor-default" 
                    : ""}
            `}
        >
            <span className={`absolute transition-all duration-300 ${status === "idle" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                {initialLabel}
            </span>
            <Loader2 
                className={`absolute animate-spin text-zinc-400 transition-all duration-300 ${status === "loading" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} 
                size={14} 
                strokeWidth={3}
            />
            <span className={`absolute transition-all duration-300 ${status === "done" ? "opacity-100 scale-100 font-semibold" : "opacity-0 scale-150"}`}>
                OPEN
            </span>
        </button>
    )
}
