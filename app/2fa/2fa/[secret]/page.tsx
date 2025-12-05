// Ultimate Advanced Apple-Style 2FA Component
'use client';

import React, { useState, useEffect, use } from 'react';
import { authenticator } from 'otplib';
import Link from 'next/link';

// 添加类型定义
type PageProps = {
  params: Promise<{
    secret: string;
  }>;
};

export default function UltimateAppleStyle2FA({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSecret = resolvedParams.secret;

  const [token, setToken] = useState('加载中');
  const [timeLeft, setTimeLeft] = useState(30);
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));

    const calculate = () => {
      const now = new Date();
      setTimeLeft(30 - (now.getSeconds() % 30));

      if (rawSecret) {
        try {
          const cleanSecret = decodeURIComponent(rawSecret).replace(/\s/g, '');
          const t = authenticator.generate(cleanSecret);
          setToken(`${t.slice(0, 3)} ${t.slice(3)}`.replace(/\$/g, '$$'));
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
    if (token === '密钥错误' || token === '加载中') return;

    navigator.clipboard.writeText(token.replace(/\s/g, ''));
    setIsCopied(true);

    if (navigator.vibrate) navigator.vibrate(45);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const baseSize =
    typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.75, 340) : 300;

  const radius = baseSize / 2 - 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  const ringColor =
    timeLeft <= 5
      ? 'text-red-500'
      : timeLeft <= 10
      ? 'text-orange-400'
      : 'text-blue-500';

  const baseLight = theme === 'dark' ? 'bg-white/10' : 'bg-white/80';

  const glowAnimation = `
  @keyframes apple-glow {
    0% { opacity: 0.22; transform: scale(1); }
    50% { opacity: 0.42; transform: scale(1.06); }
    100% { opacity: 0.22; transform: scale(1); }
  }

  @keyframes liquid-flow {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }

  @keyframes sweep-scan {
    0% { transform: translateY(-60%); }
    100% { transform: translateY(160%); }
  }
  `;

  if (!mounted) return null;

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        background: theme === 'dark' ? '#0a0a0a' : '#F5F5F7'
      }}
    >
      <style>{glowAnimation}</style>

      <Link
        href="/2fa"
        className="absolute left-4 top-[calc(env(safe-area-inset-top)+1rem)] px-4 py-2 bg-white/40 backdrop-blur-lg rounded-full text-sm text-gray-800 active:scale-95 transition z-20"
      >
        返回
      </Link>

      <div
        onClick={handleCopy}
        className={`relative flex items-center justify-center rounded-full cursor-pointer touch-manipulation active:scale-95 transition-all ${baseLight}`}
        style={{ width: baseSize, height: baseSize }}
      >
        <div
          className={`absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none ${ringColor.replace(
            'text',
            'bg'
          )}`}
          style={{ animation: 'apple-glow 2s ease-in-out infinite' }}
        />

        <div
          className="absolute inset-0 rounded-full blur-[45px] opacity-30 pointer-events-none"
          style={{
            background:
              'conic-gradient(#60a5fa,#a855f7,#ec4899,#60a5fa)',
            animation: 'liquid-flow 8s linear infinite'
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
          <div
            className="absolute w-full h-1/3 bg-white/20 blur-xl"
            style={{ animation: 'sweep-scan 2.8s ease-in-out infinite' }}
          />
        </div>

        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#E5E7EB20"
            strokeWidth="12"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className={`${ringColor} drop-shadow-xl transition-all duration-700 ease-linear`}
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
        </svg>

        <div className="z-10 flex flex-col items-center select-none">
          <p className="text-xs text-gray-400 tracking-widest mb-2">安全验证码</p>

          <p
            className={`text-5xl font-mono font-bold tracking-widest ${
              timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'
            }`}
          >
            {token}
          </p>

          <p className={`${ringColor} font-mono mt-1`}>{timeLeft}s</p>

          <p
            className={`absolute -bottom-10 text-xs transition-all ${
              isCopied ? 'opacity-100 text-green-600' : 'opacity-0'
            }`}
          >
            已复制
          </p>
        </div>
      </div>

      <p className="absolute bottom-6 w-full text-center text-xs opacity-40 text-gray-500 dark:text-gray-400 truncate px-8">
        {decodeURIComponent(rawSecret || '')}
      </p>
    </div>
  );
}
