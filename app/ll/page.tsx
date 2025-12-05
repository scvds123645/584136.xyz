// app/ll/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ScanLine,
  Copy,
  Trash2,
  CheckCircle2,
  List,
} from 'lucide-react';

export default function FourteenDigitExtractorPage() {
  const [inputText, setInputText] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // 使用 useMemo 优化性能，仅在 inputText 变化时重新计算
  const extractedNumbers = useMemo(() => {
    if (!inputText) return [];
    // 正则表达式：精确匹配14位数字
    const regex = /\b\d{14}\b/g;
    const matches = inputText.match(regex) || [];
    // 去重
    return [...new Set(matches)];
  }, [inputText]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // 2秒后清除复制状态
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div
      className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-4 h-14 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <Link
          href="/tools"
          className="flex items-center gap-1 px-2 py-1.5 -ml-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="返回工具箱"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">工具箱</span>
        </Link>
        <h1 className="text-base font-semibold absolute left-1/2 -translate-x-1/2">
          14位数字提取器
        </h1>
        {extractedNumbers.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm font-bold text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/70">
            <List size={14} />
            <span>{extractedNumbers.length}</span>
          </div>
        )}
      </header>

      <main className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
        {/* 输入卡片 */}
        <div className="bg-white/90 backdrop-blur-lg border border-gray-100 shadow-lg shadow-gray-200/50 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <label
              htmlFor="input-text"
              className="text-sm font-semibold text-gray-800 flex items-center gap-2"
            >
              <ScanLine size={16} className="text-gray-500" />
              <span>粘贴文本</span>
            </label>
            <button
              onClick={handleClear}
              disabled={!inputText}
              className="text-xs font-medium text-gray-500 hover:text-red-500 disabled:opacity-40 disabled:hover:text-gray-500 transition-colors p-1"
            >
              清空
            </button>
          </div>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在此处粘贴任意文本，将自动为您提取所有14位纯数字串。"
            className="w-full h-40 bg-gray-100/70 border-0 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* 结果区域 */}
        <div
          className={`transition-opacity duration-500 ${
            extractedNumbers.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {extractedNumbers.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-800 px-2">
                提取结果
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {extractedNumbers.map((num) => (
                  <div
                    key={num}
                    className="group relative flex items-center justify-between bg-white pl-4 pr-2 py-2 rounded-xl shadow-sm border border-gray-100/80"
                  >
                    <span className="font-mono text-sm tracking-wide text-gray-700">
                      {num}
                    </span>
                    <button
                      onClick={() => handleCopy(num)}
                      className="p-2 rounded-lg transition-colors active:scale-90"
                      style={{
                        backgroundColor:
                          copiedText === num ? '#E0F2FE' : 'transparent',
                        color: copiedText === num ? '#0284C7' : '#9CA3AF',
                      }}
                    >
                      {copiedText === num ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Copy
                          size={16}
                          className="group-hover:text-gray-700"
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center pt-2">
                <button
                  onClick={() => handleCopy(extractedNumbers.join('\n'))}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
                >
                  复制全部
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="text-center p-6 mt-4">
        <p className="text-xs text-gray-400">
          本地处理，保障您的数据安全
        </p>
      </footer>
    </div>
  );
}
