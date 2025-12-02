"use client";

import Link from "next/link";
import { 
  Hash, Cookie, RefreshCw, Repeat2, 
  LayoutGrid, ArrowRight, Wrench,
  Globe // 新增图标
} from "lucide-react";

// 工具配置列表
const TOOLS = [
  {
    id: "number-extractor",
    name: "Number Extractor",
    desc: "提取文本中的 14 位数字编码",
    path: "/number-extractor",
    icon: <Hash size={32} className="text-white" />,
    color: "bg-orange-500",
  },
  {
    id: "cookie-filter",
    name: "Cookie Filter",
    desc: "提取 c_user 和 xs 关键字段",
    path: "/cookie-filter",
    icon: <Cookie size={32} className="text-white" />,
    color: "bg-blue-500",
  },
  {
    id: "cookie-converter",
    name: "Cookie Converter",
    desc: "自动拼接 UID 和密码格式",
    path: "/cookie-converter",
    icon: <RefreshCw size={32} className="text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "text-deduplicator",
    name: "Text Deduplicator",
    desc: "智能文本去重与清洗工具",
    path: "/text-deduplicator",
    icon: <Repeat2 size={32} className="text-white" />,
    color: "bg-emerald-500",
  },
  {
    id: "fb-uid-checker",
    name: "FB UID Checker",
    desc: "Facebook UID 批量检测工具",
    path: "https://3.584136.xyz/", // 外部链接
    icon: <Globe size={32} className="text-white" />,
    color: "bg-sky-600", // 新增颜色
  },
  {
    id: "app-store",
    name: "App Store UI",
    desc: "Apple 风格软件商店演示",
    path: "/app-store",
    icon: <LayoutGrid size={32} className="text-white" />,
    color: "bg-zinc-900",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 selection:bg-blue-500/20 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-zinc-200/50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-900">
              <Wrench size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900">Efficiency Hub</h1>
              <p className="text-xs text-zinc-500 font-medium">All your tools in one place</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            // 判断是否为外部链接
            const isExternal = tool.path.startsWith("http");
            
            return (
              <Link 
                href={tool.path} 
                key={tool.id} 
                className="group block h-full"
                target={isExternal ? "_blank" : undefined} // 外部链接新标签页打开
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <div className="h-full bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/60 hover:-translate-y-1 hover:border-zinc-200 flex flex-col justify-between">
                  
                  <div>
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-2xl ${tool.color} shadow-lg shadow-zinc-200 mb-6 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      {tool.icon}
                    </div>
                    
                    <h2 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Action Arrow */}
                  <div className="mt-8 flex items-center text-sm font-semibold text-zinc-300 group-hover:text-blue-500 transition-colors">
                    <span>{isExternal ? "Visit Site" : "Open Tool"}</span>
                    <ArrowRight size={16} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                </div>
              </Link>
            );
          })}

          {/* Placeholder */}
          <div className="h-full border-2 border-dashed border-zinc-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default min-h-[240px]">
             <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                <span className="text-xl font-bold">+</span>
             </div>
             <p className="text-sm font-medium text-zinc-400">More coming soon...</p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-zinc-400 font-medium">
          Designed for maximum productivity.
        </p>
      </footer>

    </div>
  );
}
