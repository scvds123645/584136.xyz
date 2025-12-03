
'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Copy, Check, Sparkles, FileText } from 'lucide-react';

export default function TextDeduplicationPage() {
  // --- State Management ---
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
  const [isCopied, setIsCopied] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  // --- Core Logic: Deduplication ---
  const handleDeduplicate = useCallback(() => {
    if (!inputText.trim()) return;

    // 1. Split by newline
    const lines = inputText.split('\n');
    
    // 2. Process: Trim whitespace & Filter empty lines
    const processedLines = lines
      .map(line => line.trim())
      .filter(line => line !== '');

    // 3. Deduplicate using Set
    const uniqueSet = new Set(processedLines);
    const uniqueLines = Array.from(uniqueSet);

    // 4. Update State
    setOutputText(uniqueLines.join('\n'));
    setStats({
      original: lines.length, // 计算原始行数（包含空行，这样对比更直观）
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length
    });
    setHasProcessed(true);
    setIsCopied(false); // 重置复制状态
  }, [inputText]);

  // --- Action: Clear ---
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ original: 0, unique: 0, removed: 0 });
    setHasProcessed(false);
    setIsCopied(false);
  };

  // --- Action: Copy ---
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2秒后恢复
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-14 flex items-center justify-between shadow-sm">
        <Link 
          href="/tools" 
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="返回工具列表"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-lg font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
          文本去重
        </h1>
        <div className="w-8" /> {/* 占位符，保持标题居中 */}
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        
        {/* Input Area */}
        <section className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600 ml-1 flex items-center gap-2">
            <FileText className="w-4 h-4" /> 输入文本
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在此粘贴或输入需要去重的文本... (自动去除首尾空格及空行)"
            className="w-full h-40 p-4 rounded-2xl border border-gray-200 bg-white text-base leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none shadow-sm placeholder:text-gray-400 transition-all"
          />
          <div className="text-xs text-gray-400 text-right px-1">
            当前行数: {inputText ? inputText.split('\n').length : 0}
          </div>
        </section>

        {/* Action Bar (Grid Layout for Mobile) */}
        <section className="grid grid-cols-4 gap-3">
          {/* 清空按钮 (占 1 列) */}
          <button
            onClick={handleClear}
            disabled={!inputText && !outputText}
            className="col-span-1 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-red-500 font-medium shadow-sm active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all"
            title="清空"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* 执行去重按钮 (占 3 列，强调色) */}
          <button
            onClick={handleDeduplicate}
            disabled={!inputText}
            className="col-span-3 h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-200 active:scale-95 active:bg-blue-700 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            执行去重
          </button>
        </section>

        {/* Output Area (Conditional Render or Always Visible) */}
        <section className={`flex flex-col gap-2 transition-opacity duration-300 ${hasProcessed ? 'opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> 处理结果
            </label>
            {hasProcessed && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 font-medium">
                已移除 {stats.removed} 行重复/空行
              </span>
            )}
          </div>

          <div className="relative group">
            <textarea
              readOnly
              value={outputText}
              placeholder="去重后的结果将显示在这里..."
              className="w-full h-40 p-4 rounded-2xl border border-gray-200 bg-gray-50 text-base leading-relaxed focus:outline-none resize-none shadow-inner text-gray-700"
            />
            
            {/* Copy Button Overlay (Bottom Right) */}
            <div className="absolute bottom-3 right-3">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className={`h-10 px-4 flex items-center gap-2 rounded-lg shadow-sm text-sm font-medium transition-all transform active:scale-95 ${
                  isCopied 
                    ? 'bg-green-500 text-white border-transparent' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                } disabled:opacity-0`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" /> 已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> 复制结果
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Detailed Stats */}
          {hasProcessed && (
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-xs text-gray-400 mb-1">原文本行数</div>
                <div className="text-lg font-bold text-gray-800">{stats.original}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 rounded-bl-full opacity-10"></div>
                <div className="text-xs text-blue-500 mb-1 font-medium">去重后行数</div>
                <div className="text-lg font-bold text-blue-600">{stats.unique}</div>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
