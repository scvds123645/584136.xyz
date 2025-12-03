"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, RefreshCw, Trash2, Settings2, CheckCircle2 } from "lucide-react";

type FormatMode = "full" | "short";

export default function FormatConverterPage() {
  // --- 状态管理 ---
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("qwwwww"); // 默认密码
  const [mode, setMode] = useState<FormatMode>("full");
  const [stats, setStats] = useState({ total: 0, success: 0 });
  const [isCopied, setIsCopied] = useState(false);
  
  // 定时器引用
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- 核心逻辑 ---

  const handleConvert = () => {
    if (!input.trim()) return;

    const lines = input.split(/\r?\n/);
    let successCount = 0;

    const results = lines.map((line) => {
      // 1. 基础清理
      const text = line.trim();
      if (!text) return null;

      // 2. 正则提取
      // 逻辑：匹配 c_user= 后面的非空字符，直到遇到分号或空格
      const uidMatch = text.match(/c_user=([^;\s]+)/);
      const xsMatch = text.match(/xs=([^;\s]+)/);

      if (uidMatch && xsMatch) {
        const uid = uidMatch[1];
        const xs = xsMatch[1];

        successCount++;

        // 3. 根据模式格式化输出
        if (mode === "full") {
          // 模式 A: uid--password--c_user=uid; xs=xs;
          return `${uid}--${password}--c_user=${uid}; xs=${xs};`;
        } else {
          // 模式 B: uid--password
          return `${uid}--${password}`;
        }
      }
      return null;
    });

    // 过滤无效行并组合
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

  // --- UI 渲染 ---
  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans text-gray-900">
      
      {/* 1. 顶部导航栏 */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-4 h-14 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link 
            href="/tools" 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold">账号格式化</h1>
        </div>
        {/* 简单的成功计数徽标 */}
        {stats.success > 0 && (
          <div className="animate-in fade-in zoom-in duration-300">
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
              成功 {stats.success} 个
            </span>
          </div>
        )}
      </header>

      <main className="p-4 space-y-5 max-w-md mx-auto">
        
        {/* 2. 设置面板 (Settings Card) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
            <Settings2 className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">转换配置</span>
          </div>
          
          <div className="p-4 space-y-4">
            {/* 密码输入 */}
            <div className="flex items-center gap-3">
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

            {/* 模式选择 (分段控制器) */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700 block">输出模式</span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
                <button
                  onClick={() => setMode("full")}
                  className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                    mode === "full" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  完整格式 (带Cookie)
                </button>
                <button
                  onClick={() => setMode("short")}
                  className={`text-xs font-medium py-2 rounded-md transition-all duration-200 ${
                    mode === "short" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  精简格式 (账号密码)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 输入区域 */}
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">原始数据</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请粘贴包含 cookie 的文本...&#10;自动提取 c_user 和 xs 字段"
            // 🟢 修复点：移除了 transition-all，使用 transition duration-200 + outline-none
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

        {/* 4. 操作按钮 */}
        <button
          onClick={handleConvert}
          disabled={!input}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-200"
        >
          <RefreshCw className="h-5 w-5" />
          开始格式化转换
        </button>

        {/* 5. 结果输出区域 */}
        <div className="relative">
             <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-sm font-medium text-gray-700">
                  转换结果
                </span>
                
                {/* 复制按钮 */}
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
              placeholder="等待转换..."
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
        <div className="text-center pb-4">
          <p className="text-[10px] text-gray-400">
            模式A示例: <code className="bg-gray-100 px-1 rounded">uid--pw--c_user=...; xs=...;</code>
          </p>
        </div>

      </main>
    </div>
  );
}
