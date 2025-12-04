'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setShow(false)}
      />

      {/* 弹窗 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-sm pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            
            {/* 标题 */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-2xl">📢</span>
                <span>重要提示</span>
              </h2>
            </div>

            {/* 内容 */}
            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600">
                所有蓝奏云网盘的提取密码统一为：
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                <div className="text-xs font-medium text-blue-600 mb-2">
                  🔐 提取密码
                </div>
                <div className="text-4xl font-black text-blue-600 tracking-wider">
                  6666
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <span className="text-base">💡</span>
                <span>记住这个密码，下载更方便哦！</span>
              </div>
            </div>

            {/* 按钮 */}
            <button
              onClick={() => setShow(false)}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-full shadow-sm transition-all"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </>
  );
}