"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Copy, Check, Trash2, Repeat2, 
  ArrowRight, Filter, ArrowDownAZ, 
  AlignLeft, FileText, Sparkles, Type, ChevronLeft 
} from "lucide-react";

export default function DeduplicationTool() {
  // --- State ---
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  
  // Options
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortResult, setSortResult] = useState(false);

  // Stats
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
  const [copied, setCopied] = useState(false);

  // --- Logic ---
  useEffect(() => {
    const processText = () => {
      if (!input) {
        setOutput("");
        setStats({ original: 0, unique: 0, removed: 0 });
        return;
      }

      const lines = input.split(/\r?\n/);
      const originalCount = lines.length;
      const seen = new Set();
      let resultLines: string[] = [];

      lines.forEach((line) => {
        let processVal = line;
        if (trimWhitespace) processVal = processVal.trim();
        if (removeEmpty && processVal === "") return;
        
        const checkKey = ignoreCase ? processVal.toLowerCase() : processVal;
        
        if (!seen.has(checkKey)) {
          seen.add(checkKey);
          resultLines.push(trimWhitespace ? processVal : line);
        }
      });

      if (sortResult) {
        resultLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      }

      setOutput(resultLines.join("\n"));
      setStats({
        original: originalCount,
        unique: resultLines.length,
        removed: originalCount - resultLines.length
      });
    };

    processText();
  }, [input, ignoreCase, trimWhitespace, removeEmpty, sortResult]);

  // --- Actions ---
  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex flex-col items-center pt-4 sm:pt-10 pb-safe px-4">
      <main className="w-full max-w-6xl flex flex-col gap-4 sm:gap-6 relative">
        
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
            {/* 返回按钮 */}
            <Link 
              href="/tools" 
              className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all active:scale-95 shadow-sm shrink-0"
              title="返回工具列表"
            >
              <ChevronLeft size={20} />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-3xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2 sm:gap-3">
                <Repeat2 className="text-zinc-400 w-5 h-5 sm:w-8 sm:h-8" />
                Text Deduplicator
              </h1>
              <p className="text-zinc-500 text-xs sm:text-base hidden sm:block">
                智能文本去重工具
              </p>
            </div>
        </div>

        {/* Stats Bar - Mobile Grid optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatCard label="原始行数" value={stats.original} icon={<FileText size={16} />} />
            <StatCard label="去重后结果" value={stats.unique} icon={<Sparkles size={16} />} active />
            
            {/* Mobile: Full width for removed count */}
            <div className="col-span-2 sm:col-span-1 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider">已移除重复</span>
                    <span className="text-xl sm:text-2xl font-semibold text-red-500">-{stats.removed}</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Trash2 size={16} />
                </div>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-auto lg:h-[600px]">
            
            {/* LEFT: Input */}
            <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] lg:h-auto">
                <div className="px-4 sm:px-5 py-3 border-b border-zinc-100 flex justify-between items-center bg-white/40">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-500">输入 (原始数据)</span>
                    {input && (
                        <button onClick={() => setInput("")} className="p-1.5 bg-zinc-100 rounded-lg text-zinc-400 hover:text-red-500 transition-colors" title="Clear">
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="在此粘贴需要去重的文本..."
                    // text-base prevents iOS zoom
                    className="flex-1 w-full p-4 sm:p-5 bg-transparent resize-none outline-none text-base sm:text-sm font-mono text-zinc-700 leading-relaxed custom-scrollbar"
                    spellCheck={false}
                />
            </div>

            {/* MIDDLE: Controls */}
            <div className="flex lg:flex-col items-center justify-center gap-4 shrink-0">
                
                {/* Control Panel - Grid on Mobile, Column on Desktop */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-2 grid grid-cols-2 lg:flex lg:flex-col gap-2 w-full lg:w-44">
                    
                    <div className="hidden lg:block text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1 mb-1">
                        清洗规则
                    </div>

                    <OptionButton 
                        active={trimWhitespace} 
                        onClick={() => setTrimWhitespace(!trimWhitespace)} 
                        icon={<AlignLeft size={16} />} 
                        label="去除前后空格"
                    />
                    
                    <OptionButton 
                        active={removeEmpty} 
                        onClick={() => setRemoveEmpty(!removeEmpty)} 
                        icon={<Filter size={16} />} 
                        label="移除空行"
                    />
                    
                    <div className="hidden lg:block w-full h-px bg-zinc-100 my-1" />
                    
                    <OptionButton 
                        active={ignoreCase} 
                        onClick={() => setIgnoreCase(!ignoreCase)} 
                        icon={<Type size={16} />} 
                        label="忽略大小写"
                    />
                    
                    <OptionButton 
                        active={sortResult} 
                        onClick={() => setSortResult(!sortResult)} 
                        icon={<ArrowDownAZ size={16} />} 
                        label="A-Z 排序"
                    />
                </div>
                
                {/* Arrow Icon - Hidden on mobile */}
                <div className="hidden lg:flex text-zinc-300">
                    <ArrowRight size={24} />
                </div>
            </div>

            {/* RIGHT: Output */}
            <div className="flex-1 flex flex-col bg-zinc-50/80 border border-zinc-200 shadow-inner rounded-2xl sm:rounded-3xl overflow-hidden relative min-h-[200px] lg:h-auto">
                <div className="px-4 sm:px-5 py-3 border-b border-zinc-200/50 flex justify-between items-center bg-white/40">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600">输出 (结果)</span>
                    <span className={`text-[10px] sm:text-xs font-bold text-green-600 transition-all duration-300 ${copied ? "opacity-100" : "opacity-0"}`}>
                        已复制到剪贴板
                    </span>
                </div>
                <textarea 
                    readOnly
                    value={output}
                    placeholder="去重后的结果将显示在这里..."
                    className="flex-1 w-full p-4 sm:p-5 bg-transparent resize-none outline-none text-base sm:text-sm font-mono text-zinc-700 leading-relaxed custom-scrollbar"
                />
                
                {/* Mobile specific layout for button: Float bottom right */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full font-medium shadow-lg transition-all active:scale-95 touch-manipulation ${
                            output 
                            ? "bg-zinc-900 text-white hover:bg-black shadow-zinc-900/20" 
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}
                    >
                        {copied ? <Check size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
                        <span className="text-sm sm:text-base">{copied ? "已复制" : "复制结果"}</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div className="text-center pt-4 pb-2 lg:hidden">
             <p className="text-[10px] text-zinc-400">Simple Tools</p>
        </div>

      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.1); border-radius: 20px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.2); }
        /* Safe area padding for iPhone home bar */
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}

// 辅助组件：带文字的按钮
function OptionButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left active:scale-[0.98] touch-manipulation ${
                active 
                ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200 shadow-sm" 
                : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
        >
            <div className={`shrink-0 ${active ? "text-blue-500" : "text-zinc-400"}`}>
                {icon}
            </div>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hidden sm:block" />}
        </button>
    )
}

function StatCard({ label, value, icon, active = false }: { label: string, value: number, icon: any, active?: boolean }) {
    return (
        <div className={`backdrop-blur-xl border rounded-2xl p-3 sm:p-4 flex items-center justify-between transition-all ${
            active ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100" : "bg-white/60 border-white/20"
        }`}>
            <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</span>
                <span className={`text-xl sm:text-2xl font-semibold ${active ? "text-blue-600" : "text-zinc-900"}`}>{value}</span>
            </div>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${active ? "bg-blue-50 text-blue-500" : "bg-zinc-100 text-zinc-400"}`}>
                {icon}
            </div>
        </div>
    )
}
