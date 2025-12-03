"use client";

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Copy, CheckCircle2, Sparkles, FileText, Split, ArrowDown } from 'lucide-react';

export default function TextDeduplicationPage() {
  // --- 状态管理 ---
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  
  // 统计数据
  const [stats, setStats] = useState({ 
    original: 0, 
    unique: 0, 
    removed: 0 
  });
  
  const [isCopied, setIsCopied] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  
  // 定时器引用
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- 核心去重逻辑 ---
  const handleDeduplicate = useCallback(() => {
    if (!inputText.trim()) return;

    // 1. 按换行符分割
    const lines = inputText.split('\n');
    
    // 2. 预处理：去除首尾空格，并过滤掉空行
    // 如果你希望保留空行，可以去掉 .filter(line => line !== '')
    const processedLines = lines
      .map(line => line.trim())
      .filter(line => line !== '');

    // 3. 使用 Set 进行去重
    const uniqueSet = new Set(processedLines);
    const uniqueLines = Array.from(uniqueSet);

    // 4. 更新状态
    setOutputText(uniqueLines.join('\n'));
    
    setStats({
      original: lines.length, // 原始行数（包含空行）
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length
    });
    
    setHasProcessed(true);
    setIsCopied(false);
  }, [inputText]);

  // --- 清空逻辑 ---
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ original: 0, unique: 0, removed: 0 });
    setHasProcessed(false);
    setIsCopied(false);
  };

  // --- 复制逻辑 ---
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-10">
      
      {/* 1. 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-14 flex items-center justify-between shadow-sm">
        <Link 
          href="/tools" 
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="返回工具列表"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
          文本去重
        </h1>
        <div className="w-8" />
      </header>

      {/* 2. 主内容区 */}
      <main className="flex-1 p-4 flex flex-col gap-5 max-w-xl mx-auto w-full">
        
        {/* 输入区域 */}
        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <FileText className="w-4 h-4" /> 原始文本
            </label>
            <span className="text-xs text-gray-400">
              {inputText ? `${inputText.split('\n').length} 行` : '0 行'}
            </span>
          </div>
          
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请粘贴需要去重的列表...&#10;自动去除首尾空格及空行"
              // 🟢 修复点：防止键盘弹出时卡顿，移除 transition-all
              className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-white text-base leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm placeholder:text-gray-400 transition duration-200"
            />
            {inputText && (
               <button 
                 onClick={handleClear}
                 className="absolute top-2 right-2 p-1.5 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
            )}
          </div>
        </section>

        {/* 操作栏 */}
        <button
          onClick={handleDeduplicate}
          disabled={!inputText}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-200 active:scale-[0.98] active:bg-blue-700 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100 transition-all"
        >
          <Sparkles className="w-5 h-5" />
          执行智能去重
        </button>

        {/* 结果区域 (仅在处理后显示) */}
        {hasProcessed && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            
            {/* 统计卡片 */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-xs text-gray-400 mb-1">原行数</div>
                <div className="text-lg font-bold text-gray-700">{stats.original}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm text-center">
                <div className="text-xs text-red-400 mb-1">已移除</div>
                <div className="text-lg font-bold text-red-600">{stats.removed}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-xl border border-green-100 shadow-sm text-center">
                <div className="text-xs text-green-500 mb-1">最终结果</div>
                <div className="text-lg font-bold text-green-600">{stats.unique}</div>
              </div>
            </div>

            {/* 输出文本框 */}
            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-gray-600 px-1">
                 去重结果
               </label>
               
               <div className="relative group">
                <textarea
                  readOnly
                  value={outputText}
                  placeholder="结果将显示在这里..."
                  // 🟢 保持一致的样式优化
                  className="w-full h-48 p-4 rounded-xl border border-gray-200 bg-gray-50 text-base leading-relaxed outline-none resize-none text-gray-800 transition-colors"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
                
                {/* 浮动的复制按钮 */}
                <div className="absolute bottom-3 right-3">
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className={`h-9 px-4 flex items-center gap-2 rounded-lg shadow-sm text-xs font-bold transition-all transform active:scale-95 ${
                      isCopied 
                        ? 'bg-green-500 text-white border-transparent shadow-green-200' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> 已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 复制
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        )}

      </main>
    </div>
  );
}
