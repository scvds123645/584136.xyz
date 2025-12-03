
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, RefreshCw, Trash2, Settings2, CheckCircle2 } from "lucide-react";

type FormatMode = "full" | "short";

export default function FormatConverterPage() {
  // --- State Management ---
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("qwwwww");
  const [mode, setMode] = useState<FormatMode>("full");
  const [stats, setStats] = useState({ total: 0, success: 0 });
  const [isCopied, setIsCopied] = useState(false);
  
  // 用于复制反馈的定时器引用
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Logic ---

  const handleConvert = () => {
    if (!input.trim()) return;

    const lines = input.split(/\r?\n/);
    let successCount = 0;

    const results = lines.map((line) => {
      // 1. 基础清理
      const text = line.trim();
      if (!text) return null;

      // 2. 正则提取
      // c_user: 匹配 c_user= 后面直到分号或行尾的内容
      const uidMatch = text.match(/c_user=([^;]+)/);
      // xs: 匹配 xs= 后面直到分号或行尾的内容
      const xsMatch = text.match(/xs=([^;]+)/);

      if (uidMatch && xsMatch) {
        const uid = uidMatch[1].trim();
        const xs = xsMatch[1].trim();

        successCount++;

        // 3. 格式化输出
        if (mode === "full") {
          // Mode A: uid--password--c_user=uid; xs=xs;
          return `${uid}--${password}--c_user=${uid}; xs=${xs};`;
        } else {
          // Mode B: uid--password
          return `${uid}--${password}`;
        }
      }
      return null;
    });

    // 过滤掉无效行 (null) 并组合
    const validResults = results.filter((r) => r !== null);
    
    setOutput(validResults.join("\n"));
    setStats({ total: lines.length, success: successCount });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats({ total: 0, success: 0 });
    setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
      alert("复制失败，请手动复制");
    }
  };

  // --- UI Render ---
  return (
    <div className="min-h-screen bg-gray-50 pb-safe-area-inset-bottom">
      
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 px-4 py-3 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link 
            href="/tools" 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">账号格式化</h1>
        </div>
        {/* 顶部简单的统计展示 (如果有数据) */}
        {stats.success > 0 && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            成功: {stats.success}
          </span>
        )}
      </header>

      <main className="p-4 space-y-4 max-w-md mx-auto">
        
        {/* 2. Settings Panel (Compact) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50/50 border-b border-gray-100">
            <Settings2 className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">转换配置</span>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Password Input */}
            <div className="flex items-center gap-3">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 min-w-[4rem]">
                默认密码
              </label>
              <input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="输入密码..."
              />
            </div>

            {/* Mode Selection (Segmented Control) */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700 block">输出模式</span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setMode("full")}
                  className={`text-xs font-medium py-2 rounded-md transition-all shadow-sm ${
                    mode === "full" 
                      ? "bg-white text-blue-600 shadow" 
                      : "text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
                  }`}
                >
                  完整格式 (带Cookie)
                </button>
                <button
                  onClick={() => setMode("short")}
                  className={`text-xs font-medium py-2 rounded-md transition-all shadow-sm ${
                    mode === "short" 
                      ? "bg-white text-blue-600 shadow" 
                      : "text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
                  }`}
                >
                  精简格式 (账号密码)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Input / Output Area */}
        <div className="flex flex-col gap-3">
          
          {/* Input Textarea */}
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请粘贴原始 Cookie (支持多行)...&#10;格式示例: c_user=10001; xs=321..."
              className="w-full h-36 p-3 text-xs md:text-sm font-mono leading-relaxed bg-white border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
              spellCheck={false}
            />
            {/* Input Clear Button (floating) */}
            {input && (
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-500 transition-colors"
                title="清空输入"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <RefreshCw className="h-4 w-4" />
              开始转换
            </button>
          </div>

          {/* Output Textarea */}
          <div className="relative">
             <div className="flex items-center justify-between mb-1 ml-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  结果预览 {output && `(${output.split('\n').length} 行)`}
                </span>
                
                {/* Copy Button (Top aligned) */}
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isCopied
                      ? "bg-green-100 text-green-700"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isCopied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {isCopied ? "已复制" : "复制结果"}
                </button>
             </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="转换后的结果将显示在这里..."
              className="w-full h-48 p-3 text-xs md:text-sm font-mono leading-relaxed bg-gray-100 border border-gray-200 text-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              spellCheck={false}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()} // 点击全选方便操作
            />
          </div>
        </div>

        {/* Hints */}
        <div className="px-2 pb-6">
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            * 仅提取包含 c_user 和 xs 字段的行。<br/>
            * 模式 A 适用于导入软件，模式 B 仅用于记录账号。
          </p>
        </div>

      </main>
    </div>
  );
}