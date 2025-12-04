// path: /app/components/AnnouncementModal.tsx
'use client';

import React, { useState, useEffect } from 'react';

/**
 * 弹窗公告组件
 * 功能：
 * 1. 展示蓝奏云统一密码 (6666)
 * 2. 提供蓝奏云免会员下载教程链接
 */
export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 组件挂载时显示弹窗
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // 关闭弹窗处理
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isClosing]);

  // 锁定滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      {/* 背景遮罩 */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ animation: isClosing ? 'none' : 'fadeIn 0.2s ease-out' }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 弹窗主体 */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`relative w-full max-w-sm pointer-events-auto transition-all duration-200 ${
            isClosing 
              ? 'opacity-0 scale-95 translate-y-4' 
              : 'opacity-100 scale-100 translate-y-0'
          }`}
          style={{ animation: isClosing ? 'none' : 'slideIn 0.3s ease-out' }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            <div className="p-6">
              {/* 标题 */}
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">📢</span>
                  <span>下载必读</span>
                </h2>
                {/* 右上角关闭小叉号 */}
                <button 
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                
                {/* 1. 密码区域 */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center relative overflow-hidden group">
                  {/* 装饰背景圆 */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
                  
                  <p className="text-xs text-blue-600/80 mb-1 font-medium">蓝奏云统一提取密码</p>
                  <div className="text-4xl font-black text-blue-600 tracking-widest font-mono">
                    6666
                  </div>
                </div>

                {/* 2. 教程区域 (新增) */}
                <a 
                  href="http://1.584136.xyz/lz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-orange-50 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 rounded-xl p-3 transition-all duration-200 group no-underline"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-lg">
                        🤔
                      </div>
                      <div className="flex flex-col justify-center h-full">
                        <span className="text-sm font-bold text-orange-800 group-hover:text-orange-900">
                          提示需要会员才能下载？
                        </span>
                        <span className="text-xs text-orange-600/80 mt-0.5 flex items-center gap-1">
                          点击查看解决方案
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>

                {/* 底部小提示 */}
                <p className="text-xs text-gray-400 text-center px-2">
                  提示：如遇链接无法打开，请复制链接到浏览器访问
                </p>

              </div>

              {/* 按钮 */}
              <button
                onClick={handleClose}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-md shadow-slate-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
