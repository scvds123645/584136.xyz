"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Hash, Cookie, RefreshCw, Repeat2, 
  ArrowRight, ChevronLeft, Globe, ChevronRight, 
  ShoppingBag 
} from "lucide-react";

// ⚠️ 注意：Metadata 不能在 "use client" 组件中导出。
// 请将原本的 export const metadata 移动到父级 layout.tsx 或 page.tsx (Server Component) 中。

// 工具配置列表
const TOOLS = [
  {
    id: "number-extractor",
    name: "数字提取工具",
    desc: "从乱序文本中批量提取 14 位或其他长度的数字编码",
    path: "/number-extractor",
    icon: <Hash className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-orange-500",
  },
  {
    id: "cookie-filter",
    name: "Cookie 筛选器",
    desc: "一键提取 Netscape/JSON 中的 c_user 和 xs 核心字段",
    path: "/cookie-filter",
    icon: <Cookie className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-blue-500",
  },
  {
    id: "cookie-converter",
    name: "Cookie 格式转换",
    desc: "自动拼接 UID、密码和 Cookie，生成标准化格式",
    path: "/cookie-converter",
    icon: <RefreshCw className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-indigo-500",
  },
  {
    id: "text-deduplicator",
    name: "文本去重工具",
    desc: "智能文本去重与清洗，支持自定义分隔符与正则",
    path: "/text-deduplicator",
    icon: <Repeat2 className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-emerald-500",
  },
  {
    id: "fb-uid-checker",
    name: "FB UID 检测器",
    desc: "Facebook UID 批量在线检测，快速筛选有效账号",
    path: "https://3.584136.xyz/",
    icon: <Globe className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-sky-600",
  },
  {
    id: "software-store",
    name: "软件商店",
    desc: "常用软件在线安装与下载",
    path: "/app-store",
    icon: <ShoppingBag className="w-5 h-5 md:w-8 md:h-8 text-white" aria-hidden="true" />,
    color: "bg-rose-500",
  },
];

// JSON-LD 数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": TOOLS.map((tool, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "SoftwareApplication",
      "name": tool.name,
      "description": tool.desc,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "url": tool.path.startsWith("http") ? tool.path : `https://your-domain.com${tool.path}`
    }
  }))
};

export default function ToolsPage() {
  const router = useRouter();

  // --- 核心逻辑：处理点击延迟 ---
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // 如果是外部链接，不做处理，直接交由浏览器打开
    if (path.startsWith("http")) return;

    e.preventDefault(); // 1. 阻止立即跳转

    // 2. 设置延迟 (250ms)，确保 active:scale 动画能被用户肉眼捕捉到
    setTimeout(() => {
      router.push(path);
    }, 250);
  };

  return (
    <div 
      className="min-h-[100dvh] bg-[#F5F5F7] font-sans text-zinc-900 selection:bg-blue-500/20 flex flex-col pb-[env(safe-area-inset-bottom)] select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/85 backdrop-blur-md border-b border-zinc-200/60 supports-[backdrop-filter]:bg-[#F5F5F7]/60 transition-all">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            {/* 返回按钮 - 绑定延迟点击 */}
            <Link 
              href="/" 
              onClick={(e) => handleNavigation(e, "/")}
              aria-label="返回首页" 
              className="group outline-none"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0 
                transition-all duration-300 ease-out
                group-hover:bg-zinc-50 group-hover:border-zinc-300 
                active:bg-zinc-100 active:scale-95 active:duration-200 
                transform-gpu touch-manipulation">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-600 group-hover:text-zinc-900" />
              </div>
            </Link>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-base md:text-xl font-bold tracking-tight text-zinc-900 leading-tight">效率工具箱</h1>
              <p className="hidden md:block text-xs text-zinc-500 font-medium">汇聚实用工具，提升工作效率</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-4 md:px-6 md:py-12 w-full">
        
        <h2 className="sr-only">工具列表</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {TOOLS.map((tool) => {
            const isExternal = tool.path.startsWith("http");
            
            return (
              <Link 
                href={tool.path} 
                key={tool.id}
                // 绑定延迟点击事件
                onClick={(e) => handleNavigation(e, tool.path)}
                className="group block h-full outline-none focus:outline-none ring-0"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`打开 ${tool.name}`}
              >
                <article className="h-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-zinc-100 shadow-sm 
                  transition-all duration-500 ease-out
                  /* 动画核心：按下时缩小至 96% */
                  active:scale-[0.96] active:bg-zinc-50 active:duration-200 
                  hover:shadow-xl hover:shadow-zinc-200/60 hover:-translate-y-0.5 md:hover:-translate-y-1 hover:border-zinc-200 
                  transform-gpu touch-manipulation
                  flex flex-row md:flex-col items-center md:items-start md:justify-between gap-4 md:gap-0">
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${tool.color} shadow-md shadow-zinc-200/50 flex items-center justify-center shrink-0 md:mb-6 transform transition-transform duration-500 group-hover:scale-110 md:group-hover:rotate-3`}>
                    {tool.icon}
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-zinc-900 mb-0.5 md:mb-2 group-hover:text-blue-600 transition-colors truncate">
                      {tool.name}
                    </h3>
                    <p className="text-xs md:text-sm text-zinc-500 leading-tight md:leading-relaxed line-clamp-2 md:line-clamp-none">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="md:mt-8 md:w-full flex items-center shrink-0">
                    <ChevronRight className="w-5 h-5 text-zinc-300 md:hidden" />
                    <div className="hidden md:flex items-center text-sm font-semibold text-zinc-300 group-hover:text-blue-500 transition-colors w-full">
                       <span>{isExternal ? "访问站点" : "立即使用"}</span>
                       <ArrowRight className="ml-auto w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
          
          {/* 占位卡片 - 保持原样 */}
          <div className="h-full border-2 border-dashed border-zinc-200 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-row md:flex-col items-center justify-center md:text-center gap-3 opacity-60 hover:opacity-100 transition-all cursor-default min-h-[80px] md:min-h-[240px] 
            duration-500 ease-out active:scale-[0.96] active:bg-zinc-50 active:duration-200 transform-gpu touch-manipulation select-none">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 shrink-0">
                <span className="text-lg md:text-xl font-bold">+</span>
             </div>
             <p className="text-xs md:text-sm font-medium text-zinc-400">更多工具 敬请期待...</p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-[10px] md:text-xs text-zinc-400 font-medium">
          致力于为您提供极致的效率体验
        </p>
      </footer>
    </div>
  );
}
