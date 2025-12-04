// path: /app/components/AnnouncementModal.tsx
'use client';

import React, { useState, useEffect } from 'react';

/**
 * 弹窗公告组件
 * 用于向用户展示重要提示信息（蓝奏云密码统一为6666）
 * 
 * 功能特性：
 * - 每次访问自动弹出
 * - 支持点击遮罩/按钮关闭
 * - 流畅的 CSS 动画效果
 * - 移动端友好设计
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

  // 关闭弹窗处理函数
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // 支持 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isClosing]);

  // 阻止页面滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* 背景遮罩层 */}
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
        aria-labelledby="announcement-title"
      >
        <div
          className={`relative w-full max-w-sm pointer-events-auto transition-all duration-200 ${
            isClosing 
              ? 'opacity-0 scale-95 translate-y-4' 
              : 'opacity-100 scale-100 translate-y-0'
          }`}
          style={{ animation: isClosing ? 'none' : 'slideIn 0.3s ease-out' }}
        >
          {/* 卡片容器 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            
            {/* 内容区域 */}
            <div className="p-6">

              {/* 主标题 */}
              <div className="mb-5">
                <h2 
                  id="announcement-title"
                  className="text-xl font-bold text-slate-900 flex items-center gap-2"
                >
                  <span className="text-2xl">📢</span>
                  <span>重要提示</span>
                </h2>
              </div>

              {/* 正文内容 */}
              <div className="space-y-4 mb-6">
                
                {/* 说明文字 */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  所有蓝奏云网盘的提取密码统一为：
                </p>

                {/* 密码高亮区域 */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                  <div className="text-xs font-medium text-blue-600 mb-2">
                    🔐 提取密码
                  </div>
                  <div className="text-4xl font-black text-blue-600 tracking-wider">
                    6666
                  </div>
                </div>

                {/* 辅助说明 */}
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                  <span className="text-base">💡</span>
                  <span>
                    记住这个密码，下载更方便哦！
                  </span>
                </div>
              </div>

              {/* 底部按钮 */}
              <button
                onClick={handleClose}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-full shadow-sm transition-all duration-200"
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