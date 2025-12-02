"use client";

import { useState, useEffect } from "react";
import { 
  Copy, Check, Trash2, Settings2, 
  KeyRound, FileJson, RefreshCw, User, Lock 
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
  const [passwordMode, setPasswordMode] = useState<PasswordMode>("default");
  const [customPassword, setCustomPassword] = useState("");
  const [format, setFormat] = useState<OutputFormat>("full");

  // UI States
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // --- Logic ---
  
  // 核心处理函数
  useEffect(() => {
    const lines = input.split(/\r?\n/);
    const password = passwordMode === "default" ? "qwwwww" : (customPassword || "PASSWORD");

    const results: ProcessedItem[] = lines.map((line, idx) => {
      if (!line.trim()) return null;

      // 1. 提取 UID (c_user)
      const uidMatch = line.match(/(?:^|;\s*)c_user=([^;]*)/);
      const uid = uidMatch ? uidMatch[1] : null;

      if (!uid) return { id: idx, isValid: false } as ProcessedItem;

      // 2. 格式拼接
      let formattedString = "";
      if (format === "full") {
        // 格式1: UID--密码--完整Cookie
        formattedString = `${uid}--${password}--${line.trim()}`;
      } else {
        // 格式2: UID---密码 (注意：用户需求中这里是3个横杠)
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
    }).filter((item): item is ProcessedItem => item !== null && item.isValid); // 过滤掉无效行

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
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-5xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 flex items-center gap-3">
            <RefreshCw className="text-zinc-400" />
            Cookie Format Converter
          </h1>
          <p className="text-zinc-500">
            自动提取 c_user 并拼接密码，支持批量格式转换
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT: Input & Settings */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4">
            
            {/* Settings Panel */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                <Settings2 size={14} /> 配置选项
              </div>

              {/* 1. Password Config */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <KeyRound size={16} /> 密码设置
                </label>
                <div className="bg-zinc-100 p-1 rounded-lg flex relative">
                  <button
                    onClick={() => setPasswordMode("default")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      passwordMode === "default" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    默认 (qwwwww)
                  </button>
                  <button
                    onClick={() => setPasswordMode("custom")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      passwordMode === "custom" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    自定义
                  </button>
                </div>
                
                {/* Custom Password Input - Collapsible */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${passwordMode === "custom" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                  <input 
                    type="text" 
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    placeholder="输入自定义密码..."
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    format === "full" ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-500/20" : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}>
                    <input type="radio" name="fmt" checked={format === "full"} onChange={() => setFormat("full")} className="hidden" />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${format === "full" ? "border-blue-500" : "border-zinc-300"}`}>
                      {format === "full" && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">完整拼接</span>
                      <span className="text-xs text-zinc-400">UID--密码--Cookie</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    format === "short" ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-500/20" : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}>
                    <input type="radio" name="fmt" checked={format === "short"} onChange={() => setFormat("short")} className="hidden" />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${format === "short" ? "border-blue-500" : "border-zinc-300"}`}>
                      {format === "short" && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">仅账号密码</span>
                      <span className="text-xs text-zinc-400">UID---密码</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Input Textarea */}
            <div className="flex-1 bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-2xl p-1 flex flex-col min-h-[200px] relative group">
               <textarea 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="粘贴多行 Cookie..."
                 className="w-full h-full p-4 bg-transparent resize-none outline-none text-xs font-mono text-zinc-600 placeholder:text-zinc-400 rounded-xl"
                 spellCheck={false}
               />
               {input && (
                 <button 
                   onClick={() => setInput("")} 
                   className="absolute top-3 right-3 p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md text-zinc-400 hover:text-zinc-600 opacity-0 group-hover:opacity-100 transition-all"
                 >
                   <Trash2 size={14} />
                 </button>
               )}
            </div>

          </div>

          {/* RIGHT: Output Results */}
          <div className="w-full lg:w-7/12 bg-zinc-50/50 border border-zinc-200/50 rounded-2xl overflow-hidden flex flex-col h-[600px]">
            
            {/* Output Header */}
            <div className="px-6 py-4 bg-white border-b border-zinc-200 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700">转换结果</span>
                  <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full text-xs font-medium">
                    {processedData.length}
                  </span>
                </div>
              </div>
              
              {processedData.length > 0 && (
                <button
                  onClick={copyAll}
                  disabled={allCopied}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-300 px-4 py-2 rounded-full shadow-sm ${
                    allCopied 
                      ? "bg-green-500 text-white hover:bg-green-600" 
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {allCopied ? <Check size={14} /> : <Copy size={14} />}
                  {allCopied ? "已复制全部" : "一键复制所有结果"}
                </button>
              )}
            </div>

            {/* Output List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {processedData.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-300 gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    <RefreshCw size={24} className="opacity-20" />
                  </div>
                  <p className="text-sm">等待输入数据...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {processedData.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group"
                    >
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-2 pb-2 border-b border-zinc-50">
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                           <User size={10} /> {item.uid}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium bg-zinc-50 px-2 py-0.5 rounded">
                           <Lock size={10} /> {item.password}
                        </div>
                      </div>

                      {/* Result String */}
                      <div className="flex items-center gap-3">
                        <code className="flex-1 text-xs text-zinc-600 font-mono bg-zinc-50/50 p-2 rounded-lg border border-zinc-100 break-all line-clamp-2 selection:bg-blue-100">
                          {item.result}
                        </code>
                        <button
                          onClick={() => copyItem(item.result, item.id)}
                          className={`p-2 rounded-lg transition-all shrink-0 ${
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

        <div className="text-center">
            <p className="text-sm text-zinc-400">Efficiency Tools Collection</p>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
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
      `}</style>
    </div>
  );
}
