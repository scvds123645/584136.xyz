import Link from "next/link";
import { 
  ShieldCheck, Clock, Database, 
  Check, ArrowRight, Zap,
  BookOpen, MessageCircle, Wrench, Star, HelpCircle, ChevronDown, Lock, Send, ShoppingCart
} from "lucide-react";
import { Metadata, Viewport } from "next";

// --- 全局配置 & 常量 ---
const SITE_CONFIG = {
  brand: "fb180",
  name: "fb180频道 - 脸书白号/老号批发官方店", 
  domain: "https://www.584136.xyz", 
  ogImage: "/og-image.jpg", 
  contactLink: "https://t.me/Facebookkf_bot",
  channelLink: "https://t.me/fb180",
  logoHtml: (
    <span className="font-bold text-xl tracking-tight text-zinc-900 flex items-center gap-1">
      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse ring-2 ring-blue-100"></span>
      fb<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">180</span>
    </span>
  )
};

// --- 商品数据 ---
const PRODUCT = {
  id: "aged-30-cn",
  sku: "FB-AGED-30D",
  title: "Facebook 30天+ 满月老号 (fb180频道甄选)",
  shortTitle: "Facebook 满月老号",
  subtitle: "fb180 频道一手货源 · 脸书白号 · 稳定耐用",
  description: "fb180 频道官方出售的高质量脸书白号。注册时长超30天，包含c_user和xs核心Cookie，纯净IP注册，权重极高。",
  price: "2.00",
  displayPrice: "2.00",
  currency: "CNY",
  unit: "/ 个",
  buyLink: SITE_CONFIG.contactLink,
  tutorialLink: "https://1.584136.xyz",
  stock: 999,
  features: [
    "fb180 频道独家货源，品质保证",
    "注册满 30 天以上 (脸书白号)",
    "包含核心 Cookie (c_user/xs) 直登",
    "纯净住宅IP注册，无关联记录",
    "支持指纹浏览器 (AdsPower/Hubstudio)",
    "售后无忧，死号包换"
  ],
  reviews: { rating: "4.9", count: 356 }
};

// --- FAQ 数据 ---
const FAQS = [
  {
    question: "什么是脸书白号（满月老号）？",
    answer: "脸书白号是指注册时间超过 30 天的 Facebook 纯净账号。相比新号，它的权重更高，不易封号。fb180 频道提供的所有账号均为精选白号，非常适合广告投放或商城运营。"
  },
  {
    question: "为什么选择 fb180 频道的账号？",
    answer: "我们是专业的 Facebook 账号源头，拥有稳定的工作室养号环境。不同于市面上的通货，fb180 出品的账号经过严格筛选，确保 IP 纯净、Cookie 完整，售后更有保障。"
  },
  {
    question: "购买后如何发货？",
    answer: "全自动发货系统。下单后您将收到账号格式：账号|密码|Cookie。建议关注我们的 Telegram 频道 fb180 获取最新库存和教程通知。"
  }
];

// --- Viewport (Next.js 14+) ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 防止双击缩放，提升点击响应速度
  themeColor: "#FFFFFF",
};

// --- Metadata ---
export const metadata: Metadata = {
  title: {
    default: `fb180频道官方店_脸书白号购买 | ${SITE_CONFIG.brand}`,
    template: `%s | ${SITE_CONFIG.brand}`
  },
  description: "fb180 Telegram频道官方售号平台。专业提供高质量脸书白号、Facebook满月老号。",
  robots: { index: true, follow: true }
};

// --- 结构化数据 ---
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": PRODUCT.title,
  "description": PRODUCT.description,
  "sku": PRODUCT.sku,
  "brand": { "@type": "Brand", "name": "fb180" },
  "offers": {
    "@type": "Offer",
    "price": PRODUCT.price,
    "priceCurrency": PRODUCT.currency,
    "availability": "https://schema.org/InStock"
  }
};

