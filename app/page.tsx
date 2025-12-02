import Link from "next/link";
import { 
  ShieldCheck, Clock, Database, 
  Check, ArrowRight, Globe, Zap,
  BookOpen, MessageCircle, Wrench, Star, HelpCircle, ChevronDown, Lock, Send
} from "lucide-react";
import { Metadata, Viewport } from "next"; // 👈 注意这里引入了 Viewport

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
      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
      fb<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">180</span>
    </span>
  )
};

// --- 商品数据 ---
const PRODUCT = {
  id: "aged-30-cn",
  sku: "FB-AGED-30D",
  mpn: "FB180-OFFICIAL",
  title: "Facebook 30天+ 满月老号 (fb180频道甄选)",
  shortTitle: "Facebook 满月老号",
  subtitle: "fb180 频道一手货源 · 脸书白号 · 稳定耐用",
  description: "fb180 频道官方出售的高质量脸书白号。注册时长超30天，包含c_user和xs核心Cookie，纯净IP注册，权重极高，是广告投放及商城业务的最佳选择。",
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
  reviews: {
    rating: "4.9",
    count: 356,
    bestRating: "5",
    worstRating: "1"
  }
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

// --- Viewport 配置 (单独提取) ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// --- Metadata 配置 ---
export const metadata: Metadata = {
  title: {
    default: `fb180频道官方店_脸书白号购买_Facebook满月老号批发 | ${SITE_CONFIG.brand}`,
    template: `%s | ${SITE_CONFIG.brand}`
  },
  description: "fb180 Telegram频道官方售号平台。专业提供高质量脸书白号、Facebook满月老号。一手工作室货源，稳定耐用，包含Cookie。",
  keywords: [
    "fb180", "脸书白号", "Facebook账号购买", "FB老号", "Facebook满月号", 
    "fb180频道", "FB耐用号", "Facebook cookie号", "脸书号购买", 
    "Facebook账号批发", "FB白号"
  ],
  alternates: { canonical: SITE_CONFIG.domain },
  openGraph: {
    title: `fb180频道官方 - 脸书白号源头 | ¥${PRODUCT.price}`,
    description: "fb180 频道一手货源，专注高质量脸书白号，稳定耐用，包含Cookie直登。",
    type: "website",
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    locale: "zh_CN",
    images: [{ url: `${SITE_CONFIG.domain}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: "fb180 脸书白号" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PRODUCT.title,
    description: PRODUCT.subtitle,
    images: [`${SITE_CONFIG.domain}${SITE_CONFIG.ogImage}`],
  },
  robots: { index: true, follow: true }
};

// --- 结构化数据 ---
const priceValidUntil = new Date();
priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "name": PRODUCT.title,
      "image": [`${SITE_CONFIG.domain}${SITE_CONFIG.ogImage}`],
      "description": PRODUCT.description,
      "sku": PRODUCT.sku,
      "brand": { "@type": "Brand", "name": "fb180" },
      "offers": {
        "@type": "Offer",
        "url": PRODUCT.buyLink,
        "priceCurrency": PRODUCT.currency,
        "price": PRODUCT.price,
        "priceValidUntil": priceValidUntil.toISOString().split('T')[0],
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": { "@type": "Organization", "name": "fb180 Official" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": PRODUCT.reviews.rating,
        "reviewCount": PRODUCT.reviews.count
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    }
  ]
};

// --- 页面组件 ---
export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 font-sans text-zinc-900 flex flex-col selection:bg-blue-500/20 overflow-x-hidden pb-[env(safe-area-inset-bottom)] relative">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-zinc-200/60 rounded-full blur-[80px] opacity-80"></div>
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-4 z-50 w-full px-4 max-w-md mx-auto">
        <nav className="flex justify-between items-center bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm shadow-zinc-200/50 rounded-full py-2.5 px-4 transition-all duration-300 hover:shadow-md hover:bg-white/80">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" aria-label="返回首页">
            <div className="w-8 h-8 bg-zinc-900 rounded-full shadow-inner flex items-center justify-center text-white font-bold text-[10px]">
              FB
            </div>
            {SITE_CONFIG.logoHtml}
          </Link>
          
          <a 
            href={SITE_CONFIG.contactLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#2AABEE] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-[#2AABEE]/20 active:scale-95 transition-all hover:bg-[#229ED9] flex items-center gap-1.5"
          >
            <Send size={12} className="fill-current" />
            联系客服
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center w-full px-4 pt-8 pb-12 relative z-10">
        
        {/* 标题区 */}
        <section className="text-center space-y-4 mb-8 w-full max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-white/60 text-[#2AABEE] text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Send size={12} className="fill-current" aria-hidden="true" />
            Official Shop of fb180
          </div>
          
          <h1 className="text-4xl sm:text-[2.75rem] font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            <span className="text-[#2AABEE]">fb180</span> 频道甄选
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600">
              高质量脸书白号
            </span>
          </h1>
          
          <p className="text-zinc-500 text-sm leading-relaxed max-w-[320px] mx-auto">
            源自 <strong>fb180 Telegram 频道</strong> 的一手货源。
            <br className="hidden sm:block"/>
            30天+ 沉淀老号，纯净环境，稳定耐用。
          </p>
        </section>

        {/* 商品卡片 */}
        <article className="w-full max-w-[22rem] sm:max-w-sm relative group" itemScope itemType="https://schema.org/Product">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#2AABEE]/20 to-blue-400/20 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-[1.8rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden relative">
                <meta itemProp="name" content={PRODUCT.title} />
                <meta itemProp="description" content={PRODUCT.description} />
                
                <div className="h-1.5 w-full bg-gradient-to-r from-[#2AABEE] to-blue-500 opacity-80"></div>
                
                <div className="p-6 sm:p-8 relative z-10">
                    <div className="text-center pb-6 mb-6 border-b border-dashed border-zinc-200">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                          <div className="flex gap-0.5">
                             {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400"/>)}
                          </div>
                          <span className="text-[10px] font-medium text-zinc-400">{PRODUCT.reviews.count} 频道用户好评</span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-zinc-900 mb-1">{PRODUCT.shortTitle}</h2>
                        <p className="text-xs text-zinc-500 font-medium text-[#2AABEE]">{PRODUCT.subtitle}</p>
                        
                        <div className="mt-6 flex items-baseline justify-center text-zinc-900">
                            <span className="text-3xl font-bold text-zinc-400 mr-1">¥</span>
                            <span className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-700">
                              {PRODUCT.displayPrice}
                            </span>
                            <span className="text-sm font-semibold text-zinc-400 ml-2 bg-zinc-100 px-2 py-0.5 rounded-md">{PRODUCT.unit}</span>
                        </div>
                    </div>

                    <ul className="grid grid-cols-1 gap-3 mb-8">
                        {PRODUCT.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-[13px] text-zinc-700 group/item">
                                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 transition-colors group-hover/item:bg-[#2AABEE] group-hover/item:text-white group-hover/item:border-[#2AABEE]">
                                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                                </div>
                                <span className="font-medium opacity-90">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-3">
                        <Link 
                            href={PRODUCT.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full group overflow-hidden bg-zinc-900 hover:bg-[#2AABEE] text-white h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-zinc-900/20 hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            <MessageCircle size={20} className="relative z-10" />
                            <span className="relative z-10">联系 fb180 客服购买</span>
                            <ArrowRight size={18} className="relative z-10 opacity-60 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <a 
                            href={PRODUCT.tutorialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white text-zinc-600 h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
                        >
                            <BookOpen size={16} className="text-zinc-400" />
                            <span>查看使用教程</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>

        {/* 底部保障 */}
        <section className="mt-10 grid grid-cols-3 gap-3 w-full max-w-[22rem] sm:max-w-sm">
           {[
             { icon: ShieldCheck, text: "官方信誉", sub: "fb180担保" },
             { icon: Clock, text: "秒发货", sub: "24H自动" },
             { icon: Database, text: "独家源头", sub: "高权重号" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/40 border border-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors">
                <item.icon size={20} className="text-zinc-700 mb-1.5" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[11px] font-bold text-zinc-700">{item.text}</span>
                <span className="text-[9px] text-zinc-400">{item.sub}</span>
             </div>
           ))}
        </section>

        {/* SEO 内容区 */}
        <section className="w-full max-w-2xl px-4 mt-16 space-y-10">
           <div className="bg-white/40 border border-white/50 rounded-3xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 text-zinc-800 font-bold text-sm">
                <HelpCircle size={16} className="text-[#2AABEE]"/>
                <h3>常见问题 | fb180 频道</h3>
              </div>
              
              <div className="grid gap-4">
                {FAQS.map((faq, idx) => (
                  <details key={idx} className="group bg-white/50 rounded-xl border border-white/60 open:bg-white/80 transition-all duration-300">
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-xs sm:text-sm font-medium text-zinc-700">
                      <span>{faq.question}</span>
                      <ChevronDown size={14} className="text-zinc-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 text-[11px] sm:text-xs text-zinc-500 leading-relaxed border-t border-zinc-100/50 pt-2">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
              <div className="pt-6 border-t border-zinc-200/50">
                <h4 className="text-xs font-bold text-zinc-700 mb-2">关于 fb180 频道</h4>
                <div className="text-[11px] text-zinc-500 leading-relaxed text-justify space-y-2">
                  <p>
                    <strong>fb180</strong> 是专业的 Facebook 账号资源分享频道。本站是 fb180 频道的官方售号平台，旨在为频道订阅用户及广大卖家提供最优质、最稳定的 <strong>脸书白号</strong> 货源。
                  </p>
                  <p>
                    我们深知账号稳定性对业务的重要性。因此，本站出售的所有满月老号均经过 fb180 团队严格测试，确保 Cookie 活跃、IP 纯净，是目前市场上性价比极高的白号选择。
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {["fb180", "脸书白号", "fb180频道", "FB老号批发", "Facebook稳定号"].map(tag => (
                    <span key={tag} className="bg-white border border-zinc-200 px-2 py-1 rounded-md text-[10px] text-zinc-500 hover:text-[#2AABEE] hover:border-[#2AABEE]/30 transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="pb-8 flex flex-col items-center gap-5 text-[10px] text-zinc-400 font-medium relative z-10">
        <Link href="/tools" className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-100 text-zinc-500 hover:text-[#2AABEE] hover:border-[#2AABEE]/20 transition-all shadow-sm hover:shadow-md">
          <Wrench size={12} className="transition-transform group-hover:rotate-12" />
          <span className="font-semibold tracking-wide">Facebook 营销工具箱</span>
        </Link>
        <div className="flex flex-col items-center gap-1">
            <p>© 2024 {SITE_CONFIG.brand} · Official Shop</p>
            <div className="flex items-center gap-1 text-[9px] opacity-70">
                <Lock size={8}/> Secured by fb180 Team
            </div>
        </div>
      </footer>
    </div>
  );
}
