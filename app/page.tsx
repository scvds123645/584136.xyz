"use client";

import Link from "next/link";
import { 
  ShieldCheck, Clock, Database, 
  Check, ArrowRight, Globe, Sparkles,
  BookOpen, ExternalLink, MessageCircle, Menu
} from "lucide-react";

// 商品配置
const PRODUCT = {
  id: "aged-30-cn",
  title: "Facebook 30天+ 满月老号",
  subtitle: "工作室一手货源 · 稳定耐用",
  price: "¥2.00",
  unit: "/ 个",
  buyLink: "https://t.me/Facebookkf_bot", // TG 机器人链接
  tutorialLink: "https://1.584136.xyz",   // 教程链接
  features: [
    "注册时长满 30 天以上",
    "包含核心 Cookie (c_user/xs)",
    "筛选死号，保证首登存活",
    "支持指纹浏览器 / 脚本",
    "纯净 IP 注册，权重高",
    "格式: 账号 | 密码 | Cookie"
  ]
};

export default function MobileLandingPage() {
  return (
    // min-h-screen 保证占满全屏，pb-10 留出底部安全距离
    <div className="min-h-screen bg-[#F2F2F7] font-sans text-zinc-900 flex flex-col selection:bg-blue-500/20 overflow-x-hidden">
      
      {/* 顶部导航 - 手机端更加紧凑 */}
      <header className="w-full pt-4 px-5 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-zinc-200/50 flex items-center justify-center text-zinc-900">
            <Globe size={20} className="text-blue-600" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900">FB<span className="text-zinc-400">.Store</span></span>
        </div>
        
        {/* 客服按钮 - 胶囊样式 */}
        <a 
          href="https://t.me/Facebookkf_bot" 
          target="_blank"
          className="bg-white border border-zinc-200/60 text-zinc-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm active:bg-zinc-100 transition-colors"
        >
          联系客服
        </a>
      </header>

      {/* 主体内容 - 居中布局 */}
      <main className="flex-1 flex flex-col items-center w-full px-4 pt-8 pb-12">
        
        {/* 标题区 - 针对手机优化的字体大小 */}
        <div className="text-center space-y-3 mb-8 w-full max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={10} />
            Premium Stock
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
            稳定耐用的<br/><span className="text-blue-600">FB 老白号</span>
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed px-2">
            拒绝新号风控。<br/>30天+ 沉淀，业务推广首选。
          </p>
        </div>

        {/* 核心商品卡片 - 视觉核心 */}
        <div className="w-full max-w-sm animate-in fade-in zoom-in duration-700 delay-100 relative">
            
            {/* 卡片外发光效果 (Glow) */}
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full transform translate-y-4 scale-90 -z-10"></div>

            <div className="bg-white rounded-[1.8rem] shadow-2xl shadow-zinc-200/80 border border-white/50 overflow-hidden relative">
                
                {/* 顶部渐变装饰 */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none"></div>

                <div className="p-6 sm:p-8 relative z-10">
                    
                    {/* 价格与标题 */}
                    <div className="text-center border-b border-zinc-100 pb-5 mb-5">
                        <h2 className="text-xl font-bold text-zinc-900">{PRODUCT.title}</h2>
                        <p className="text-xs text-zinc-400 mt-1 font-medium">{PRODUCT.subtitle}</p>
                        
                        <div className="mt-5 flex items-end justify-center gap-1 text-zinc-900 leading-none">
                            <span className="text-5xl font-bold tracking-tighter text-blue-600">{PRODUCT.price}</span>
                            <span className="text-sm font-medium text-zinc-400 mb-1.5 transform translate-y-0.5">{PRODUCT.unit}</span>
                        </div>
                    </div>

                    {/* 卖点列表 - 紧凑型 */}
                    <ul className="space-y-3 mb-6">
                        {PRODUCT.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[13px] text-zinc-600">
                                <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <Check size={10} strokeWidth={4} />
                                </div>
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* 按钮区域 */}
                    <div className="space-y-3">
                        {/* 购买按钮 (TG) */}
                        <Link 
                            href={PRODUCT.buyLink}
                            target="_blank"
                            className="group w-full bg-[#0088cc] hover:bg-[#0099e6] active:bg-[#0077b3] text-white h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.97]"
                        >
                            <MessageCircle size={18} />
                            <span>立即购买</span>
                            <ArrowRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* 教程按钮 */}
                        <a 
                            href={PRODUCT.tutorialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200 text-zinc-600 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-zinc-200/50 active:scale-[0.97]"
                        >
                            <BookOpen size={16} className="text-zinc-400" />
                            <span>查看登录教程</span>
                        </a>
                    </div>
                    
                    <p className="text-center text-[10px] text-zinc-300 mt-4">
                        * 点击购买将跳转至 Telegram 机器人
                    </p>
                </div>
            </div>
        </div>

        {/* 底部保障标签 - 手机端横向排列 */}
        <div className="mt-10 w-full max-w-sm flex justify-between px-4 opacity-60 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-zinc-700" />
                <span className="text-[10px] font-bold text-zinc-500">安全稳定</span>
            </div>
            <div className="w-px h-8 bg-zinc-300/50"></div>
            <div className="flex flex-col items-center gap-1.5">
                <Clock size={18} className="text-zinc-700" />
                <span className="text-[10px] font-bold text-zinc-500">极速发货</span>
            </div>
            <div className="w-px h-8 bg-zinc-300/50"></div>
            <div className="flex flex-col items-center gap-1.5">
                <Database size={18} className="text-zinc-700" />
                <span className="text-[10px] font-bold text-zinc-500">Cookie直登</span>
            </div>
        </div>

      </main>

      {/* 页脚 */}
      <footer className="pb-6 text-center text-[10px] text-zinc-400 font-medium">
        © 2024 FB Store · Mobile Optimized
      </footer>
    </div>
  );
}
