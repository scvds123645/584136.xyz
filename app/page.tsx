import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Facebook账号服务导航",
  description: "Facebook账号购买、Cookie注入器、客服支持、社群交流、账号检测一站式服务",
  openGraph: {
    title: "Facebook账号服务导航",
    description: "Facebook账号购买、Cookie注入器、客服支持、社群交流、账号检测一站式服务",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: "https://www.584136.xyz/%E5%A4%B4%E5%83%8F/facebook-color-svgrepo-com.png.ico",
  },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .container {
          width: 100%;
          max-width: 420px;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .logo svg {
          width: 36px;
          height: 36px;
          color: white;
        }
        .header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          color: #64748b;
        }
        .links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .link-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .link-item:active {
          transform: scale(0.98);
        }
        .link-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .link-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .link-icon svg {
          width: 24px;
          height: 24px;
        }
        .link-content {
          flex: 1;
          min-width: 0;
        }
        .link-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .link-desc {
          font-size: 14px;
          color: #64748b;
        }
        .link-arrow {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: #cbd5e1;
        }
        .blue { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
        .green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .cyan { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }
        .purple { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); }
        .orange { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
        .red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
        .footer {
          margin-top: 48px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
      `}} />
      <Script id="baidu-analytics" strategy="afterInteractive">
        {`
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?f586eeedfc80d1d93fccf340c607ec63";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `}
      </Script>
      <div className="container">
        <div className="header">
          <div className="logo">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <h1>Facebook服务导航</h1>
          <p>账号购买·工具下载·客服支持</p>
        </div>
        <div className="links">
          {/* 1. 官方卡网 */}
          <a href="https://fh10.zmfaka.cn/shop/24XZCD9E" target="_blank" rel="noopener noreferrer" className="link-item">
            <div className="link-icon blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">官方卡网</div>
              <div className="link-desc">Facebook账号购买</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          {/* 2. 注入器 */}
          <a href="/facebook-cookie-injector" className="link-item">
            <div className="link-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                <path d="M5.39911 18.7128L5.34322 18.6569M5.39911 18.7128L5.28704 18.6007M5.39911 18.7128C6.15797 19.4716 7.38051 19.4963 8.16935 18.7687L8.96438 18.0353M5.34322 18.6569L5.28704 18.6007M5.34322 18.6569L3.22194 20.7782M5.28704 18.6007C4.52827 17.8419 4.50351 16.6196 5.23094 15.8307L5.96438 15.0353M8.96438 18.0353L5.96438 15.0353M8.96438 18.0353C9.30763 18.3786 9.86416 18.3786 10.2074 18.0353L17.3641 10.8787C18.1451 10.0976 18.1451 8.83128 17.3641 8.05023L15.9499 6.63602C15.1688 5.85497 13.9025 5.85497 13.1214 6.63602L5.96439 13.7931C5.62135 14.1361 5.62134 14.6923 5.96438 15.0353M18.7781 5.22186L16.6567 7.34318M18.7781 5.22186L16.6567 3.10052M18.7781 5.22186L20.8994 7.34317" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">FB Cookie注入器</div>
              <div className="link-desc">快速登录工具</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          {/* 3. 账号检测 */}
          <a href="https://3.584136.xyz" target="_blank" rel="noopener noreferrer" className="link-item">
            <div className="link-icon orange">
              <svg fill="currentColor" stroke="currentColor" strokeWidth="44" viewBox="0 0 1024 1024">
                <path d="M512.8 1002.4c-65.6 0-129.6-12.8-189.6-38.4-58.4-24.8-110.4-60-155.2-104.8S88 761.6 64 703.2c-25.6-60-38.4-124-38.4-190.4 0-65.6 12.8-130.4 38.4-190.4 24-57.6 59.2-110.4 104-155.2s96.8-80 155.2-104.8C383.2 36.8 447.2 24 512.8 24s129.6 12.8 189.6 38.4c58.4 24.8 110.4 60 155.2 104.8 44.8 44.8 80 96.8 104.8 155.2 25.6 60 38.4 124 38.4 190.4 0 65.6-12.8 130.4-38.4 190.4-24.8 58.4-60 110.4-104.8 155.2-44.8 44.8-96.8 80-155.2 104.8-60 25.6-123.2 39.2-189.6 39.2z m0-931.2c-242.4 0-440 198.4-440 441.6s197.6 441.6 440.8 441.6c243.2 0 440.8-198.4 440.8-441.6S756 71.2 512.8 71.2z"/>
                <path d="M512 811.2c-5.6 0-12-2.4-16-6.4-1.6-0.8-2.4-1.6-4-3.2L280 589.6c-9.6-9.6-9.6-24 0-33.6 4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2L488 731.2V236c0-12.8 10.4-24 24-24 12.8 0 24 10.4 24 24v495.2l175.2-175.2c4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2c9.6 9.6 9.6 24 0 33.6l-212 212c-1.6 1.6-2.4 2.4-4 3.2-5.6 4-11.2 6.4-16.8 6.4z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">账号检测</div>
              <div className="link-desc">检测脸书是否180</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          {/* 4. 资源中心 (新增) */}
          <a href="/tools" className="link-item">
            <div className="link-icon red">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">资源中心</div>
              <div className="link-desc">软件下载与资源</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          {/* 5. 官方客服 */}
          <a href="https://t.me/Facebookkf_bot" target="_blank" rel="noopener noreferrer" className="link-item">
            <div className="link-icon cyan">
              <svg fill="currentColor" viewBox="0 0 490.125 490.125">
                <path d="M453.72,36.2c-25.4-28.7-107.4-64.6-172.7,0c-37.2,38.2-45.9,95.1-21.9,142.1c-12.7,13.8-67,68.1-80.8,80.8 c-47-24-103.8-15.3-142.1,21.9c-64.6,65.2-28.7,147.3,0,172.7c68.7,68.7,140,23.4,177,0c53.3-33.2,172.6-132.1,240.3-240.3 C477.02,176.1,522.42,104.9,453.72,36.2z M416.62,192.5c-73.6,113.4-176.4,193.3-223.9,223.9c-16.4,10.9-69.7,52.3-123.5,5.5 c-14.2-12.4-43.6-65.7,0-109.3c27.3-27.3,68.8-30.6,100.5-7.7c8.7,6.6,19.7,5.5,28.4-1.1c18.1-16.4,89.5-87.8,105.9-105.9 c6.6-8.7,7.6-19.7,1.1-28.4c-22.9-31.7-19.7-73.2,7.6-100.5c43.6-43.6,96.9-14.2,109.3,0C468.82,122.8,427.32,176,416.62,192.5z"/>
                <path d="M96.22,161.1h-50.2l39.8-40.5c0.4-0.4,0.8-0.8,1.1-1.3c6.5-8.5,9.9-18.6,9.9-29.3c0-26.7-21.7-48.4-48.4-48.4 S0.12,63.3,0.12,90c0,7.5,6.1,13.6,13.6,13.6s13.6-6.1,13.6-13.6c0-11.7,9.5-21.3,21.3-21.3s21.2,9.6,21.2,21.3 c0,4.4-1.3,8.7-3.9,12.3l-61.9,62.9c-3.8,3.9-5,9.7-2.8,14.7c2.1,5,7,8.3,12.5,8.3h82.5c7.5,0,13.6-6.1,13.6-13.6 C109.82,167.1,103.72,161.1,96.22,161.1z"/>
                <path d="M214.72,127.2h-9.5v-72c0-5.7-3.6-10.8-8.9-12.7c-5.4-1.9-11.4-0.3-15,4.1l-71.2,85.6c-3.4,4-4.1,9.7-1.9,14.4 c2.2,4.8,7,7.8,12.3,7.8h57.6v20.3c0,7.5,6.1,13.6,13.6,13.6s13.6-6.1,13.6-13.6v-20.3h9.5c7.5,0,13.6-6.1,13.6-13.6 S222.22,127.2,214.72,127.2z M178.12,127.2h-28.7l28.7-34.5V127.2z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">官方客服</div>
              <div className="link-desc">在线咨询服务</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          {/* 6. 官方群组 */}
          <a href="https://t.me/fb180" target="_blank" rel="noopener noreferrer" className="link-item">
            <div className="link-icon purple">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,13 C15.2091,13 17,14.7909 17,17 L17,19 C17,19.5523 16.5523,20 16,20 C15.4477,20 15,19.5523 15,19 L15,17 C15,15.8954 14.1046,15 13,15 L6,15 C4.89543,15 4,15.8954 4,17 L4,19 C4,19.5523 3.55228,20 3,20 C2.44772,20 2,19.5523 2,19 L2,17 C2,14.7909 3.79086,13 6,13 L13,13 Z M18.9999,13.0002 C20.6568,13.0002 21.9999,14.3434 21.9999,16.0002 L21.9999,18.0002 C21.9999,18.5525 21.5522,19.0002 20.9999,19.0002 C20.4477,19.0002 19.9999,18.5525 19.9999,18.0002 L19.9999,16.0002 C19.9999,15.448 19.5522,15.0002 18.9999,15.0002 L17.5841,15.0002 C17.2362,14.204 16.687,13.5159 16.0008,13.0002 L18.9999,13.0002 Z M9.49998,3 C11.9853,3 14,5.01472 14,7.5 C14,9.98528 11.9853,12 9.49998,12 C7.01469,12 4.99998,9.98528 4.99998,7.5 C4.99998,5.01472 7.01469,3 9.49998,3 Z M18,6 C19.6569,6 21,7.34315 21,9 C21,10.6569 19.6569,12 18,12 C16.3431,12 15,10.6569 15,9 C15,7.34315 16.3431,6 18,6 Z M9.49998,5 C8.11926,5 6.99998,6.11929 6.99998,7.5 C6.99998,8.88071 8.11926,10 9.49998,10 C10.8807,10 12,8.88071 12,7.5 C12,6.11929 10.8807,5 9.49998,5 Z M18,8 C17.4477,8 17,8.44772 17,9 C17,9.55228 17.4477,10 18,10 C18.5523,10 19,9.55228 19,9 C19,8.44772 18.5523,8 18,8 Z"/>
              </svg>
            </div>
            <div className="link-content">
              <div className="link-title">官方群组</div>
              <div className="link-desc">加入交流社区</div>
            </div>
            <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        <footer className="footer">
          <p>© 2024 Facebook服务平台</p>
        </footer>
      </div>
    </>
  );
}
