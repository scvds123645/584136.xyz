"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Cookie, ListChecks, Layers } from "lucide-react";

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
    // 1. 按行分割
    const lines = inputText.split(/\r?\n/);
    
    const extracted: CookieResult[] = [];

    lines.forEach((line, index) => {
      if (!line.trim()) return; // 跳过空行

      // 2. 正则提取
      const getValue = (key: string) => {
        const match = line.match(new RegExp(`(?:^|;\\s*)${key}=([^;]*)`));
        return match ? match[1] : null;
      };

      const c_user = getValue("c_user");
      const xs = getValue("xs");

      // 3. 只有当至少发现一个字段时才加入结果
      if (c_user || xs) {
        // 生成标准组合格式
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
    // 将所有结果用换行符连接
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
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 flex items-center justify-center sm:justify-start gap-3">
            <Cookie className="text-zinc-400" size={32} />
            Batch Cookie Filter
          </h1>
          <p className="text-zinc-500 text-lg font-medium">
            批量提取多行 Cookie 中的 c_user 和 xs
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl shadow-zinc-200/50 rounded-3xl overflow-hidden flex flex-col sm:flex-row h-[600px] transition-all duration-500">
          
          {/* Left Side: Input Area (Fixed Height or Flex) */}
          <div className="w-full sm:w-1/2 p-1 flex flex-col border-b sm:border-b-0 sm:border-r border-zinc-100 bg-white/40 relative group">
            <div className="px-6 py-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Input Data</span>
                {text && (
                    <button onClick={clearAll} className="p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors" title="Clear">
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="在此粘贴多行数据...&#10;例如：&#10;xxxxx c_user=123; xs=abc; xxxxx&#10;yyyyy c_user=456; xs=def; yyyyy"
              className="flex-1 w-full p-6 pt-0 bg-transparent resize-none outline-none text-sm font-mono text-zinc-600 placeholder:text-zinc-300 leading-relaxed custom-scrollbar"
              spellCheck={false}
            />
          </div>

          {/* Right Side: Results List */}
          <div className="w-full sm:w-1/2 flex flex-col bg-zinc-50/50">
            
            {/* Result Header & Actions */}
            <div className="h-14 px-6 border-b border-zinc-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <ListChecks size={16} className="text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-600">
                  Results {results.length > 0 && <span className="bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full text-xs ml-1">{results.length}</span>}
                </span>
              </div>
              
              {results.length > 0 && (
                <button
                  onClick={copyAll}
                  disabled={allCopied}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${
                    allCopied 
                      ? "text-green-600 bg-green-100 cursor-default" 
                      : "text-white bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-blue-200"
                  }`}
                >
                  {allCopied ? <Check size={14} /> : <Layers size={14} />}
                  {allCopied ? "已复制所有" : "复制全部格式化"}
                </button>
              )}
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {results.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-zinc-300 gap-2">
                    <Cookie size={48} className="opacity-10" />
                    <p className="text-sm">等待输入...</p>
                 </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {results.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-white p-3 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-2"
                    >
                      {/* Top Row: Badge & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {item.c_user ? (
                                <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md text-xs font-mono font-medium border border-zinc-200">
                                    ID: {item.c_user}
                                </span>
                            ) : (
                                <span className="text-xs text-zinc-400 italic">No ID</span>
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
                        <code className="text-xs text-zinc-500 font-mono break-all line-clamp-2 bg-zinc-50 p-1.5 rounded-lg w-full border border-transparent group-hover:border-zinc-100 transition-colors">
                            {item.formatted}
                        </code>
                        
                        <button
                          onClick={() => copyItem(item.formatted, item.id)}
                          className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                            copiedId === item.id
                              ? "bg-green-500 text-white shadow-md scale-105"
                              : "bg-zinc-100 text-zinc-400 hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          {copiedId === item.id ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
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
            <p className="text-sm text-zinc-400">Designed for Efficiency</p>
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
