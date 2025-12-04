'use client';

import React, { useState, useEffect, use } from 'react';
import { authenticator } from 'otplib';
import Link from 'next/link';

export default function AppleStyleDynamic2FA({ params }: { params: Promise<{ secret: string }> }) {
  const resolvedParams = use(params);
  const rawSecret = resolvedParams.secret;

  const [token, setToken] = useState<string>('加载中');
  const [timeLeft, setTimeLeft] = useState(30);
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const now = new Date();
      setTimeLeft(30 - (now.getSeconds() % 30));

      if (rawSecret) {
        try {
          const cleanSecret = decodeURIComponent(rawSecret).replace(/\s/g, '');
          const t = authenticator.generate(cleanSecret);
          setToken(`${t.slice(0, 3)} ${t.slice(3)}`);
        } catch {
          setToken('密钥错误');
        }
      }
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [rawSecret]);

  const handleCopy = () => {
    if (token !== '密钥错误' && token !== '加载中') {
      navigator.clipboard.writeText(token.replace(/\s/g, ''));
      setIsCopied(true);
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // 动态计算圆环参数
  const radius = 120; // 半径
  const circumference = 2 * Math.PI * radius; // 周长
  const strokeDashoffset = circumference - ((timeLeft / 30) * circumference);
  
  // 颜色逻辑
  const ringColor = timeLeft <= 5 ? 'text-red-500' : timeLeft <= 10 ? 'text-orange-400' : 'text-blue-500';
  const bgColor = timeLeft <= 5 ? 'bg-red-50' : 'bg-white/80';

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] bg-[#F5F5F7] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* 返回按钮 */}
      <Link 
        href="/2fa" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-1.5 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 active:scale-95 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <span>主页</span>
      </Link>

      {/* 巨大的圆环背景容器 */}
      <div 
        onClick={handleCopy}
        className={`
          relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]
          flex items-center justify-center
          rounded-full
          ${bgColor} backdrop-blur-2xl 
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] 
          cursor-pointer 
          transition-all duration-300 
          active:scale-95 
          touch-manipulation
        `}
      >
        {/* SVG 圆环倒计时 */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full transform -rotate-90">
            {/* 底部灰色轨道 */}
            <circle
              cx="50%" cy="50%" r={radius}
              fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round"
            />
            {/* 彩色进度条 */}
            <circle
              cx="50%" cy="50%" r={radius}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="12" 
              strokeLinecap="round"
              className={`${ringColor} transition-all duration-1000 ease-linear drop-shadow-lg`}
              style={{ strokeDasharray: circumference, strokeDashoffset }}
            />
          </svg>
        </div>

        {/* 中间内容 */}
        <div className="flex flex-col items-center z-10">
          <h2 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            安全验证码
          </h2>
          
          <div className={`text-5xl md:text-6xl font-bold font-mono tracking-wider select-none transition-colors duration-300 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
            {token}
          </div>

          {/* 倒计时秒数显示 */}
          <div className={`mt-2 font-mono font-medium ${ringColor}`}>
            {timeLeft}s
          </div>

          <p className={`mt-4 text-xs font-medium transition-opacity duration-300 absolute -bottom-8 ${isCopied ? 'text-green-600 opacity-100' : 'opacity-0'}`}>
            已复制到剪贴板
          </p>
        </div>
      </div>

      {/* 底部密钥展示 */}
      <div className="absolute bottom-8 left-0 w-full px-8 text-center opacity-40">
        <p className="text-[10px] md:text-xs text-gray-500 font-mono truncate">
          {decodeURIComponent(rawSecret || '')}
        </p>
      </div>
    </div>
  );
}
