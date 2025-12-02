import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-sans">
      
      {/* 标题 */}
      <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
        页面未找到。
      </h1>

      {/* 副标题 */}
      <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-[#86868b]">
        您查找的页面可能已被移动、删除，或者您输入的网址有误。
      </p>

      {/* 按钮区域 */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        {/* 主按钮：返回首页 */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-2 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#0077ed] hover:shadow-sm active:scale-95"
        >
          返回主页
        </Link>

        {/* 链接按钮：跳转 Telegram */}
        <Link 
          href="https://t.me/Facebookkf_bot" 
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center text-[15px] font-medium text-[#0066cc] hover:underline"
        >
          联系支持 
          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
