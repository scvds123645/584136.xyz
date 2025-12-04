"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, RefreshCw, Trash2, Settings2, CheckCircle2 } from "lucide-react";

type ProcessMode = "extract" | "convert";
type FormatMode = "full" | "short";

export default function CookieProcessorPage() {
  // 状态管理
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("qwwwww");
  const [processMode, setProcessMode] = useState<ProcessMode>("extract");
  const [formatMode, setFormatMode] = useState<FormatMode>("full");
  const [stats, setStats] = useState({ total: 0, success: 0 });
  const [isCopied, setIsCopied] = useState(false);
  
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 核心处理逻辑
  const handleProcess = () => {
    if (!input.trim()) return;

    const lines = input.split(/\r?\n/);
    let successCount = 0;

    const results = lines.map((line) => {
      const text = line.trim();
      if (!text) return null;

      // 提取 c_user 和 xs
      const uidMatch = text.match(/c_user=([^;\s]+)/);
      const xsMatch = text.match(/xs=([^;\s]+)/);

      if (uidMatch && xsMatch) {
        const uid = uidMatch[1];
        const xs = xsMatch[1];
        successCount++;

        // 根据处理模式返回不同格式
        if (processMode === "extract") {
          // 提取模式：仅格式化 Cookie
          return `c_user=${uid}; xs=${xs};`;
        } else {
          // 转换模式：根据输出格式生成账号格式
          if (formatMode === "full") {
            return `${uid}--${password}--c_user=${uid}; xs=${xs};`;
          } else {
            return `${uid}--${password}`;
          }
        }
      }
      return null;
    });

    const validResults = results.filter((r) => r !== null);
    
    setOutput(validResults.join("\n"));
    setStats({ total: lines.length, success: successCount });
    setIsCopied(false);
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
      console.error("复制失败", err);
      alert("复制失败，请手动复制");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans text-gray-900">
      
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-4 h-14 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link 
            href="/tools" 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold">Cookie 处理工具</h1>
        </div>
        {stats.success > 0 && (
          <div className="animate-in fade-in zoom-in duration-300">
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
              成功 {stats.success} 个
            </span>
          </div>
        )}
      </header>

      <main className="p-4 space-y-5 max-w-md mx-auto">
        
        {/* 设置面板 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <Settings2 className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">处理配置</span>
          </div>
          
          <div className="p-4 space-y-4">
            {/* 处理模式选择 */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700 block">处理模式</span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
                <button
                  onClick={() => setProcessMode("extract")}
                  className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                    processMode === "extract" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  格式化提取
                </button>
                <button
                  onClick={() => setProcessMode("convert")}
                  className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                    processMode === "convert" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  账号转换
                </button>
              </div>
            </div>

            {/* 转换模式专属配置 */}
            {processMode === "convert" && (
              <>
                {/* 密码输入 */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 w-16">
                    默认密码
                  </label>
                  <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="设置统一密码..."
                  />
                </div>

                {/* 输出格式选择 */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 block">输出格式</span>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
                    <button
                      onClick={() => setFormatMode("full")}
                      className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                        formatMode === "full" 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      完整格式
                    </button>
                    <button
                      onClick={() => setFormatMode("short")}
                      className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                        formatMode === "short" 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      精简格式
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            原始数据
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              processMode === "extract"
                ? "请粘贴杂乱的 Cookie 数据...\n每行一条，需包含 c_user 和 xs"
                : "请粘贴包含 Cookie 的文本...\n自动提取 c_user 和 xs 字段"
            }
            className="w-full h-32 p-3 text-xs md:text-sm font-mono leading-relaxed bg-white border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder:text-gray-400 shadow-sm"
            spellCheck={false}
          />
          {input && (
            <button
              onClick={handleClear}
              className="absolute top-9 right-2 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
              title="清空输入"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* 操作按钮 */}
        <button
          onClick={handleProcess}
          disabled={!input}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-200"
        >
          <RefreshCw className="h-5 w-5" />
          {processMode === "extract" ? "开始提取格式化" : "开始账号转换"}
        </button>

        {/* 结果输出区域 */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-sm font-medium text-gray-700">
              处理结果
            </span>
            
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isCopied
                  ? "bg-green-500 text-white shadow-md shadow-green-200"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-sm"
              } disabled:opacity-50 disabled:shadow-none`}
            >
              {isCopied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {isCopied ? "已复制" : "复制结果"}
            </button>
          </div>
          
          <textarea
            value={output}
            readOnly
            placeholder="等待处理..."
            className={`w-full h-48 p-3 text-xs md:text-sm font-mono leading-relaxed rounded-xl outline-none resize-none border transition-colors duration-200 ${
              output 
                ? "bg-blue-50/50 border-blue-200 text-gray-800 focus:ring-2 focus:ring-blue-500/30" 
                : "bg-gray-100 border-transparent text-gray-400"
            }`}
            spellCheck={false}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>

        {/* 底部提示 */}
        <div className="text-center pb-4 space-y-1">
          {processMode === "extract" ? (
            <p className="text-[10px] text-gray-400">
              提取格式: <code className="bg-gray-100 px-1 rounded">c_user=...; xs=...;</code>
            </p>
          ) : (
            <>
              <p className="text-[10px] text-gray-400">
                完整格式: <code className="bg-gray-100 px-1 rounded">uid--pw--c_user=...; xs=...;</code>
              </p>
              <p className="text-[10px] text-gray-400">
                精简格式: <code className="bg-gray-100 px-1 rounded">uid--pw</code>
              </p>
            </>
          )}
        </div>

      </main>
    </div>
  );
}