"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Trash2, Search, CheckCircle2, RotateCcw } from "lucide-react";

export default function NumberExtractor14Page() {
  // 状态管理
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // 用于复制反馈的定时器引用
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 核心提取逻辑
  const handleExtract = () => {
    if (!inputText.trim()) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    // 正则解释：
    // (?<!\d) : 左侧断言，前面不能是数字
    // \d{14}  : 匹配连续14位数字
    // (?!\d)  : 右侧断言，后面不能是数字
    const regex = /(?<!\d)\d{14}(?!\d)/g;
    
    const matches = inputText.match(regex) || [];
    
    // 自动去重
    const uniqueResults = Array.from(new Set(matches));
    
    setResults(uniqueResults);
    setHasSearched(true);
    setIsCopied(false); // 重置复制状态
  };

  // 清空逻辑
  const handleClear = () => {
    setInputText("");
    setResults([]);
    setHasSearched(false);
    setIsCopied(false);
  };

  // 一键复制逻辑
  const handleCopyAll = async () => {
    if (results.length === 0) return;

    try {
      const textToCopy = results.join("\n");
      await navigator.clipboard.writeText(textToCopy);
      
      setIsCopied(true);
      
      // 2秒后重置状态
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-10">
      {/* 1. Header Section */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 h-14 flex items-center px-4 justify-between shadow-sm">
        <Link 
          href="/tools" 
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900 active:bg-gray-100 rounded-full transition-colors"
          aria-label="返回工具列表"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
          14位数字提取
        </h1>
        {/* 占位，保持标题居中 */}
        <div className="w-8" />
      </header>

      <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
        
        {/* 2. Input Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <label htmlFor="input-area" className="block text-sm font-medium text-gray-700 mb-2">
            原始文本
          </label>
          <textarea
            id="input-area"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请粘贴包含14位数字的多行文本...&#10;例如：&#10;订单号：20231012123456 已发货&#10;ID: 20231012987654"
            // 🟢 修复点：移除了 transition-all，添加了 outline-none 和 transition duration-200
            className="w-full h-40 p-3 text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none placeholder:text-gray-400"
          />
        </div>

        {/* 3. Action Section */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleExtract}
            className="flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-md transition-all active:scale-95"
          >
            <Search size={18} />
            提取号码
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            <RotateCcw size={18} />
            清空
          </button>
        </div>

        {/* 4. Result Section */}
        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-sm font-semibold text-gray-600">
                提取结果 (共 {results.length} 个)
              </h2>
              {results.length > 0 && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  已去重
                </span>
              )}
            </div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-3">
                {/* 结果列表容器 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-h-[40vh] overflow-y-auto overscroll-contain">
                  <ul className="divide-y divide-gray-100">
                    {results.map((num, index) => (
                      <li key={`${num}-${index}`} className="flex items-center p-3 hover:bg-gray-50 transition-colors">
                        <span className="font-mono text-gray-800 tracking-wider text-base select-all">
                          {num}
                        </span>
                        <span className="ml-auto text-xs text-gray-400 font-mono">
                          #{index + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 核心功能：一键复制 */}
                <button
                  onClick={handleCopyAll}
                  disabled={isCopied}
                  className={`
                    w-full h-12 flex items-center justify-center gap-2 rounded-lg font-bold text-lg shadow-md transition-all duration-200
                    ${isCopied 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
                    }
                  `}
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 size={20} />
                      复制成功
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      一键复制所有结果
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* 空状态提示 */
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-center text-gray-400 gap-2">
                <Search size={48} className="text-gray-200" />
                <p>未找到符合条件的 14 位数字</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
