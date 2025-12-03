// app/cookie-filter/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Trash2, Copy, Play, CheckCircle2 } from "lucide-react";

export default function CookieFilterPage() {
  // 状态管理
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState({ total: 0, valid: 0 });
  const [copied, setCopied] = useState(false);

  // 核心提取逻辑
  const handleExtract = () => {
    if (!input.trim()) return;

    const lines = input.split("\n");
    let validCount = 0;
    const nonEmptyTotal = lines.filter((l) => l.trim().length > 0).length;

    const processedLines = lines
      .map((line) => {
        // 跳过空行
        if (!line.trim()) return null;

        // 正则匹配 c_user 和 xs
        // 逻辑：匹配 key=value，直到遇到分号或字符串结束
        const cUserMatch = line.match(/c_user=([^;\s]+)/);
        const xsMatch = line.match(/xs=([^;\s]+)/);

        const cUser = cUserMatch ? cUserMatch[1] : null;
        const xs = xsMatch ? xsMatch[1] : null;

        // 必须两个字段都存在才视为有效数据
        if (cUser && xs) {
          validCount++;
          // 强制格式: c_user=VALUE; xs=VALUE; (注意末尾分号)
          return `c_user=${cUser}; xs=${xs};`;
        }
        return null;
      })
      .filter((item): item is string => item !== null); // 过滤掉无效行

    setOutput(processedLines.join("\n"));
    setStats({ total: nonEmptyTotal, valid: validCount });
    setCopied(false); // 重置复制状态
  };

  // 清空功能
  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats({ total: 0, valid: 0 });
    setCopied(false);
  };

  // 复制功能
  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-8 font-sans">
      {/* 1. Header: Mobile Optimized */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 safe-top">
        <div className="flex items-center h-14 px-4 max-w-md mx-auto">
          <Link
            href="/tools"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform"
            aria-label="返回工具列表"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="ml-2 text-lg font-semibold text-gray-900">
            Cookie 格式化工具
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* 2. Input Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 ml-1">
            原始数据输入
          </label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请粘贴杂乱的 Cookie 数据...&#10;每行一条，需包含 c_user 和 xs"
              className="w-full h-40 p-3 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none shadow-sm placeholder:text-gray-400"
              spellCheck={false}
            />
            {input && (
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/90 px-2 py-1 rounded-md">
                {input.split("\n").length} 行
              </div>
            )}
          </div>
        </div>

        {/* 3. Control Bar */}
        <div className="grid grid-cols-4 gap-3">
          {/* 清空按钮 (1/4) */}
          <button
            onClick={handleClear}
            disabled={!input && !output}
            className="col-span-1 flex flex-col items-center justify-center h-14 rounded-xl bg-white border border-gray-200 text-gray-600 shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            <Trash2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">清空</span>
          </button>

          {/* 提取按钮 (2/4 - 主要操作) */}
          <button
            onClick={handleExtract}
            disabled={!input}
            className="col-span-2 flex flex-row items-center justify-center gap-2 h-14 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            <Play className="w-5 h-5 fill-current" />
            <span className="text-sm font-bold">开始提取</span>
          </button>

          {/* 复制按钮 (1/4) */}
          <button
            onClick={handleCopy}
            disabled={!output}
            className={`col-span-1 flex flex-col items-center justify-center h-14 rounded-xl border shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 ${
              copied
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-white border-gray-200 text-gray-600"
            }`}
          >
            {copied ? (
              <CheckCircle2 className="w-5 h-5 mb-0.5" />
            ) : (
              <Copy className="w-5 h-5 mb-0.5" />
            )}
            <span className="text-[10px] font-medium">
              {copied ? "已复制" : "复制"}
            </span>
          </button>
        </div>

        {/* 4. Statistics & Result Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-sm font-medium text-gray-700">
              提取结果
            </label>
            {stats.total > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                原数据 {stats.total} 行 &rarr; 有效 {stats.valid} 行
              </span>
            )}
          </div>

          <div className="relative group">
            <textarea
              readOnly
              value={output}
              placeholder="等待提取..."
              className={`w-full h-48 p-3 text-sm rounded-xl border resize-none transition-colors ${
                output
                  ? "bg-indigo-50/50 border-indigo-200 text-indigo-900"
                  : "bg-gray-100 border-transparent text-gray-500"
              }`}
              onClick={(e) => e.currentTarget.select()}
            />
            {!output && stats.total > 0 && stats.valid === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-400">未找到有效 Cookie 数据</span>
              </div>
            )}
          </div>
          
          <div className="px-1">
             <p className="text-xs text-gray-400 leading-relaxed">
               * 仅输出包含 <code className="bg-gray-100 px-1 rounded">c_user</code> 和 <code className="bg-gray-100 px-1 rounded">xs</code> 的行。
               <br />
               * 自动移除多余字符，统一格式为 <code className="bg-gray-100 px-1 rounded">c_user=...; xs=...;</code>
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}