"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Copy, Check, Trash2, Settings2, 
  KeyRound, FileJson, RefreshCw, User, Lock, ChevronLeft, ChevronDown, ChevronUp
} from "lucide-react";

// 定义输出格式类型
type OutputFormat = "full" | "short";
type PasswordMode = "default" | "custom";

interface ProcessedItem {
  id: number;
  uid: string;
  password: string;
  originalCookie: string;
  result: string;
  isValid: boolean;
}

export default function CookieConverter() {
  // --- State Management ---
  const [input, setInput] = useState("");
  const [processedData, setProcessedData] = useState<ProcessedItem[]>([]);
  
  // Configuration
  const [showSettings, setShowSettings] = useState(true); // 控制配置面板折叠
  const [passwordMode, setPasswordMode] = useState<PasswordMode>("default");
  const [customPassword, setCustomPassword] = useState("");
  const [format, setFormat] = useState<OutputFormat>("full");

  // UI States
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // --- Logic ---
  useEffect(() => {
    const lines = input.split(/\r?\n/);
    const password = passwordMode === "default" ? "qwwwww" : (customPassword || "PASSWORD");

    const results: ProcessedItem[] = lines.map((line, idx) => {
      if (!line.trim()) return null;

      const uidMatch = line.match(/(?:^|;\s*)c_user=([^;]*)/);
      const uid = uidMatch ? uidMatch[1] : null;

      if (!uid) return { id: idx, isValid: false } as ProcessedItem;

      let formattedString = "";
      if (format === "full") {
        formattedString = `${uid}--${password}--${line.trim()}`;
      } else {
        formattedString = `${uid}---${password}`;
      }

      return {
        id: idx,
        uid,
        password,
        originalCookie: line,
        result: formattedString,
        isValid: true
      };
    }).filter((item): item is ProcessedItem => item !== null && item.isValid);

    setProcessedData(results);
    setAllCopied(false);
  }, [input, passwordMode, customPassword, format]);

  // --- Actions ---
  const copyAll = () => {
    if (processedData.length === 0) return;
    const allText = processedData.map(d => d.result).join("\n");
    navigator.clipboard.writeText(allText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const copyItem = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    // 1. 100dvh 修复移动端高度
    // 2. select-none 优化点击体验
    <div className="min-h-[100dvh] bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex items-center justify-center p-3 sm:p-6 pb-[env(safe-area-inset-bottom)]">
      <main className="w-full max-w-5xl flex flex-col gap-4 sm:gap-6 relative">
        
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 pt-2">
          <Link 
            href="/tools" 
            className="w-10 h-10 bg-white rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all active:scale-95 shadow-sm shrink-0"
            title="返回工具列表"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-3xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
              <RefreshCw className="text-zinc-400 w-5 h-5 sm:w-8 sm:h-8" />
              Cookie Converter
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 line-clamp-1">
              自动提取 c_user 并拼接密码
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          
          {/* LEFT: Input & Settings */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            
            {/* Settings Panel (Collapsible on mobile) */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-2xl overflow-hidden transition-all duration-300">
              {/* Toggle Header */}
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="w-full px-5 py-4 flex items-center justify-between bg-white/50 hover:bg-white/80 transition-colors active:bg-zinc-50"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  <Settings2 size={16} /> 配置选项
                </div>
                {/* Mobile toggle indicator */}
                <div className="text-zinc-400">
                  {showSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Collapsible Content */}
              <div className={`transition-all duration-300 ease-in-out ${showSettings ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-5 pt-0 flex flex-col gap-5 border-t border-zinc-100/50">
                  
                  {/* 1. Password Config */}
                  <div className="flex flex-col gap-3 pt-4">
                    <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                      <KeyRound size={16} /> 密码设置
                    </label>
                    <div className="bg-zinc-100 p-1 rounded-lg flex relative">
                      <button
                        onClick={() => setPasswordMode("default")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-[0.98] touch-manipulation ${
                          passwordMode === "default" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                        }`}
                      >
                        默认 (qwwwww)
                      </button>
                      <button
                        onClick={() => setPasswordMode("custom")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-[0.98] touch-manipulation ${
                          passwordMode === "custom" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                        }`}
                      >
                        自定义
                      </button>
                    </div>
                    
                    {/* Custom Password Input */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${passwordMode === "custom" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                      <input 
                        type="text" 
                        value={customPassword}
                        onChange={(e) => setCustomPassword(e.target.value)}
                        placeholder="输入自定义密码..."
                        className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="h-px bg-zinc-100 w-full" />

                  {/* 2. Format Config */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                      <FileJson size={16} /> 输出格式
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all active:scale-[0.99] touch-manipulation ${
                        format === "full" ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-500/20" : "bg-white border-zinc-200"
                      }`}>
                        <input type="radio" name="fmt" checked={format === "full"} onChange={() => setFormat("full")} className="hidden" />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${format === "full" ? "border-blue-500" : "border-zinc-300"}`}>
                          {format === "full" && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-zinc-900">完整拼接</span>
                          <span className="text-xs text-zinc-400 truncate">UID--密码--Cookie</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all active:scale-[0.99] touch-manipulation ${
                        format === "short" ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-500/20" : "bg-white border-zinc-200"
                      }`}>
                        <input type="radio" name="fmt" checked={format === "short"} onChange={() => setFormat("short")} className="hidden" />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${format === "short" ? "border-blue-500" : "border-zinc-300"}`}>
                          {format === "short" && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-zinc-900">仅账号密码</span>
                          <span className="text-xs text-zinc-400 truncate">UID---密码</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Textarea */}
            <div className="flex-1 bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-2xl p-1 flex flex-col min-h-[180px] sm:min-h-[200px] relative group">
               <textarea 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="粘贴多行 Cookie..."
                 className="w-full h-full p-4 bg-transparent resize-none outline-none text-sm sm:text-xs font-mono text-zinc-600 placeholder:text-zinc-400 rounded-xl"
                 spellCheck={false}
               />
               {input && (
                 <button 
                   onClick={() => setInput("")} 
                   className="absolute top-3 right-3 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90 touch-manipulation"
                 >
                   <Trash2 size={14} />
                 </button>
               )}
            </div>
          </div>

          {/* RIGHT: Output Results */}
          {/* 响应式高度：手机端 400px，桌面端 600px */}
          <div className="w-full lg:w-7/12 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl overflow-hidden flex flex-col h-[400px] lg:h-[600px]">
            
            {/* Output Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-zinc-200 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700 text-sm sm:text-base">转换结果</span>
                  <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full text-xs font-medium">
                    {processedData.length}
                  </span>
                </div>
              </div>
              
              {processedData.length > 0 && (
                <button
                  onClick={copyAll}
                  disabled={allCopied}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm active:scale-95 touch-manipulation ${
                    allCopied 
                      ? "bg-green-500 text-white" 
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {allCopied ? <Check size={14} /> : <Copy size={14} />}
                  {allCopied ? "已复制" : "一键复制"}
                </button>
              )}
            </div>

            {/* Output List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar">
              {processedData.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-300 gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    <RefreshCw size={24} className="opacity-20" />
                  </div>
                  <p className="text-sm">等待输入数据...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {processedData.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm transition-all active:scale-[0.99]"
                    >
                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-zinc-50 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                           <User size={10} /> {item.uid}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 font-medium bg-zinc-50 px-2 py-0.5 rounded whitespace-nowrap">
                           <Lock size={10} /> {item.password}
                        </div>
                      </div>

                      {/* Result String */}
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-[10px] sm:text-xs text-zinc-600 font-mono bg-zinc-50/50 p-2 rounded-lg border border-zinc-100 break-all line-clamp-2 selection:bg-blue-100">
                          {item.result}
                        </code>
                        <button
                          onClick={() => copyItem(item.result, item.id)}
                          className={`p-2 rounded-lg transition-all shrink-0 active:scale-90 touch-manipulation ${
                            copiedId === item.id
                              ? "bg-green-500 text-white"
                              : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
                          }`}
                        >
                          {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.05); border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
