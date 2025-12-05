import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Copy, Trash2, Search, CheckCircle2, RotateCcw,
  CopyMinus, Hash, Sparkles, ShieldCheck, RefreshCw, Cookie,
  UserCog, FileKey, Download, Smartphone, Zap, ChevronRight,
  ChevronLeft, Star, Package, HelpCircle, ChevronDown
} from 'lucide-react';

// ==================== 通用组件 ====================

const PageHeader = ({ title, backHref = "/tools" }) => (
  <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-[#050505]/60 backdrop-blur-xl border-b border-white/5">
    <a
      href={backHref}
      className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors text-zinc-300 hover:text-white flex items-center justify-center"
    >
      <ArrowLeft className="w-6 h-6" />
    </a>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium tracking-wider text-zinc-400 uppercase">
        {title}
      </span>
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </div>
  </header>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-[#111111]/80 backdrop-blur-md p-6 border border-white/5 rounded-2xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const variants = {
    primary: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20",
    secondary: "bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10",
    danger: "bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20"
  };
  
  return (
    <button
      onClick={onClick}
      className={`h-12 px-6 rounded-xl font-medium transition-all duration-200 active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ==================== 1. 14位数字提取器 ====================

const NumberExtractorPage = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleExtract = () => {
    if (!inputText.trim()) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    const regex = /(?<!\d)\d{14}(?!\d)/g;
    const matches = inputText.match(regex) || [];
    const uniqueResults = Array.from(new Set(matches));
    
    setResults(uniqueResults);
    setHasSearched(true);
    setIsCopied(false);
  };

  const handleClear = () => {
    setInputText("");
    setResults([]);
    setHasSearched(false);
    setIsCopied(false);
  };

  const handleCopyAll = async () => {
    if (results.length === 0) return;
    try {
      await navigator.clipboard.writeText(results.join("\n"));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <PageHeader title="数值提取器" />
      
      <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
        <GlassCard>
          <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            原始文本
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请粘贴包含14位数字的多行文本..."
            className="w-full h-40 p-3 text-base bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-200 resize-none placeholder:text-zinc-600 text-zinc-100"
          />
        </GlassCard>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="primary" onClick={handleExtract}>
            <Search className="w-4 h-4 mr-2" />
            提取号码
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            <RotateCcw className="w-4 h-4 mr-2" />
            清空
          </Button>
        </div>

        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-sm font-semibold text-zinc-400">
                提取结果 (共 {results.length} 个)
              </h2>
              {results.length > 0 && (
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  已去重
                </span>
              )}
            </div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-3">
                <GlassCard className="max-h-[40vh] overflow-y-auto">
                  <ul className="divide-y divide-white/5">
                    {results.map((num, index) => (
                      <li key={`${num}-${index}`} className="flex items-center p-3 hover:bg-white/5 transition-colors">
                        <span className="font-mono text-zinc-200 tracking-wider text-base select-all">
                          {num}
                        </span>
                        <span className="ml-auto text-xs text-zinc-500 font-mono">
                          #{index + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <Button
                  variant={isCopied ? "primary" : "secondary"}
                  onClick={handleCopyAll}
                  className="w-full"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      复制成功
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      一键复制所有结果
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <GlassCard className="p-8 flex flex-col items-center justify-center text-center text-zinc-500 gap-2">
                <Search size={48} className="text-zinc-700" />
                <p>未找到符合条件的 14 位数字</p>
              </GlassCard>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// ==================== 2. 文本去重 ====================

const TextDeduplicatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
  const [isCopied, setIsCopied] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  const handleDeduplicate = () => {
    if (!inputText.trim()) return;

    const lines = inputText.split('\n');
    const processedLines = lines.map(line => line.trim()).filter(line => line !== '');
    const uniqueSet = new Set(processedLines);
    const uniqueLines = Array.from(uniqueSet);

    setOutputText(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length
    });
    setHasProcessed(true);
    setIsCopied(false);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStats({ original: 0, unique: 0, removed: 0 });
    setHasProcessed(false);
    setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <PageHeader title="文本去重" />
      
      <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
        <GlassCard>
          <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
            <CopyMinus className="w-4 h-4" />
            原始文本
          </label>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请粘贴需要去重的列表...&#10;自动去除首尾空格及空行"
              className="w-full h-40 p-3 text-base bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 resize-none placeholder:text-zinc-600 text-zinc-100"
            />
            {inputText && (
              <button 
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-zinc-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </GlassCard>

        <Button variant="primary" onClick={handleDeduplicate} className="w-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2" />
          执行智能去重
        </Button>

        {hasProcessed && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <GlassCard className="p-3 text-center">
                <div className="text-xs text-zinc-400 mb-1">原行数</div>
                <div className="text-lg font-bold text-zinc-200">{stats.original}</div>
              </GlassCard>
              <GlassCard className="p-3 text-center bg-red-500/10 border-red-500/20">
                <div className="text-xs text-red-400 mb-1">已移除</div>
                <div className="text-lg font-bold text-red-400">{stats.removed}</div>
              </GlassCard>
              <GlassCard className="p-3 text-center bg-green-500/10 border-green-500/20">
                <div className="text-xs text-green-400 mb-1">最终结果</div>
                <div className="text-lg font-bold text-green-400">{stats.unique}</div>
              </GlassCard>
            </div>

            <GlassCard>
              <label className="block text-sm font-medium text-zinc-400 mb-2">去重结果</label>
              <div className="relative group">
                <textarea
                  readOnly
                  value={outputText}
                  placeholder="结果将显示在这里..."
                  className="w-full h-48 p-3 text-base bg-white/5 border border-white/10 rounded-xl outline-none resize-none text-zinc-200"
                  onClick={(e) => e.target.select()}
                />
                <div className="absolute bottom-3 right-3">
                  <button
                    onClick={handleCopy}
                    className={`h-9 px-4 flex items-center gap-2 rounded-lg text-xs font-bold transition-all transform active:scale-95 ${
                      isCopied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> 已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> 复制
                      </>
                    )}
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
};

// ==================== 3. Cookie 处理器 ====================

const CookieProcessorPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [password, setPassword] = useState("qwwwww");
  const [mode, setMode] = useState("full");
  const [stats, setStats] = useState({ total: 0, success: 0 });
  const [isCopied, setIsCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) return;

    const lines = input.split(/\r?\n/);
    let successCount = 0;

    const results = lines.map((line) => {
      const text = line.trim();
      if (!text) return null;

      const uidMatch = text.match(/c_user=([^;\s]+)/);
      const xsMatch = text.match(/xs=([^;\s]+)/);

      if (uidMatch && xsMatch) {
        const uid = uidMatch[1];
        const xs = xsMatch[1];
        successCount++;

        switch (mode) {
          case "full":
            return `${uid}--${password}--c_user=${uid}; xs=${xs};`;
          case "short":
            return `${uid}--${password}`;
          case "cookie":
            return `c_user=${uid}; xs=${xs};`;
          default:
            return null;
        }
      }
      return null;
    });

    const validResults = results.filter((r) => r !== null);
    setOutput(validResults.join("\n"));
    setStats({ total: lines.length, success: successCount });
    setIsCopied(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats({ total: 0, success: 0 });
    setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("复制失败", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <PageHeader title="Cookie 处理器" />
      
      <main className="max-w-md mx-auto p-4 space-y-4">
        <GlassCard className="space-y-3">
          <span className="text-xs font-bold text-zinc-400 ml-1">选择模式</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'full', icon: FileKey, label: '账号+Cookie' },
              { id: 'short', icon: UserCog, label: '仅账号密码' },
              { id: 'cookie', icon: Cookie, label: '纯 Cookie' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex flex-col items-center justify-center py-3 px-1 rounded-lg border transition-all duration-200 ${
                  mode === id 
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400" 
                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-bold">{label}</span>
              </button>
            ))}
          </div>

          {mode !== 'cookie' && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold text-zinc-300 w-20">统一密码</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-100"
                placeholder="设置密码..."
              />
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <label className="block text-xs font-bold text-zinc-400 mb-2">原始数据</label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请粘贴包含 cookie 的文本..."
              className="w-full h-32 p-3 text-xs font-mono bg-white/5 border border-white/10 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-zinc-600 text-zinc-100"
            />
            {input && (
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </GlassCard>

        <Button variant="primary" onClick={handleConvert} className="w-full flex items-center justify-center">
          <RefreshCw className="h-5 w-5 mr-2" />
          开始格式化
        </Button>

        {stats.success > 0 && (
          <GlassCard className="bg-green-500/10 border-green-500/20">
            <div className="text-center">
              <span className="text-green-400 font-bold">成功转换 {stats.success} 条</span>
            </div>
          </GlassCard>
        )}

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-zinc-400">转换结果</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                isCopied
                  ? "bg-green-500 text-white"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20 disabled:opacity-50"
              }`}
            >
              {isCopied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {isCopied ? "已复制" : "复制"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="等待结果..."
            className="w-full h-40 p-3 text-xs font-mono bg-white/5 border border-white/10 rounded-xl outline-none resize-none text-zinc-200"
            onClick={(e) => e.target.select()}
          />
        </GlassCard>
      </main>
    </div>
  );
};

// ==================== 演示切换器 ====================

export default function UnifiedDarkPagesDemo() {
  const [currentPage, setCurrentPage] = useState('extractor');

  const pages = {
    extractor: { component: NumberExtractorPage, name: '数值提取器' },
    deduplicator: { component: TextDeduplicatorPage, name: '文本去重' },
    processor: { component: CookieProcessorPage, name: 'Cookie 处理器' }
  };

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-2 bg-[#111]/90 backdrop-blur-xl p-2 rounded-full border border-white/10">
        {Object.entries(pages).map(([key, { name }]) => (
          <button
            key={key}
            onClick={() => setCurrentPage(key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              currentPage === key
                ? 'bg-blue-500 text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <CurrentPageComponent />
    </div>
  );
}