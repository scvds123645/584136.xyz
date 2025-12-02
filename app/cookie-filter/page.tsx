"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Trash2, Cookie, ListChecks, Layers, ChevronLeft } from "lucide-react";

interface CookieResult {
  id: number;
  c_user: string | null;
  xs: string | null;
  formatted: string; // c_user=xxx; xs=xxx;
}

export default function MultiCookieExtractor() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<CookieResult[]>([]);
  
  // 状态管理
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // 核心提取逻辑
  const processText = (inputText: string) => {
    const lines = inputText.split(/\r?\n/);
    
    const extracted: CookieResult[] = [];
    lines.forEach((line, index) => {
      if (!line.trim()) return; // 跳过空行
      
      const getValue = (key: string) => {
        const match = line.match(new RegExp(`(?:^|;\\s*)${key}=([^;]*)`));
        return match ? match[1] : null;
      };

      const c_user = getValue("c_user");
      const xs = getValue("xs");

      if (c_user || xs) {
        const parts = [];
        if (c_user) parts.push(`c_user=${c_user}`);
        if (xs) parts.push(`xs=${xs}`);
        
        const formatted = parts.join("; ") + ";";
        extracted.push({
          id: index,
          c_user,
          xs,
          formatted
        });
      }
    });
    setResults(extracted);
    setAllCopied(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    processText(newText);
  };

  const copyItem = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAll = () => {
    if (results.length === 0) return;
    const allContent = results.map(r => r.formatted).join('\n');
    navigator.clipboard.writeText(allContent);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
    setResults([]);
    setAllCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex items-center justify-center p-3 sm:p-8">
      <main className="w-full max-w-3xl flex flex-col gap-4 sm:gap-6 relative">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 返回按钮 */}
            <Link 
              href="/tools" 
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all active:scale-95 shadow-sm shrink-0"
              title="返回工具列表"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-4xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2 sm:gap-3">
                <Cookie className="text-zinc-400 w-5 h-5 sm:w-8 sm:h-8" />
                Cookie Filter
              </h1>
              <p className="text-zinc-500 text-xs sm:text-lg font-medium hidden sm:block">
                批量提取多行 Cookie 中的 c_user 和 xs
              </p>
            </div>
          </div>
        </div>

        {/* Main Container 
            Mobile: h-[85vh] ensures it fits on screen but leaves room.
            Desktop: h-[600px] fixed height.
        */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl shadow-zinc-200/50 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col sm:flex-row h-[82vh] sm:h-[600px] transition-all duration-500">
          
          {/* Left Side: Input Area 
              Mobile: h-[35%] fixed ratio to ensure results are visible.
              Desktop: w-1/2 h-full.
          */}
          <div className="w-full h-[35%] sm:h-full sm:w-1/2 p-1 flex flex-col border-b sm:border-b-0 sm:border-r border-zinc-100 bg-white/40 relative group shrink-0">
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
                <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">Input Data</span>
                {text && (
                    <button onClick={clearAll} className="p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors touch-manipulation" title="Clear">
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="在此粘贴多行数据...&#10;例如：&#10;xxxxx c_user=123; xs=abc;"
              // text-base on mobile prevents iOS zoom, text-sm on desktop is cleaner
              className="flex-1 w-full px-4 sm:px-6 pb-4 pt-0 bg-transparent resize-none outline-none text-base sm:text-sm font-mono text-zinc-600 placeholder:text-zinc-300 leading-relaxed custom-scrollbar"
              spellCheck={false}
            />
          </div>

          {/* Right Side: Results List 
              Mobile: flex-1 (takes remaining 65% height).
          */}
          <div className="w-full flex-1 sm:h-full sm:w-1/2 flex flex-col bg-zinc-50/50 min-h-0">
            
            {/* Result Header & Actions */}
            <div className="h-12 sm:h-14 px-4 sm:px-6 border-b border-zinc-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2">
                <ListChecks size={16} className="text-zinc-400" />
                <span className="text-xs sm:text-sm font-semibold text-zinc-600">
                  Results {results.length > 0 && <span className="bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full text-[10px] sm:text-xs ml-1">{results.length}</span>}
                </span>
              </div>
              
              {results.length > 0 && (
                <button
                  onClick={copyAll}
                  disabled={allCopied}
                  className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-medium transition-all duration-300 px-2.5 sm:px-3 py-1.5 rounded-full touch-manipulation ${
                    allCopied 
                      ? "text-green-600 bg-green-100 cursor-default" 
                      : "text-white bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-blue-200"
                  }`}
                >
                  {allCopied ? <Check size={12} className="sm:w-3.5 sm:h-3.5" /> : <Layers size={12} className="sm:w-3.5 sm:h-3.5" />}
                  {allCopied ? "已复制" : "复制全部"}
                </button>
              )}
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar">
              {results.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-zinc-300 gap-2">
                    <Cookie size={40} className="opacity-10 sm:w-12 sm:h-12" />
                    <p className="text-xs sm:text-sm">等待输入...</p>
                 </div>
              ) : (
                <div className="flex flex-col gap-2 sm:gap-3 pb-safe">
                  {results.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-white p-2.5 sm:p-3 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-2"
                    >
                      {/* Top Row: Badge & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {item.c_user ? (
                                <span className="bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium border border-zinc-200">
                                    {item.c_user}
                                </span>
                            ) : (
                                <span className="text-[10px] text-zinc-400 italic">No ID</span>
                            )}
                        </div>
                        
                        {/* Inline Copy Status */}
                         <span 
                            className={`text-[10px] font-bold text-green-600 uppercase tracking-wider transition-all duration-300 ${
                                copiedId === item.id 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 translate-x-2"
                            }`}
                        >
                            Copied
                        </span>
                      </div>

                      {/* Bottom Row: Code & Copy Button */}
                      <div className="flex items-end justify-between gap-3">
                        <code className="text-[11px] sm:text-xs text-zinc-500 font-mono break-all line-clamp-2 bg-zinc-50 p-1.5 rounded-lg w-full border border-transparent group-hover:border-zinc-100 transition-colors">
                            {item.formatted}
                        </code>
                        
                        <button
                          onClick={() => copyItem(item.formatted, item.id)}
                          className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 touch-manipulation ${
                            copiedId === item.id
                              ? "bg-green-500 text-white shadow-md scale-105"
                              : "bg-zinc-100 text-zinc-400 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:text-white"
                          }`}
                        >
                          {copiedId === item.id ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* 底部留白，防止被移动端底部条遮挡 */}
                  <div className="h-8 sm:hidden"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center hidden sm:block">
            <p className="text-sm text-zinc-400">Designed for Efficiency</p>
        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.15);
        }
        /* Safe area padding for iPhone home bar */
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}