// --- 页面组件 ---
export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#F5F5F7] font-sans text-zinc-900 flex flex-col selection:bg-blue-500/20 overflow-x-hidden relative touch-manipulation">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* 背景装饰：添加 transform-gpu 优化安卓性能 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-blue-200/30 rounded-full blur-[60px] animate-pulse transform-gpu will-change-transform"></div>
        <div className="absolute top-[20%] right-[-5%] w-[60vw] h-[60vw] bg-indigo-200/30 rounded-full blur-[60px] opacity-60 transform-gpu will-change-transform"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] bg-zinc-200/50 rounded-full blur-[60px] opacity-80 transform-gpu will-change-transform"></div>
      </div>

      {/* 顶部导航：更紧凑的移动端布局 */}
      <header className="sticky top-0 z-50 w-full px-4 pt-2 pb-2 md:pt-4">
        <nav className="max-w-md mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm shadow-zinc-200/50 rounded-full py-2 pl-2.5 pr-2 transition-all duration-300">
          <Link href="/" className="flex items-center gap-2.5 active:opacity-70 transition-opacity" aria-label="返回首页">
            <div className="w-8 h-8 bg-zinc-900 rounded-full shadow-sm flex items-center justify-center text-white font-bold text-[10px]">
              FB
            </div>
            {SITE_CONFIG.logoHtml}
          </Link>
          
          <a 
            href={SITE_CONFIG.contactLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-zinc-500/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Send size={12} className="fill-current" />
            <span>客服</span>
          </a>
        </nav>
      </header>

      {/* 增加底部 padding，防止内容被底部固定栏遮挡 */}
      <main className="flex-1 flex flex-col items-center w-full px-4 pt-6 pb-32 relative z-10">
        
        {/* 标题区 */}
        <section className="text-center space-y-3 mb-6 w-full max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white text-[#2AABEE] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <ShieldCheck size={12} className="text-[#2AABEE]" />
            Official Shop
          </div>
          
          <h1 className="text-[2rem] sm:text-[2.75rem] font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
            <span className="text-[#2AABEE]">fb180</span> 频道甄选
            <br/>
            <span className="text-zinc-800">高质量脸书白号</span>
          </h1>
          
          <p className="text-zinc-500 text-[13px] sm:text-sm leading-relaxed max-w-[300px] mx-auto">
            Telegram 频道一手货源，30天+ 沉淀老号，纯净环境，稳定耐用。
          </p>
        </section>

        {/* 商品卡片 - 移动端全宽感 */}
        <article className="w-full max-w-sm relative group">
            {/* 光晕效果 */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#2AABEE]/30 to-blue-400/20 rounded-[2.2rem] blur-lg opacity-70 pointer-events-none"></div>
            
            <div className="bg-white/90 backdrop-blur-2xl rounded-[1.8rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/80 overflow-hidden relative">
                
                {/* 顶部彩条 */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#2AABEE] to-blue-600"></div>
                
                <div className="p-6 sm:p-8 relative z-10">
                    <div className="text-center pb-5 mb-5 border-b border-dashed border-zinc-200">
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <div className="flex gap-0.5">
                             {[1,2,3,4,5].map(i => <Star key={i} size={11} className="fill-amber-400 text-amber-400"/>)}
                          </div>
                          <span className="text-[10px] font-medium text-zinc-400 pt-0.5">{PRODUCT.reviews.count} 真实好评</span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-zinc-900 mb-1">{PRODUCT.shortTitle}</h2>
                        <p className="text-xs font-medium text-[#2AABEE] bg-blue-50 inline-block px-2 py-0.5 rounded-md">{PRODUCT.subtitle}</p>
                        
                        <div className="mt-5 flex items-baseline justify-center text-zinc-900">
                            <span className="text-2xl font-bold text-zinc-400 mr-1">¥</span>
                            <span className="text-[3.5rem] font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-700 leading-none">
                              {PRODUCT.displayPrice}
                            </span>
                            <span className="text-sm font-semibold text-zinc-400 ml-2">{PRODUCT.unit}</span>
                        </div>
                    </div>

                    <ul className="grid grid-cols-1 gap-3 mb-8">
                        {PRODUCT.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[13px] text-zinc-700 group/item leading-snug">
                                <div className="w-5 h-5 mt-0.5 rounded-full bg-[#2AABEE]/10 flex items-center justify-center text-[#2AABEE] shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span className="font-medium opacity-90">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* 桌面端主要按钮 (移动端由底部悬浮栏接管，但这里保留以防万一) */}
                    <div className="space-y-3">
                        <a 
                            href={PRODUCT.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full group overflow-hidden bg-zinc-900 text-white h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] md:hidden"
                        >
                           <span className="relative z-10">立即购买</span>
                        </a>
                         {/* 桌面端显示 */}
                        <a 
                            href={PRODUCT.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative hidden md:flex w-full group overflow-hidden bg-zinc-900 hover:bg-[#2AABEE] text-white h-14 rounded-2xl font-bold text-base items-center justify-center gap-2 transition-all shadow-xl shadow-zinc-900/20 hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            <MessageCircle size={20} />
                            <span>联系 fb180 客服购买</span>
                            <ArrowRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <a 
                            href={PRODUCT.tutorialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-zinc-50 text-zinc-600 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-zinc-200 active:bg-zinc-100 active:scale-[0.98]"
                        >
                            <BookOpen size={16} className="text-zinc-400" />
                            <span>查看使用教程</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>

        {/* 信任保障区 */}
        <section className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm">
           {[
             { icon: ShieldCheck, text: "官方信誉", sub: "fb180担保" },
             { icon: Clock, text: "秒发货", sub: "24H自动" },
             { icon: Database, text: "独家源头", sub: "高权重号" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/50 border border-white/60 backdrop-blur-sm">
                <item.icon size={22} className="text-zinc-700 mb-1" strokeWidth={1.5} />
                <span className="text-[11px] font-bold text-zinc-800">{item.text}</span>
                <span className="text-[9px] text-zinc-400 scale-90">{item.sub}</span>
             </div>
           ))}
        </section>

        {/* SEO & FAQ 区 */}
        <section className="w-full max-w-sm px-0 mt-12 space-y-10">
           <div className="bg-white/40 border border-white/50 rounded-3xl p-5 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-zinc-800 font-bold text-sm pl-1">
                <HelpCircle size={16} className="text-[#2AABEE]"/>
                <h3>常见问题</h3>
              </div>
              
              <div className="grid gap-3">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group bg-white rounded-xl border border-zinc-100 overflow-hidden transition-all duration-300 open:shadow-sm">
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-[13px] font-medium text-zinc-700 select-none active:bg-zinc-50">
                      <span>{faq.question}</span>
                      <ChevronDown size={16} className="text-zinc-400 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 text-[12px] text-zinc-500 leading-relaxed border-t border-dashed border-zinc-100 pt-3 bg-zinc-50/50">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-200/50 px-1">
                <h4 className="text-xs font-bold text-zinc-700 mb-2">关于 fb180</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed text-justify">
                  fb180 是专业的 Facebook 账号资源频道。本站所有账号均经过严格测试，确保 Cookie 活跃、IP 纯净。
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {["fb180", "脸书白号", "稳定号"].map(tag => (
                    <span key={tag} className="bg-white border border-zinc-200 px-2 py-1 rounded-md text-[10px] text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
           </div>
        </section>

        <footer className="mt-8 flex flex-col items-center gap-4">
             <Link href="/tools" className="text-[11px] font-medium text-zinc-500 flex items-center gap-1.5 py-2 px-4 bg-white/50 rounded-full">
                <Wrench size={12} /> Facebook 营销工具箱
             </Link>
             <p className="text-[10px] text-zinc-300">© 2024 {SITE_CONFIG.brand}</p>
        </footer>
      </main>

      {/* --- 移动端底部固定悬浮栏 (Sticky Bottom Bar) --- 
          这是提升移动端电商转化率的关键组件
      */}
      <div className="fixed bottom-0 left-0 right-0 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] bg-white/90 backdrop-blur-xl border-t border-zinc-200 z-40 flex items-center gap-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <div className="flex flex-col pl-2">
             <span className="text-[10px] text-zinc-400 line-through">¥3.00</span>
             <div className="flex items-baseline gap-0.5 text-zinc-900">
                 <span className="text-xs font-bold">¥</span>
                 <span className="text-xl font-extrabold">{PRODUCT.displayPrice}</span>
             </div>
         </div>
         <a 
            href={PRODUCT.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#2AABEE] text-white h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-[0.97] active:bg-[#229ED9] transition-all"
         >
             <ShoppingCart size={18} className="fill-current opacity-90" />
             立即抢购
         </a>
      </div>

    </div>
  );
}
