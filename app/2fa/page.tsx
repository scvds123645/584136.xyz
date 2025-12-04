'use client';

import React, { useState, useEffect } from 'react';
import { authenticator } from 'otplib';
import Link from 'next/link'; // 引入 Link

export default function AppleStyle2FA() {
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState<string>('--- ---');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTokenCopied, setIsTokenCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const formatToken = (t: string) => {
    if (t.length === 6) return `${t.slice(0, 3)} ${t.slice(3)}`;
    return t;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft(30 - (now.getSeconds() % 30));

      if (secret && secret.length > 8) {
        try {
          const cleanSecret = secret.replace(/\s/g, '');
          const newToken = authenticator.generate(cleanSecret);
          setToken(formatToken(newToken));
          setIsValid(true);
        } catch {
          setToken('无效密钥');
          setIsValid(false);
        }
      } else {
        setToken('--- ---');
        setIsValid(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secret]);

  const handleCopyToken = () => {
    if (isValid) {
      navigator.clipboard.writeText(token.replace(/\s/g, ''));
      setIsTokenCopied(true);
      if (window.navigator?.vibrate) window.navigator.vibrate(50);
      setTimeout(() => setIsTokenCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (!isValid) return;
    const cleanSecret = secret.replace(/\s/g, '');
    const url = `${window.location.origin}/2fa/2fa/${cleanSecret}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    if (window.navigator?.vibrate) window.navigator.vibrate(50);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  // 进度条颜色逻辑
  const getProgressColor = () => {
    if (timeLeft <= 5) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    if (timeLeft <= 10) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  // 文字颜色逻辑
  const getTextColor = () => {
    if (!isValid) return 'text-gray-300';
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-orange-500';
    return 'text-blue-500';
  };

  return (
    // 增加 relative 属性，作为 absolute 按钮的定位基准
    <div className="min-h-[100dvh] bg-[#F5F5F7] flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden relative">
      
      {/* --- 新增：返回工具箱按钮 (左上角悬浮) --- */}
      <Link 
        href="/tools" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-1.5 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 active:scale-95 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <span>工具箱</span>
      </Link>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300">
        
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">两步验证</h1>
        </div>

        {/* 验证码大卡片 */}
        <div 
          onClick={handleCopyToken}
          className="group relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer transition-transform duration-100 active:scale-95 touch-manipulation overflow-hidden"
        >
          {/* 倒计时数字 (右上角) */}
          {isValid && (
            <div className={`absolute top-3 right-4 font-mono text-sm md:text-base font-bold transition-colors duration-300 ${getTextColor()}`}>
              {timeLeft}s
            </div>
          )}

          {/* 数字 */}
          <div className={`text-4xl md:text-5xl font-bold tracking-widest font-mono z-10 transition-colors duration-300 ${timeLeft <= 5 && isValid ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
            {token}
          </div>
          
          <div className={`mt-3 text-xs md:text-sm font-medium z-10 transition-colors duration-300 ${isTokenCopied ? 'text-green-500' : 'text-gray-400 group-hover:text-blue-500'}`}>
            {isTokenCopied ? '已复制 ✓' : '点击复制'}
          </div>

          {/* 底部进度条 */}
          {isValid && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 md:h-2 bg-gray-100">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div className="space-y-2">
          <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
            密钥
          </label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="在此粘贴密钥..."
            className="w-full bg-gray-100/80 border-0 rounded-xl px-4 py-3 md:py-4 text-base text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all outline-none font-medium"
          />
        </div>

        {/* 快捷链接按钮 */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isValid ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
          <button
            onClick={handleCopyLink}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
              isLinkCopied 
                ? 'bg-green-500 text-white shadow-green-200' 
                : 'bg-blue-500 text-white shadow-blue-200 hover:bg-blue-600'
            } shadow-lg`}
          >
            {isLinkCopied ? '链接已复制' : '复制快捷访问链接'}
          </button>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <p className="text-[10px] md:text-xs text-gray-400">
            本地生成 · 安全加密
          </p>
        </div>
      </div>
    </div>
  );
}
