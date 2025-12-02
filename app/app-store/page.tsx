"use client";

import { useState } from "react";
import { 
  Search, Download, Cloud, Command, 
  Zap, Image as ImageIcon, Music, Video, 
  Box, Check, Loader2, Gamepad2, LayoutGrid
} from "lucide-react";

// --- 1. 模拟数据 ---
const APPS = [
  {
    id: 1,
    name: "Pixel Pro",
    category: "Photography",
    desc: "Professional photo editing tools.",
    icon: <ImageIcon className="text-white" size={32} />,
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
    price: "GET",
  },
  {
    id: 2,
    name: "Sonic Flow",
    category: "Music",
    desc: "Stream lossless audio anywhere.",
    icon: <Music className="text-white" size={32} />,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    price: "GET",
  },
  {
    id: 3,
    name: "Cinema X",
    category: "Entertainment",
    desc: "Watch 4K movies offline.",
    icon: <Video className="text-white" size={32} />,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    price: "GET",
  },
  {
    id: 4,
    name: "Task Master",
    category: "Productivity",
    desc: "Organize your life efficiently.",
    icon: <Check className="text-white" size={32} />,
    color: "bg-gradient-to-br from-emerald-400 to-teal-600",
    price: "$4.99",
  },
  {
    id: 5,
    name: "Nebula Glide",
    category: "Games",
    desc: "Arcade racing in space.",
    icon: <Gamepad2 className="text-white" size={32} />,
    color: "bg-gradient-to-br from-orange-400 to-red-600",
    price: "GET",
  },
  {
    id: 6,
    name: "Cloud Box",
    category: "Utilities",
    desc: "Secure storage for everyone.",
    icon: <Box className="text-white" size={32} />,
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
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 selection:bg-blue-500/20">
      
      {/* --- Header (Glassmorphism) --- */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-zinc-200/50 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             {/* Logo Area */}
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                <LayoutGrid size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">App Store</span>
          </div>

          {/* Search Bar (Now aligned to the right since avatar is gone) */}
          <div className="relative group w-full max-w-xs hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Apps, Games..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-200/50 hover:bg-zinc-200/80 focus:bg-white border border-transparent focus:border-blue-500/30 rounded-xl py-2 pl-10 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-zinc-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* --- App List Section --- */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold text-zinc-900">Popular Apps</h2>
                <span className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">See All</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                ))}
                
                {filteredApps.length === 0 && (
                    <div className="col-span-full py-20 text-center text-zinc-400">
                        <p>No apps found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-20 border-t border-zinc-200 text-center">
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
        <div className="group bg-white p-4 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
            {/* Icon */}
            <div className={`w-20 h-20 rounded-[1.2rem] ${app.color} flex items-center justify-center shadow-lg shadow-zinc-200 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                {app.icon}
            </div>
            
            {/* Text Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-zinc-900 truncate">{app.name}</h3>
                <p className="text-xs text-zinc-400 font-medium mb-1 uppercase tracking-wide">{app.category}</p>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{app.desc}</p>
            </div>
            
            {/* Action Button */}
            <div className="shrink-0 flex flex-col items-center">
                 <GetButton initialLabel={app.price} />
                 <span className="text-[10px] text-zinc-400 mt-1.5 font-medium">In-App Purchases</span>
            </div>
        </div>
    );
}

// --- 子组件：GET 按钮 (核心交互) ---
function GetButton({ initialLabel = "GET" }: { initialLabel?: string }) {
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

    const handleClick = () => {
        if (status !== "idle") return;
        
        setStatus("loading");
        // 模拟下载过程 1.5秒
        setTimeout(() => {
            setStatus("done");
        }, 1500);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                relative overflow-hidden font-bold text-xs sm:text-sm tracking-wide rounded-full transition-all duration-500
                flex items-center justify-center
                ${status === "idle" 
                    ? "bg-zinc-100 text-blue-600 hover:bg-blue-100 w-20 h-8 active:scale-95" 
                    : ""}
                ${status === "loading" 
                    ? "w-8 h-8 bg-zinc-100 cursor-wait" 
                    : ""}
                ${status === "done" 
                    ? "bg-transparent text-zinc-400 ring-2 ring-inset ring-zinc-200 w-20 h-8 cursor-default" 
                    : ""}
            `}
        >
            {/* Idle State */}
            <span className={`absolute transition-all duration-300 ${status === "idle" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                {initialLabel}
            </span>

            {/* Loading State */}
            <Loader2 
                className={`absolute animate-spin text-zinc-400 transition-all duration-300 ${status === "loading" ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} 
                size={16} 
                strokeWidth={3}
            />

            {/* Done State (OPEN) */}
            <span className={`absolute transition-all duration-300 ${status === "done" ? "opacity-100 scale-100 font-semibold" : "opacity-0 scale-150"}`}>
                OPEN
            </span>
        </button>
    )
}
