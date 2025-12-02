"use client";

import { useState, useEffect } from "react";
import { 
  Copy, Check, Trash2, Repeat2, 
  ArrowRight, Filter, ArrowDownAZ, 
  AlignLeft, FileText, Sparkles, Type 
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
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-6xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 flex items-center gap-3">
            <Repeat2 className="text-zinc-400" />
            Text Deduplicator
          </h1>
          <p className="text-zinc-500">
            智能文本去重工具
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="原始行数" value={stats.original} icon={<FileText size={18} />} />
            <StatCard label="去重后结果" value={stats.unique} icon={<Sparkles size={18} />} active />
            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">已移除重复项</span>
                    <span className="text-2xl font-semibold text-red-500">-{stats.removed}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Trash2 size={18} />
                </div>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
            
            {/* LEFT: Input */}
            <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-3xl overflow-hidden h-[300px] lg:h-auto">
                <div className="px-5 py-3 border-b border-zinc-100 flex justify-between items-center bg-white/40">
                    <span className="text-sm font-semibold text-zinc-500">输入 (原始数据)</span>
                    {input && (
                        <button onClick={() => setInput("")} className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1">
                            <Trash2 size={12} /> 清空
                        </button>
                    )}
                </div>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="在此粘贴文本..."
                    className="flex-1 w-full p-5 bg-transparent resize-none outline-none text-sm font-mono text-zinc-700 leading-relaxed custom-scrollbar"
                    spellCheck={false}
                />
            </div>

            {/* MIDDLE: Controls (Updated with Labels) */}
            <div className="flex lg:flex-col items-center justify-center gap-4">
                
                {/* Control Panel */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-2 flex flex-wrap lg:flex-col gap-2 w-full lg:w-40">
                    
                    <div className="hidden lg:block text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1 mb-1">
                        清洗规则
                    </div>

                    <OptionButton 
                        active={trimWhitespace} 
                        onClick={() => setTrimWhitespace(!trimWhitespace)} 
                        icon={<AlignLeft size={16} />} 
                        label="去除空格"
                    />
                    
                    <OptionButton 
                        active={removeEmpty} 
                        onClick={() => setRemoveEmpty(!removeEmpty)} 
                        icon={<Filter size={16} />} 
                        label="移除空行"
                    />

                    <div className="w-full h-px bg-zinc-100 my-1 hidden lg:block" />

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

                <div className="hidden lg:flex text-zinc-300">
                    <ArrowRight size={24} />
                </div>
            </div>

            {/* RIGHT: Output */}
            <div className="flex-1 flex flex-col bg-zinc-50/80 border border-zinc-200 shadow-inner rounded-3xl overflow-hidden relative h-[300px] lg:h-auto">
                <div className="px-5 py-3 border-b border-zinc-200/50 flex justify-between items-center bg-white/40">
                    <span className="text-sm font-semibold text-blue-600">输出 (去重后)</span>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold text-green-600 transition-all duration-300 ${copied ? "opacity-100" : "opacity-0"}`}>
                            已复制
                        </span>
                    </div>
                </div>
                <textarea 
                    readOnly
                    value={output}
                    placeholder="结果..."
                    className="flex-1 w-full p-5 bg-transparent resize-none outline-none text-sm font-mono text-zinc-700 leading-relaxed custom-scrollbar"
                />
                
                <div className="absolute bottom-6 right-6">
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium shadow-lg transition-all active:scale-95 ${
                            output 
                            ? "bg-zinc-900 text-white hover:bg-black" 
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "已复制" : "复制结果"}
                    </button>
                </div>
            </div>

        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.1); border-radius: 20px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.2); }
      `}</style>
    </div>
  );
}

// 辅助组件：带文字的按钮
function OptionButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-left ${
                active 
                ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200" 
                : "bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
        >
            <div className={`shrink-0 ${active ? "text-blue-500" : "text-zinc-400"}`}>
                {icon}
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
        </button>
    )
}

function StatCard({ label, value, icon, active = false }: { label: string, value: number, icon: any, active?: boolean }) {
    return (
        <div className={`backdrop-blur-xl border rounded-2xl p-4 flex items-center justify-between transition-all ${
            active ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100" : "bg-white/60 border-white/20"
        }`}>
            <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</span>
                <span className={`text-2xl font-semibold ${active ? "text-blue-600" : "text-zinc-900"}`}>{value}</span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? "bg-blue-50 text-blue-500" : "bg-zinc-100 text-zinc-400"}`}>
                {icon}
            </div>
        </div>
    )
}
