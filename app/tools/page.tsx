"use client";

import Link from "next/link";
import { 
  Hash, Cookie, RefreshCw, Repeat2, 
  LayoutGrid, ArrowRight, Wrench,
  Globe 
} from "lucide-react";

// 工具配置列表
const TOOLS = [
  {
    id: "number-extractor",
    name: "Number Extractor",
    desc: "提取文本中的 14 位数字编码",
    path: "/number-extractor",
    icon: <Hash className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-orange-500",
  },
  {
    id: "cookie-filter",
    name: "Cookie Filter",
    desc: "提取 c_user 和 xs 关键字段",
    path: "/cookie-filter",
    icon: <Cookie className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-blue-500",
  },
  {
    id: "cookie-converter",
    name: "Cookie Converter",
    desc: "自动拼接 UID 和密码格式",
    path: "/cookie-converter",
    icon: <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "text-deduplicator",
    name: "Text Deduplicator",
    desc: "智能文本去重与清洗工具",
    path: "/text-deduplicator",
    icon: <Repeat2 className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-emerald-500",
  },
  {
    id: "fb-uid-checker",
    name: "FB UID Checker",
    desc: "Facebook UID 批量检测工具",
    path: "https://3.584136.xyz/",
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-sky-600",
  },
  {
    id: "app-store",
    name: "App Store UI",
    desc: "Apple 风格软件商店演示",
    path: "/app-store",
    icon: <LayoutGrid className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    color: "bg-zinc-900",
  },
];

export default function Home() {
  return (
    // 增加 safe-area 支持，适配刘海屏
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 selection:bg-blue-500/20 flex flex-col pb-[env(safe-area-inset-bottom)]">
      
      {/* Header - 移动端更紧凑 (h-14) */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/85 backdrop-blur-md border-b border-zinc-200/60 supports-[backdrop-filter]:bg-[#F5F5F7]/60">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo 尺寸适配 */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
              <Wrench className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-base md:text-xl font-bold tracking-tight text-zinc-900 leading-tight">Efficiency Hub</h1>
              <p className="hidden md:block text-xs text-zinc-500 font-medium">All your tools in one place</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid - 关键布局变化 */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-4 md:px-6 md:py-12 w-full">
        
        {/* 
           移动端: grid-cols-2 (双列) + gap-3 (小间距)
           桌面端: grid-cols-3 (三列) + gap-6 (大间距)
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {TOOLS.map((tool) => {
            const isExternal = tool.path.startsWith("http");
            
            return (
              <Link 
                href={tool.path} 
                key={tool.id} 
                className="group block h-full"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <div className="h-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-zinc-100 shadow-sm transition-all duration-300 active:scale-95 active:bg-zinc-50 hover:shadow-xl hover:shadow-zinc-200/60 hover:-translate-y-1 hover:border-zinc-200 flex flex-col justify-between">
                  
                  <div>
                    {/* Icon - 移动端缩小 (w-10 h-10) */}
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${tool.color} shadow-md shadow-zinc-200/50 mb-3 md:mb-6 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      {tool.icon}
                    </div>
                    
                    {/* Title - 移动端字体 text-sm */}
                    <h2 className="text-sm md:text-xl font-bold text-zinc-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {tool.name}
                    </h2>
                    
                    {/* Desc - 移动端限制2行 (line-clamp-2) + 字体 text-xs */}
                    <p className="text-xs md:text-sm text-zinc-500 leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-none h-8 md:h-auto">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Action Arrow - 移动端隐藏文字，只保留图标或隐藏整个区域 */}
                  <div className="mt-3 md:mt-8 flex items-center text-xs md:text-sm font-semibold text-zinc-300 group-hover:text-blue-500 transition-colors">
                    <span className="hidden md:inline">{isExternal ? "Visit Site" : "Open Tool"}</span>
                    <span className="md:hidden text-[10px] bg-zinc-50 px-2 py-1 rounded-md text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        OPEN
                    </span>
                    <ArrowRight className="ml-auto md:ml-2 w-3 h-3 md:w-4 md:h-4 transform transition-transform duration-300 group-hover:translate-x-1 hidden md:block" />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Placeholder Card */}
          <div className="h-full border-2 border-dashed border-zinc-200 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center gap-2 md:gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default min-h-[140px] md:min-h-[240px]">
             <div className="w-8 h-8 md:w-12 md:h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                <span className="text-lg md:text-xl font-bold">+</span>
             </div>
             <p className="text-xs md:text-sm font-medium text-zinc-400">More...</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-[10px] md:text-xs text-zinc-400 font-medium">
          Designed for maximum productivity.
        </p>
      </footer>
    </div>
  );
}
