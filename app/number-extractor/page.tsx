"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Search, Fingerprint, ArrowUpCircle } from "lucide-react";

export default function NumberExtractor() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // 提取逻辑：匹配前后非数字的14位连续数字，并去重
  const extractNumbers = (inputText: string) => {
    const regex = /(?<!\d)\d{14}(?!\d)/g;
    const matches = inputText.match(regex);
    
    if (matches) {
      const uniqueMatches = Array.from(new Set(matches));
      setResults(uniqueMatches);
    } else {
      setResults([]);
    }
    setAllCopied(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    extractNumbers(newText);
  };

  const copyToClipboard = (number: string, index: number) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
    setResults([]);
    setAllCopied(false);
  };

  return (
    // 布局改为 flex-col + pt (顶部填充)，避免手机键盘弹出时内容被遮挡或挤压
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-blue-500/20 flex flex-col items-center pt-8 sm:pt-20 px-4 pb-10">
      
      <main className="w-full max-w-2xl flex flex-col gap-5 sm:gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-zinc-200 flex items-center justify-center text-blue-600 mb-2">
            <Fingerprint size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Number Extractor
          </h1>
          <p className="text-zinc-500 text-sm sm:text-lg font-medium max-w-xs sm:max-w-none mx-auto leading-relaxed">
            自动提取并去重文本中的 14 位编码
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
          
          {/* Input Area */}
          <div className="relative">
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="请粘贴包含单号的文本..."
              // 手机端 text-base 防止 iOS 自动放大，h-40 节省高度
              className="w-full h-40 sm:h-48 p-5 sm:p-6 bg-transparent resize-none outline-none text-base sm:text-lg text-zinc-700 placeholder:text-zinc-400 transition-colors focus:bg-zinc-50/50"
              spellCheck={false}
            />
            
            {/* Clear Button - 手机端始终显示，不依赖 hover */}
            {text && (
              <button
                onClick={clearAll}
                className="absolute top-3 right-3 p-2 bg-zinc-100 active:bg-zinc-200 rounded-xl text-zinc-400 hover:text-red-500 transition-all active:scale-95 z-10 shadow-sm"
                title="清空内容"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-zinc-100" />

          {/* Results Area */}
          <div className="bg-zinc-50/80 min-h-[200px] p-5 sm:p-6 flex flex-col">
            
            {/* Results Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                提取结果 
                <span className={`px-2 py-0.5 rounded-md text-[10px] transition-all duration-300 ${results.length > 0 ? 'bg-blue-100 text-blue-600 opacity-100' : 'bg-zinc-200 opacity-0'}`}>
                  {results.length}
                </span>
              </h2>
              
              {/* Copy All Button */}
              <button
                onClick={copyAll}
                disabled={results.length === 0 || allCopied}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-lg active:scale-95 ${
                  results.length === 0
                    ? "opacity-0 pointer-events-none"
                    : allCopied 
                      ? "bg-green-500 text-white shadow-md shadow-green-500/20" 
                      : "bg-white border border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-600 shadow-sm"
                }`}
              >
                {allCopied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
                <span>{allCopied ? "已复制" : "复制全部"}</span>
              </button>
            </div>

            {/* List */}
            {results.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-300 gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                    <Search size={20} className="opacity-50" />
                </div>
                <p className="text-xs sm:text-sm font-medium">等待输入...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                {results.map((num, idx) => (
                  <div
                    key={`${num}-${idx}`}
                    onClick={() => copyToClipboard(num, idx)} // 点击整个卡片也能复制
                    className={`group flex items-center justify-between p-3 sm:p-3.5 bg-white border shadow-sm rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                        copiedIndex === idx 
                        ? "border-green-500 ring-1 ring-green-500/20 bg-green-50/30" 
                        : "border-zinc-100 hover:border-blue-200"
                    }`}
                  >
                    <span className="font-mono text-base sm:text-lg text-zinc-700 tracking-wider font-medium">
                      {num}
                    </span>
                    
                    <button
                      className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                        copiedIndex === idx
                          ? "text-green-600 scale-110"
                          : "text-zinc-300 group-hover:text-blue-500"
                      }`}
                    >
                      {copiedIndex === idx ? <Check size={18} strokeWidth={3} /> : <Copy size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center pb-6">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest opacity-60">
                Simple Tools
            </p>
        </div>

      </main>
      
      <style jsx global>{`
        /* 隐藏移动端滚动条但保留功能，提升美观度 */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e4e4e7;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
