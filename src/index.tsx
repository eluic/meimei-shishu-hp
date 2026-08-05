import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// ============================================================
// 〜NOFY〜 命名刺繍ブランド 公式ホームページ
// Cloudflare Pages + Hono
// Design: 和モダン — 上品・洗練・インテリアとして飾りたくなる世界観
// 「いつまでも飾っておきたくなる命名」
// ============================================================

// ============================================================
// Shared HTML Components
// ============================================================

const headMeta = (title: string, description: string, path: string = '/') => `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | 〜NOFY〜 命名刺繍</title>
<meta name="description" content="${description}">
<meta name="keywords" content="命名刺繍, 出産祝い, 刺繍, 沖縄, 紅型風, 命名書, NOFY">
<meta property="og:title" content="${title} | 〜NOFY〜 命名刺繍">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:image" content="/static/images/logo/logo.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/static/images/logo/logo.png" type="image/png">
<link rel="canonical" href="https://nofy.pages.dev${path}">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600&family=Noto+Sans+JP:wght@300;400;500;600&display=swap" rel="stylesheet">

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- Styles -->
<link href="/static/css/style.css" rel="stylesheet">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "〜NOFY〜",
  "description": "沖縄発の命名刺繍ブランド。紅型をイメージした生地や桜柄など、特別な素材を使った世界にひとつだけの命名刺繍をお作りします。",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "泡瀬2-45-12",
    "addressLocality": "沖縄市",
    "addressRegion": "沖縄県",
    "addressCountry": "JP"
  },
  "email": "nofy.2986@gmail.com",
  "url": "https://nofy.pages.dev"
}
</script>
`

const instagramSvg = (size: number = 18) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`

const header = (currentPage: string = '') => `
<header id="site-header">
  <div class="header-inner">
    <a href="/" class="logo-link" aria-label="〜NOFY〜 トップページ">
      <img src="/static/images/logo/logo.png" alt="〜NOFY〜 ロゴ" class="header-logo">
    </a>
    <nav id="global-nav" aria-label="メインナビゲーション">
      <ul class="nav-list">
        <li><a href="/" class="${currentPage === 'home' ? 'active' : ''}">ホーム</a></li>
        <li><a href="/about" class="${currentPage === 'about' ? 'active' : ''}">ブランドストーリー</a></li>
        <li><a href="/products" class="${currentPage === 'products' ? 'active' : ''}">商品一覧</a></li>
        <li><a href="/order-flow" class="${currentPage === 'order-flow' ? 'active' : ''}">オーダーの流れ</a></li>
        <li><a href="/gallery" class="${currentPage === 'gallery' ? 'active' : ''}">制作実績</a></li>
        <li><a href="/faq" class="${currentPage === 'faq' ? 'active' : ''}">よくある質問</a></li>
        <li><a href="/contact" class="${currentPage === 'contact' ? 'active' : ''}">お問い合わせ</a></li>
      </ul>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="メニューを開く" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<!-- Mobile Nav Overlay -->
<div class="mobile-nav-overlay" id="mobile-nav-overlay">
  <nav class="mobile-nav" aria-label="モバイルナビゲーション">
    <ul>
      <li><a href="/">ホーム</a></li>
      <li><a href="/about">ブランドストーリー</a></li>
      <li><a href="/products">商品一覧</a></li>
      <li><a href="/order-flow">オーダーの流れ</a></li>
      <li><a href="/gallery">制作実績</a></li>
      <li><a href="/faq">よくある質問</a></li>
      <li><a href="/contact">お問い合わせ</a></li>
    </ul>
  </nav>
</div>
`

const footer = () => `
<footer id="site-footer">
  <div class="footer-inner">
    <!-- Logo + Tagline -->
    <div class="footer-logo-block">
      <img src="/static/images/logo/logo.png" alt="〜NOFY〜" class="footer-logo-img">
      <p class="footer-tagline">マダガスカル語で「夢」</p>
    </div>
    <!-- Navigation -->
    <nav class="footer-nav-block" aria-label="フッターナビゲーション">
      <div class="footer-nav-links">
        <a href="/about">ブランドストーリー</a>
        <a href="/products">商品一覧</a>
        <a href="/order-flow">オーダーの流れ</a>
        <a href="/gallery">制作実績</a>
        <a href="/faq">よくある質問</a>
        <a href="/contact">お問い合わせ</a>
      </div>
    </nav>
    <!-- Social -->
    <div class="footer-social-block">
      <div class="footer-social">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          ${instagramSvg(16)}
        </a>
      </div>
    </div>
    <!-- Info -->
    <div class="footer-info-block">
      <p class="footer-info-brand">〜NOFY〜</p>
      <p class="footer-info-address">沖縄市泡瀬2-45-12</p>
      <p class="footer-info-email">nofy.2986@gmail.com</p>
    </div>
    <!-- Copyright -->
    <div class="footer-bottom">
      <p>&copy; 2025 〜NOFY〜 All Rights Reserved.</p>
      <p class="footer-note">※ ご注文後のやり取りはInstagram DMにて行います</p>
    </div>
  </div>
</footer>
<script src="/static/js/main.js"></script>
<script>lucide.createIcons();</script>
`

const breadcrumb = (items: { label: string; href?: string }[]) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      ...(item.href ? { "item": `https://nofy.pages.dev${item.href}` } : {})
    }))
  }
  return `
  <nav class="breadcrumb" aria-label="パンくずリスト">
    <ol>
      ${items.map((item, i) =>
        i < items.length - 1
          ? `<li><a href="${item.href}">${item.label}</a></li>`
          : `<li aria-current="page">${item.label}</li>`
      ).join('')}
    </ol>
  </nav>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  `
}

const wrapPage = (head: string, headerHtml: string, body: string, footerHtml: string, opts?: { loading?: boolean }) => `
<!DOCTYPE html>
<html lang="ja">
<head>${head}</head>
<body>
${opts?.loading ? `
<!-- Brush Loading Overlay — 筆文字「夢」ローディング（実画像トレース版） -->
<div id="brush-loading" class="brush-loading" aria-hidden="true">
  <div class="brush-loading-inner">
    <svg class="brush-svg" viewBox="0 0 600 728" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Wipe reveal masks for each part group -->
        <clipPath id="wipe-top"><rect class="wipe-rect" x="0" y="0" width="600" height="0" data-target-h="260"/></clipPath>
        <clipPath id="wipe-body"><rect class="wipe-rect" x="0" y="220" width="600" height="0" data-target-h="500"/></clipPath>
        <clipPath id="wipe-inner"><rect class="wipe-rect" x="0" y="250" width="600" height="0" data-target-h="480"/></clipPath>
      </defs>

      <!-- 上部：草冠+目の構造 (top) -->
      <g clip-path="url(#wipe-top)">
        <path d="M233.2,242.1L222.9,236.0L209.0,215.1L192.7,226.4L179.9,222.2L160.0,222.2L139.3,210.1L101.3,167.8L104.1,161.4L99.9,155.0L113.0,146.1L142.9,136.1L189.5,126.5L185.2,81.0L177.4,60.4L179.1,58.7L198.3,65.8L219.3,83.2L235.7,101.0L238.9,121.9L263.0,119.8L294.7,68.2L296.1,56.2L305.3,46.9L308.2,39.1L326.3,30.2L342.7,30.9L380.3,48.7L391.4,61.1L394.2,93.1L387.4,120.5L397.4,118.4L408.8,110.6L444.3,120.5L472.7,136.1L484.5,148.6L490.2,160.7L490.2,174.2L481.6,192.0L462.8,196.6L450.7,195.2L435.1,184.5L420.9,183.1L414.5,171.7L400.9,172.4L394.5,166.0L343.4,166.7L316.4,190.9L301.4,195.2L292.2,203.0L291.5,198.7L287.9,199.4L248.1,227.1L233.2,242.1Z" fill="var(--color-black)"/>
        <!-- 上部内部の白抜き -->
        <path d="M278.3,120.1L313.9,118.0L315.3,90.3L310.0,73.6L292.9,78.6L284.0,88.2L268.4,117.3L268.7,120.5L278.3,120.1Z" fill="var(--color-base)"/>
        <path d="M248.5,222.5L278.3,194.8L290.0,176.7L245.6,193.4L248.5,222.5Z" fill="var(--color-base)"/>
      </g>

      <!-- メイン本体：中央横画+夕+払い (body) -->
      <g clip-path="url(#wipe-body)">
        <path d="M140.8,697.8L134.7,697.4L144.0,693.2L136.1,693.2L152.5,682.5L147.2,683.6L148.6,680.7L136.8,684.6L142.9,682.1L146.4,673.6L157.1,667.2L157.1,663.7L172.0,653.7L172.7,649.4L207.9,619.9L241.4,576.6L235.0,551.7L230.7,543.9L215.0,530.4L221.4,528.2L216.1,525.0L198.3,531.4L172.7,549.2L164.2,544.9L155.0,547.8L147.9,545.6L121.6,557.7L114.8,556.7L151.4,534.3L166.7,519.0L188.7,476.3L196.6,447.9L200.8,442.9L200.1,433.0L205.1,435.1L204.4,425.9L209.0,429.1L208.6,423.7L194.1,425.5L150.7,440.4L91.7,475.3L78.6,487.0L70.7,513.3L54.7,522.9L36.3,516.5L31.6,511.9L29.5,494.8L34.5,475.6L30.9,467.1L37.3,463.5L37.3,458.6L53.3,443.3L72.5,443.3L133.6,397.8L202.3,359.0L202.6,349.4L182.0,355.8L172.4,347.6L161.7,322.8L156.8,318.5L157.5,313.5L151.1,306.4L156.8,292.2L156.8,285.8L151.8,285.1L153.9,276.6L151.1,273.7L160.7,267.0L190.5,274.1L243.8,245.6L278.0,234.3L314.2,227.9L369.7,227.1L390.3,230.7L409.5,238.5L421.2,250.2L421.9,262.3L427.6,274.4L426.2,285.8L401.7,313.2L383.2,328.1L354.0,345.9L334.1,342.3L270.1,359.4L196.6,396.7L284.4,375.0L344.1,365.1L384.6,361.5L453.6,363.6L498.3,373.6L513.3,372.2L537.4,383.6L568.4,423.7L569.8,435.1L566.2,446.5L552.4,458.9L526.1,466.0L511.8,466.0L479.1,457.5L425.1,463.9L423.7,460.3L405.9,456.8L386.7,458.2L377.5,455.4L354.7,458.9L367.2,484.1L367.9,494.8L344.4,569.5L323.1,600.7L253.8,663.7L236.0,667.9L191.9,690.0L171.3,690.0L140.8,697.8Z" fill="var(--color-black)"/>
      </g>

      <!-- 内部白抜き穴 (inner - bodyの上に重ねる) -->
      <g clip-path="url(#wipe-inner)">
        <path d="M332.3,329.2L339.5,324.9L352.3,297.9L364.3,258.8L339.1,254.9L307.8,255.6L318.1,268.7L325.2,290.1L323.1,306.4L311.0,319.9L332.3,329.2Z" fill="var(--color-base)"/>
        <path d="M220.0,322.8L225.0,319.2L227.5,286.9L239.6,291.1L244.5,284.0L248.5,297.2L260.9,307.5L273.3,297.2L282.6,283.7L278.0,261.3L238.2,277.6L210.1,295.8L210.8,305.0L220.0,322.8Z" fill="var(--color-base)"/>
        <path d="M243.5,459.3L270.9,450.4L277.3,439.7L287.2,442.6L305.0,438.3L319.2,439.7L353.3,456.8L420.1,423.4L456.8,398.1L443.6,392.1L418.0,387.8L371.1,387.8L301.4,398.5L214.7,421.2L231.4,439.4L239.2,457.1L243.5,459.3Z" fill="var(--color-base)"/>
        <path d="M265.5,545.3L276.2,522.5L281.5,480.2L244.5,491.6L233.5,510.5L223.6,520.4L243.8,536.4L265.5,545.3Z" fill="var(--color-base)"/>
      </g>
    </svg>
    <span class="brush-loading-brand">〜NOFY〜</span>
  </div>
</div>
` : ''}
${headerHtml}<main>${body}</main>${footerHtml}
</body>
</html>
`

const divider = () => `<div class="divider"><span class="divider-icon">◇</span></div>`
const dividerLine = () => `<div class="divider-line"></div>`

// ============================================================
// Products Data
// ============================================================
const products = [
  { id: 'bingata-red', name: '紅型風 赤', category: 'bingata', image: '/static/images/products/bingata-red.jpg', description: '鮮やかな紅型風の赤い生地を使用。沖縄の伝統美をイメージした華やかなデザイン。' },
  { id: 'bingata-blue1', name: '紅型風 水色①', category: 'bingata', image: '/static/images/products/bingata-blue1.jpg', description: '爽やかな水色の紅型風プリント生地。涼しげで上品な印象の命名刺繍。' },
  { id: 'bingata-blue2', name: '紅型風 水色②', category: 'bingata', image: '/static/images/products/bingata-blue2.jpg', description: '落ち着いた水色の紅型風プリント生地。柔らかく優しい雰囲気の命名刺繍。' },
  { id: 'bingata-pink', name: '紅型風 ピンク', category: 'bingata', image: '/static/images/products/bingata-pink.jpg', description: '可愛らしいピンクの紅型風プリント生地。女の子の出産祝いに人気のデザイン。' },
  { id: 'bingata-black', name: '紅型風 黒', category: 'bingata', image: '/static/images/products/bingata-black.jpg', description: 'シックな黒地の紅型風プリント生地。格調高く、特別感のあるデザイン。' },
  { id: 'bingata-style-white', name: '紅型風 白', category: 'bingata', image: '/static/images/products/bingata-style-white.jpg', description: '白地に紅型をイメージした柄を施した上品なデザイン。清楚で美しい命名刺繍。' },
  { id: 'sakura-navy', name: '桜 ネイビー', category: 'sakura', image: '/static/images/products/sakura-navy.jpg', description: '桜柄のネイビー帯。落ち着きと華やかさを兼ね備えたデザイン。' },
  { id: 'sakura-pink', name: '桜 ピンク', category: 'sakura', image: '/static/images/products/sakura-pink.jpg', description: '桜柄のピンク帯。春の訪れを感じる、可愛らしいデザイン。' },
  { id: 'sakura-red', name: '桜 赤', category: 'sakura', image: '/static/images/products/sakura-red.jpg', description: '桜柄の赤帯。華やかで格調高い、お祝いにふさわしいデザイン。' },
  { id: 'sakura-white', name: '桜 白', category: 'sakura', image: '/static/images/products/sakura-white.jpg', description: '桜柄の白帯。清らかで純粋な、新しい命の誕生を祝うデザイン。' },
]

// ============================================================
// PAGE: トップページ (front-page)
// Phase 3 layout: Hero → Products/Lineup → Pickup → Gallery excerpt → Order Flow → Voice → Instagram → News → CTA → Footer
// ============================================================
app.get('/', (c) => {
  const body = `
  <!-- 1. Hero Section -->
  <section id="hero-section" class="hero" style="background-image: url('/static/images/hero/hero-main.jpg')">
  </section>

  <!-- Catchcopy Bridge Section -->
  <section class="catchcopy-bridge">
    <div class="container">
      <p class="catchcopy-text">お子さまの命名を、一生の記念に。<br>心を込めて丁寧に仕上げる命名刺繍。<br>ご自宅用にも、出産祝いにも。</p>
    </div>
  </section>

  <!-- 2. Plan / Lineup Section — Gallery Exhibition Style -->
  <section id="products-section" class="plan-gallery-section">

    <div class="plan-gallery-header">
      <span class="plan-gallery-en">Naming Embroidery</span>
      <h2 class="plan-gallery-title">命名刺繍プラン</h2>
      <p class="plan-gallery-lead">お名前に込められた想いを、<br class="sp-only">一針一針、刺繍で紡ぎます。</p>
    </div>

    <!-- Featured: Standard Plan (人気No.1) — 大きくフィーチャー -->
    <div class="plan-exhibit plan-exhibit--featured">
      <div class="plan-exhibit-visual">
        <img src="/static/images/hero/hero-main.jpg" alt="スタンダードプラン — 赤ちゃんと命名刺繍フレーム" loading="lazy">
      </div>
      <div class="plan-exhibit-caption">
        <span class="plan-exhibit-badge">人気 No.1</span>
        <span class="plan-exhibit-label">Standard Plan</span>
        <h3 class="plan-exhibit-name">スタンダード</h3>
        <p class="plan-exhibit-includes">お名前（漢字・ふりがな）・ 生年月日 ・ 身長 ・ 体重</p>
        <p class="plan-exhibit-price">¥8,500<span>（税込）</span></p>
        <a href="/products" class="plan-exhibit-link">帯の種類を見る <i data-lucide="arrow-right"></i></a>
      </div>
    </div>

    <!-- Sub Plans: Basic & Premium — 並列展示 -->
    <div class="plan-exhibit-pair">

      <a href="/products" class="plan-exhibit plan-exhibit--sub">
        <div class="plan-exhibit-visual">
          <img src="/static/images/hero/hero-01.jpg" alt="ベーシックプラン — 額縁入り命名刺繍作品" loading="lazy">
        </div>
        <div class="plan-exhibit-caption">
          <span class="plan-exhibit-label">Basic Plan</span>
          <h3 class="plan-exhibit-name">ベーシック</h3>
          <p class="plan-exhibit-includes">お名前（漢字・ふりがな）・ 生年月日</p>
          <p class="plan-exhibit-price">¥7,500<span>（税込）</span></p>
        </div>
      </a>

      <a href="/products" class="plan-exhibit plan-exhibit--sub">
        <div class="plan-exhibit-visual">
          <img src="/static/images/hero/hero-04.jpg" alt="プレミアムプラン — 額縁入り命名刺繍作品" loading="lazy">
        </div>
        <div class="plan-exhibit-caption">
          <span class="plan-exhibit-label">Premium Plan</span>
          <h3 class="plan-exhibit-name">プレミアム</h3>
          <p class="plan-exhibit-includes">お名前・ 生年月日 ・ 身長 ・ 体重 ・ ご両親のお名前</p>
          <p class="plan-exhibit-price">¥9,500<span>（税込）</span></p>
        </div>
      </a>

    </div>

    <p class="plan-gallery-note">すべてのプランで、お好みの帯（紅型風・桜柄など）をお選びいただけます。</p>

    <div class="plan-gallery-cta">
      <a href="/products" class="btn btn-outline-brand">商品一覧を見る</a>
    </div>

  </section>

  <!-- 3. Gallery Excerpt -->
  <section class="gallery-excerpt-section">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">Gallery</span>制作実績</h2>
      ${dividerLine()}
      <div class="gallery-excerpt-grid">
        ${products.slice(0, 8).map(p => `
        <div class="gallery-excerpt-item">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        `).join('')}
      </div>
      <div class="section-cta">
        <a href="/gallery" class="btn btn-outline-brand">ギャラリーをすべて見る</a>
      </div>
    </div>
  </section>

  <!-- 5. Order Flow (Simplified Horizontal) -->
  <section class="order-flow-simple section" style="background: var(--color-base-alt);">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">Order Flow</span>オーダーの流れ</h2>
      ${dividerLine()}
      <div class="order-steps-horizontal">
        <div class="order-step-simple">
          <div class="order-step-icon"><i data-lucide="list-checks"></i></div>
          <p class="order-step-num">STEP 1</p>
          <p class="order-step-title">命名プラン選択</p>
        </div>
        <div class="order-step-arrow"><i data-lucide="chevron-right"></i></div>
        <div class="order-step-simple">
          <div class="order-step-icon"><i data-lucide="swatch-book"></i></div>
          <p class="order-step-num">STEP 2</p>
          <p class="order-step-title">帯・生地を選ぶ</p>
        </div>
        <div class="order-step-arrow"><i data-lucide="chevron-right"></i></div>
        <div class="order-step-simple">
          <div class="order-step-icon"><i data-lucide="send"></i></div>
          <p class="order-step-num">STEP 3</p>
          <p class="order-step-title">注文フォーム送信</p>
        </div>
        <div class="order-step-arrow"><i data-lucide="chevron-right"></i></div>
        <div class="order-step-simple">
          <div class="order-step-icon"><i data-lucide="image"></i></div>
          <p class="order-step-num">STEP 4</p>
          <p class="order-step-title">完成写真確認</p>
        </div>
        <div class="order-step-arrow"><i data-lucide="chevron-right"></i></div>
        <div class="order-step-simple">
          <div class="order-step-icon"><i data-lucide="package"></i></div>
          <p class="order-step-num">STEP 5</p>
          <p class="order-step-title">入金・発送</p>
        </div>
      </div>
      <div class="section-cta">
        <a href="/order-flow" class="btn btn-outline-brand">詳しいオーダーの流れを見る</a>
      </div>
    </div>
  </section>

  <!-- 6. Voice Section -->
  <section id="voice-section" class="section voice-section">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">Voice</span>お客様の声</h2>
      ${dividerLine()}
      <div class="voice-grid">
        <div class="voice-card">
          <div class="voice-avatar">
            <img src="https://placehold.jp/24/cccccc/ffffff/400x400.png?text=Customer+Photo" alt="お客様" loading="lazy">
          </div>
          <div class="voice-content">
            <div class="voice-stars">★★★★★</div>
            <p>「子供の名前を刺繍で残せるなんて素敵です。紅型風の柄もとても綺麗で、家族みんなで感動しました。一生の宝物です。」</p>
            <p class="voice-name">— S様（沖縄県）</p>
          </div>
        </div>
        <div class="voice-card">
          <div class="voice-avatar">
            <img src="https://placehold.jp/24/cccccc/ffffff/400x400.png?text=Customer+Photo" alt="お客様" loading="lazy">
          </div>
          <div class="voice-content">
            <div class="voice-stars">★★★★★</div>
            <p>「出産祝いとして友人に贈りました。とても喜んでくれて、リビングに飾ってくれています。世界にひとつだけの贈り物ですね。」</p>
            <p class="voice-name">— M様（東京都）</p>
          </div>
        </div>
        <div class="voice-card">
          <div class="voice-avatar">
            <img src="https://placehold.jp/24/cccccc/ffffff/400x400.png?text=Customer+Photo" alt="お客様" loading="lazy">
          </div>
          <div class="voice-content">
            <div class="voice-stars">★★★★★</div>
            <p>「紙の命名書だと色あせてしまいますが、刺繍ならずっと綺麗なまま残せます。丁寧な対応もありがとうございました。」</p>
            <p class="voice-name">— T様（大阪府）</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. Instagram Section -->
  <section class="instagram-section">
    <div class="container">
      <div class="instagram-icon">${instagramSvg(32)}</div>
      <p class="instagram-handle"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">@nofy_okinawa</a></p>
      <p class="instagram-desc">NOFYの最新作品や制作の様子をInstagramで発信しています。</p>
      <div class="instagram-grid">
        ${products.slice(0, 4).map(p => `
        <div class="instagram-item">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 8. News / お知らせ -->
  <section class="news-section section" style="background: var(--color-white);">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">News</span>お知らせ</h2>
      ${dividerLine()}
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">2025.06.01</span>
          <span class="news-badge new">NEW</span>
          <p class="news-title"><a href="/products/sakura-navy">新作「桜 ネイビー」を発売しました</a></p>
        </div>
        <div class="news-item">
          <span class="news-date">2025.05.15</span>
          <span class="news-badge">お知らせ</span>
          <p class="news-title">公式ホームページをリニューアルしました</p>
        </div>
        <div class="news-item">
          <span class="news-date">2025.04.20</span>
          <span class="news-badge">お知らせ</span>
          <p class="news-title">Instagram フォロワー1,000人を突破しました。ありがとうございます！</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 9. CTA Section -->
  <section id="cta-section" class="cta-section">
    <div class="container">
      <div class="cta-inner">
        <h2>大切な命の誕生を、<br>特別な刺繍で残しませんか？</h2>
        <p>ご注文・ご相談はお気軽にお問い合わせください。</p>
        <div class="cta-buttons">
          <a href="/contact" class="btn btn-white">ご注文・お問い合わせはこちら</a>
          <a href="/order-flow" class="btn btn-outline-white">オーダーの流れ</a>
        </div>
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('トップページ', '沖縄発の命名刺繍ブランド〜NOFY〜。紅型をイメージした生地や桜柄など、特別な素材を使った世界にひとつだけの命名刺繍をお作りします。', '/'),
    header('home'),
    body,
    footer(),
    { loading: true }
  ))
})

// ============================================================
// PAGE: About / ブランドストーリー
// ============================================================
app.get('/about', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: 'ブランドストーリー' }])}
  
  <!-- About Hero -->
  <section class="page-hero about-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-01.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">Brand Story</h1>
      <p class="page-hero-sub">ブランドストーリー</p>
    </div>
  </section>

  <!-- Brand Story -->
  <section class="section about-story">
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <h2 class="section-title"><span class="title-en">Our Story</span>〜NOFY〜のはじまり</h2>
          <p>命名は紙に残すのが一般的ですが、破れたり色あせたりするため、長くきれいに子供の名前を残せる形にしたいという想いから始まりました。</p>
          <p>〜NOFY〜（ノーフィ）はマダガスカル語で<strong>【夢】</strong>を意味します。</p>
          <p>子供の名前は、ご両親から最初の贈り物。「こんな人になって欲しい」という願いを、ずっと形に残せるように心を込めて製作しています。</p>
          <p>ブランドロゴにはマダガスカルをイメージしたデザインを取り入れ、個性豊かに子供たちがすくすくと成長していけるよう願いを込めています。</p>
        </div>
        <div class="about-image">
          <img src="/static/images/products/bingata-red.jpg" alt="紅型風の命名刺繍" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- Brand Values -->
  <section class="section about-values">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">Our Values</span>NOFYのこだわり</h2>
      ${dividerLine()}
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon"><i data-lucide="heart"></i></div>
          <h3>ひとつひとつ丁寧に</h3>
          <p>刺繍機を使用しながらも、デザインや仕上がりにこだわり、ひとつひとつ丁寧に製作しています。世界にひとつだけの特別な作品をお届けします。</p>
        </div>
        <div class="value-card">
          <div class="value-icon"><i data-lucide="palette"></i></div>
          <h3>沖縄の伝統美をイメージした生地</h3>
          <p>沖縄の伝統的な染物「紅型」をイメージしたプリント生地を使用しています。本染めの紅型ではありませんが、鮮やかな色彩と独特の模様が命名刺繍に華やかさを添えます。</p>
        </div>
        <div class="value-card">
          <div class="value-icon"><i data-lucide="gem"></i></div>
          <h3>選べるプリント生地</h3>
          <p>紅型をイメージした柄や桜柄など、さまざまなプリント生地をご用意。お好みやお部屋の雰囲気に合わせてお選びいただけます。</p>
        </div>
        <div class="value-card">
          <div class="value-icon"><i data-lucide="infinity"></i></div>
          <h3>ずっと残せる品質</h3>
          <p>紙と違い、色あせや破損の心配がありません。額縁に入れて飾れば、お子さまが大きくなっても美しいまま残せます。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Making Process -->
  <section class="section about-process">
    <div class="container">
      <h2 class="section-title center"><span class="title-en">Process</span>制作の様子</h2>
      ${dividerLine()}
      <div class="process-gallery">
        <!-- ※差し替え予定：制作風景写真 -->
        <div class="process-item">
          <img src="https://placehold.jp/24/c9a961/ffffff/600x400.png?text=Making+Process+1" alt="生地の選定" loading="lazy">
          <p>生地の選定</p>
        </div>
        <div class="process-item">
          <img src="https://placehold.jp/24/c9a961/ffffff/600x400.png?text=Making+Process+2" alt="デザイン制作" loading="lazy">
          <p>デザイン制作</p>
        </div>
        <div class="process-item">
          <img src="https://placehold.jp/24/c9a961/ffffff/600x400.png?text=Making+Process+3" alt="刺繍作業" loading="lazy">
          <p>刺繍作業</p>
        </div>
        <div class="process-item">
          <img src="https://placehold.jp/24/c9a961/ffffff/600x400.png?text=Making+Process+4" alt="仕上げ・額装" loading="lazy">
          <p>仕上げ・額装</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-inner">
        <h2>世界にひとつだけの命名刺繍を、<br>大切な方へ贈りませんか？</h2>
        <div class="cta-buttons">
          <a href="/products" class="btn btn-white">商品を見る</a>
          <a href="/contact" class="btn btn-outline-white">お問い合わせ</a>
        </div>
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('ブランドストーリー', '〜NOFY〜は沖縄発の命名刺繍ブランド。マダガスカル語で「夢」を意味するNOFYの想いとこだわり。', '/about'),
    header('about'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: 商品一覧
// ============================================================
app.get('/products', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: '商品一覧' }])}
  
  <section class="page-hero products-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-02.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">Products</h1>
      <p class="page-hero-sub">商品一覧</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="products-filter">
        <button class="filter-btn active" data-filter="all">すべて</button>
        <button class="filter-btn" data-filter="bingata">紅型風シリーズ</button>
        <button class="filter-btn" data-filter="sakura">桜シリーズ</button>
      </div>

      <div class="products-grid-full" id="products-grid">
        ${products.map(p => `
        <a href="/products/${p.id}" class="product-card" data-category="${p.category}">
          <div class="product-image-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-overlay">
              <span>詳細を見る</span>
            </div>
          </div>
          <div class="product-info">
            <h3>${p.name}</h3>
            <p class="product-desc">${p.description}</p>
            <p class="product-price">¥7,500〜</p>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('商品一覧', '〜NOFY〜の命名刺繍商品一覧。紅型風・桜柄など豊富なデザインから選べます。', '/products'),
    header('products'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: 商品詳細
// ============================================================
app.get('/products/:id', (c) => {
  const productId = c.req.param('id')
  const product = products.find(p => p.id === productId)
  
  if (!product) {
    return c.html(wrapPage(
      headMeta('商品が見つかりません', '指定された商品が見つかりません。'),
      header('products'),
      `<section class="section"><div class="container"><h1>商品が見つかりません</h1><p><a href="/products">商品一覧に戻る</a></p></div></section>`,
      footer()
    ), 404)
  }

  const relatedProducts = products.filter(p => p.id !== productId && p.category === product.category).slice(0, 3)
  
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: '商品一覧', href: '/products' }, { label: product.name }])}

  <section class="section product-detail">
    <div class="container">
      <div class="product-detail-grid">
        <!-- Left: Gallery -->
        <div class="product-gallery">
          <div class="product-main-image" id="product-main-image">
            <img src="${product.image}" alt="${product.name}" id="main-product-img">
          </div>
          <div class="product-thumbs">
            <button class="product-thumb active" data-src="${product.image}">
              <img src="${product.image}" alt="${product.name}">
            </button>
            <!-- ※差し替え予定：サブ写真 -->
            <button class="product-thumb" data-src="https://placehold.jp/24/1a2332/ffffff/800x800.png?text=Product+Sub+1">
              <img src="https://placehold.jp/24/1a2332/ffffff/200x200.png?text=Sub+1" alt="サブ写真1">
            </button>
            <button class="product-thumb" data-src="https://placehold.jp/24/1a2332/ffffff/800x800.png?text=Product+Sub+2">
              <img src="https://placehold.jp/24/1a2332/ffffff/200x200.png?text=Sub+2" alt="サブ写真2">
            </button>
            <button class="product-thumb" data-src="https://placehold.jp/24/1a2332/ffffff/800x800.png?text=Product+Sub+3">
              <img src="https://placehold.jp/24/1a2332/ffffff/200x200.png?text=Sub+3" alt="サブ写真3">
            </button>
          </div>
        </div>

        <!-- Right: Details -->
        <div class="product-info-detail">
          <h1 class="product-detail-name">命名刺繍 ${product.name}</h1>
          <p class="product-detail-desc">${product.description}</p>
          
          <!-- Plan Selection -->
          <div class="option-group">
            <h3>プラン選択</h3>
            <div class="plan-selector" id="plan-selector">
              <label class="plan-option">
                <input type="radio" name="plan" value="basic" checked>
                <div class="plan-option-inner">
                  <strong>基本プラン</strong>
                  <span>お名前・読み方・生年月日</span>
                  <span class="plan-price">¥7,500</span>
                </div>
              </label>
              <label class="plan-option">
                <input type="radio" name="plan" value="standard">
                <div class="plan-option-inner">
                  <strong>身長・体重プラン</strong>
                  <span>基本 + 身長・体重</span>
                  <span class="plan-price">¥9,000</span>
                </div>
              </label>
              <label class="plan-option">
                <input type="radio" name="plan" value="full">
                <div class="plan-option-inner">
                  <strong>フルプラン</strong>
                  <span>基本 + 身長・体重 + 両親名前</span>
                  <span class="plan-price">¥11,000</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Fabric Selection -->
          <div class="option-group">
            <h3>帯の選択</h3>
            <div class="fabric-selector" id="fabric-selector">
              ${Array.from({length: 8}, (_, i) => `
              <!-- ※差し替え予定：帯写真 -->
              <label class="fabric-option ${i === 0 ? 'selected' : ''}">
                <input type="radio" name="obi" value="obi-${String(i+1).padStart(2, '0')}" ${i === 0 ? 'checked' : ''}>
                <img src="https://placehold.jp/24/faf7f2/1a2332/200x200.png?text=Obi+${String(i+1).padStart(2, '0')}" alt="帯${i+1}">
                <span>帯 ${String(i+1).padStart(2, '0')}</span>
              </label>
              `).join('')}
            </div>
          </div>

          <!-- Background Fabric -->
          <div class="option-group">
            <h3>背景生地の選択</h3>
            <div class="fabric-selector">
              <!-- ※差し替え予定：背景生地写真 -->
              <label class="fabric-option selected">
                <input type="radio" name="background" value="bara" checked>
                <img src="https://placehold.jp/24/faf7f2/1a2332/200x200.png?text=Bara" alt="バラ">
                <span>バラ</span>
              </label>
              <label class="fabric-option">
                <input type="radio" name="background" value="ryu">
                <img src="https://placehold.jp/24/faf7f2/1a2332/200x200.png?text=Ryu" alt="龍">
                <span>龍</span>
              </label>
            </div>
          </div>

          <!-- Total Price -->
          <div class="product-total">
            <p class="total-label">合計金額</p>
            <p class="total-price" id="total-price">¥7,500<span class="tax">（税込）</span></p>
          </div>

          <a href="/contact" class="btn btn-primary btn-lg btn-block">注文する</a>
          
          <div class="product-notes">
            <p><i data-lucide="info"></i> オーダーメイド商品のため、製作開始後のキャンセル・返品・交換は原則不可となります。</p>
            <p><i data-lucide="truck"></i> 全国一律送料（レターパックライト）</p>
            <p><i data-lucide="clock"></i> 納期：約1週間〜10日</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      ${relatedProducts.length > 0 ? `
      <div class="related-products">
        <h2 class="section-title"><span class="title-en">Related</span>関連商品</h2>
        ${dividerLine()}
        <div class="products-grid">
          ${relatedProducts.map(p => `
          <a href="/products/${p.id}" class="product-card">
            <div class="product-image-wrap">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
              <h3>${p.name}</h3>
              <p class="product-price">¥7,500〜</p>
            </div>
          </a>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  </section>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "命名刺繍 ${product.name}",
    "description": "${product.description}",
    "image": "${product.image}",
    "brand": { "@type": "Brand", "name": "〜NOFY〜" },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "7500",
      "highPrice": "11000",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
  `

  return c.html(wrapPage(
    headMeta(`命名刺繍 ${product.name}`, product.description, `/products/${product.id}`),
    header('products'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: オーダーの流れ
// ============================================================
app.get('/order-flow', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: 'オーダーの流れ' }])}

  <section class="page-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-03.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">Order Flow</h1>
      <p class="page-hero-sub">オーダーの流れ</p>
    </div>
  </section>

  <section class="section order-flow-section">
    <div class="container">
      <p class="section-intro">NOFYの命名刺繍は、すべてオーダーメイドで制作しています。<br>下記のステップに沿って、お気軽にご注文ください。</p>

      <div class="steps">
        <div class="step">
          <div class="step-number">STEP 01</div>
          <div class="step-icon"><i data-lucide="list-checks"></i></div>
          <div class="step-content">
            <h3>命名プランの選択</h3>
            <p>まず、命名刺繍に記載する内容をお選びください。<br>「お名前＋生年月日」のベーシック、「身長・体重」も入るスタンダード、「ご両親のお名前」まで入るプレミアムの3プランからお選びいただけます。</p>
          </div>
        </div>
        <div class="step-connector"><i data-lucide="chevron-down"></i></div>

        <div class="step">
          <div class="step-number">STEP 02</div>
          <div class="step-icon"><i data-lucide="swatch-book"></i></div>
          <div class="step-content">
            <h3>帯・背景生地の選択</h3>
            <p>次に、お好みの帯（紅型風・桜柄など）と背景生地をお選びください。商品一覧ページで写真付きでご確認いただけます。</p>
          </div>
        </div>
        <div class="step-connector"><i data-lucide="chevron-down"></i></div>

        <div class="step">
          <div class="step-number">STEP 03</div>
          <div class="step-icon"><i data-lucide="send"></i></div>
          <div class="step-content">
            <h3>注文フォーム送信</h3>
            <p>お問い合わせフォームまたはInstagram DMから、赤ちゃんのお名前・読み方・生年月日などの必要情報をお送りください。</p>
          </div>
        </div>
        <div class="step-connector"><i data-lucide="chevron-down"></i></div>

        <div class="step">
          <div class="step-number">STEP 04</div>
          <div class="step-icon"><i data-lucide="image"></i></div>
          <div class="step-content">
            <h3>完成写真の確認</h3>
            <p>制作完了後（約1週間〜10日後）、完成写真をお送りします。ご確認いただき、修正があればお申し付けください。</p>
          </div>
        </div>
        <div class="step-connector"><i data-lucide="chevron-down"></i></div>

        <div class="step">
          <div class="step-number">STEP 05</div>
          <div class="step-icon"><i data-lucide="package"></i></div>
          <div class="step-content">
            <h3>入金確認後、発送</h3>
            <p>銀行振込での入金確認後、レターパックライトにて発送いたします。全国一律送料でお届けします。</p>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="order-notes">
        <h3><i data-lucide="alert-circle"></i> ご注意事項</h3>
        <ul>
          <li>オーダーメイド商品のため、<strong>製作開始後のキャンセル・返品・交換は原則不可</strong>です。</li>
          <li>発送前に完成写真をお送りしますので、事前にご確認をお願いいたします。</li>
          <li>当店のミス・商品不良の場合は、<strong>到着後1週間以内</strong>にご連絡ください。</li>
          <li>額の破損については、刺繍代がメインのため対応いたしかねます。</li>
          <li>ご注文後のやり取りは<strong>Instagram DM</strong>にて行います。</li>
        </ul>
      </div>

      <div class="section-cta">
        <a href="/contact" class="btn btn-primary btn-lg">注文・お問い合わせはこちら</a>
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('オーダーの流れ', '〜NOFY〜の命名刺繍のオーダー方法。5つのステップで簡単にご注文いただけます。', '/order-flow'),
    header('order-flow'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: ギャラリー
// ============================================================
app.get('/gallery', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: '制作実績' }])}

  <section class="page-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-01.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">Gallery</h1>
      <p class="page-hero-sub">制作実績</p>
    </div>
  </section>

  <section class="section gallery-page-section">
    <div class="container">
      <p class="section-intro">お客さまにお届けした、世界にひとつだけの命名刺繍の一部をご紹介します。</p>

      <div class="gallery-filter">
        <button class="filter-btn active" data-filter="all">すべて</button>
        <button class="filter-btn" data-filter="bingata">紅型風</button>
        <button class="filter-btn" data-filter="sakura">桜</button>
      </div>

      <div class="masonry-grid" id="gallery-grid">
        ${products.map((p, i) => `
        <div class="masonry-item ${i % 3 === 0 ? 'tall' : ''}" data-category="${p.category}">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="gallery-img" data-full="${p.image}">
          <div class="gallery-item-overlay">
            <span>${p.name}</span>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" aria-label="閉じる"><i data-lucide="x"></i></button>
    <button class="lightbox-prev" aria-label="前へ"><i data-lucide="chevron-left"></i></button>
    <button class="lightbox-next" aria-label="次へ"><i data-lucide="chevron-right"></i></button>
    <div class="lightbox-content">
      <img src="" alt="" id="lightbox-img">
    </div>
  </div>
  `

  return c.html(wrapPage(
    headMeta('制作実績・ギャラリー', '〜NOFY〜の命名刺繍制作実績。紅型風・桜柄の美しい命名刺繍をご覧ください。', '/gallery'),
    header('gallery'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: FAQ
// ============================================================
app.get('/faq', (c) => {
  const faqs = [
    { q: '納期はどのくらいですか？', a: 'ご注文確定後、約1週間〜10日程度でお届けいたします。混雑状況によって前後する場合がございますので、お急ぎの方は事前にお問い合わせください。' },
    { q: '自分でデザインを指定することはできますか？', a: 'はい、可能です。基本デザイン以外にも、カラー変更や追加文字のカスタマイズが可能です。フルオーダーについてはお問い合わせフォームよりご相談ください。' },
    { q: '出産祝いとして贈ることはできますか？', a: 'もちろんです。ギフトとしてご注文されるお客様も多くいらっしゃいます。赤ちゃんのお名前・生年月日が分かれば、ご家族以外の方でもご注文いただけます。' },
    { q: '額のサイズはどのくらいですか？', a: '標準サイズはA4（約21cm × 30cm）です。お部屋に飾りやすいサイズ感となっております。' },
    { q: '支払い方法は何がありますか？', a: '現在、銀行振込（前払い）にてお受けしております。ご注文確定後に振込先をご案内いたします。' },
    { q: 'キャンセルや返品はできますか？', a: 'オーダーメイド商品のため、製作開始後のキャンセル・返品・交換は原則お受けしておりません。ただし、当店のミスや商品不良の場合は、到着後1週間以内にご連絡いただければ対応いたします。' },
    { q: '追加の文字やオプションの料金は？', a: '追加文字は追加料金が発生します。詳しくはお問い合わせフォームよりご確認ください。' },
    { q: '注文後のやりとりはどうすればいいですか？', a: 'ご注文後のやりとりはInstagram DMにて行います。完成写真の確認なども、DMでお送りいたします。' },
  ]

  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: 'よくある質問' }])}

  <section class="page-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-02.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">FAQ</h1>
      <p class="page-hero-sub">よくある質問</p>
    </div>
  </section>

  <section class="section faq-section">
    <div class="container container-narrow">
      <div class="faq-list" id="faq-list">
        ${faqs.map((faq, i) => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
            <span class="faq-q-mark">Q</span>
            <span>${faq.q}</span>
            <i data-lucide="chevron-down" class="faq-chevron"></i>
          </button>
          <div class="faq-answer" id="faq-answer-${i}" role="region">
            <div class="faq-answer-inner">
              <span class="faq-a-mark">A</span>
              <p>${faq.a}</p>
            </div>
          </div>
        </div>
        `).join('')}
      </div>

      <div class="faq-cta">
        <p>ご質問が見つからない場合は、お気軽にお問い合わせください。</p>
        <a href="/contact" class="btn btn-outline-brand">お問い合わせ</a>
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('よくある質問', '〜NOFY〜の命名刺繍に関するよくある質問。納期・料金・注文方法などをご確認いただけます。', '/faq'),
    header('faq'),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: お問い合わせ
// ============================================================
app.get('/contact', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: 'お問い合わせ' }])}

  <section class="page-hero">
    <div class="page-hero-bg" style="background-image: url('/static/images/hero/hero-03.jpg')"></div>
    <div class="page-hero-overlay">
      <h1 class="page-hero-title">Contact</h1>
      <p class="page-hero-sub">お問い合わせ・ご注文</p>
    </div>
  </section>

  <section class="section contact-section">
    <div class="container container-narrow">
      <p class="section-intro">ご注文・ご相談は下記フォームよりお気軽にお問い合わせください。<br>Instagram DMからもご注文いただけます。</p>

      <form class="contact-form" id="contact-form" action="/api/contact" method="POST">
        <div class="form-group">
          <label for="contact-type">お問い合わせ種類 <span class="required">必須</span></label>
          <select id="contact-type" name="type" required>
            <option value="">選択してください</option>
            <option value="order">ご注文</option>
            <option value="question">商品に関するご質問</option>
            <option value="custom">フルオーダー相談</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="contact-name">お名前 <span class="required">必須</span></label>
            <input type="text" id="contact-name" name="name" required placeholder="山田 太郎">
          </div>
          <div class="form-group">
            <label for="contact-email">メールアドレス <span class="required">必須</span></label>
            <input type="email" id="contact-email" name="email" required placeholder="example@mail.com">
          </div>
        </div>

        <div class="form-group">
          <label for="contact-phone">電話番号</label>
          <input type="tel" id="contact-phone" name="phone" placeholder="090-1234-5678">
        </div>

        <fieldset class="form-fieldset" id="order-fields" style="display:none">
          <legend>ご注文情報</legend>
          
          <div class="form-group">
            <label for="baby-name">赤ちゃんのお名前（漢字） <span class="required">必須</span></label>
            <input type="text" id="baby-name" name="baby_name" placeholder="例：太陽">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="baby-reading">読み方（ふりがな） <span class="required">必須</span></label>
              <input type="text" id="baby-reading" name="baby_reading" placeholder="例：たいよう">
            </div>
            <div class="form-group">
              <label for="baby-birthday">生年月日 <span class="required">必須</span></label>
              <input type="date" id="baby-birthday" name="baby_birthday">
            </div>
          </div>

          <div class="form-group">
            <label>プラン選択</label>
            <div class="form-radio-group">
              <label><input type="radio" name="plan" value="basic" checked> 基本プラン（¥7,500）</label>
              <label><input type="radio" name="plan" value="standard"> 身長・体重プラン（¥9,000）</label>
              <label><input type="radio" name="plan" value="full"> フルプラン（¥11,000）</label>
            </div>
          </div>

          <div class="form-row" id="hw-fields" style="display:none">
            <div class="form-group">
              <label for="baby-height">身長</label>
              <input type="text" id="baby-height" name="baby_height" placeholder="例：50cm">
            </div>
            <div class="form-group">
              <label for="baby-weight">体重</label>
              <input type="text" id="baby-weight" name="baby_weight" placeholder="例：3000g">
            </div>
          </div>

          <div class="form-row" id="parents-fields" style="display:none">
            <div class="form-group">
              <label for="parent-father">お父さまのお名前</label>
              <input type="text" id="parent-father" name="parent_father" placeholder="例：山田 太郎">
            </div>
            <div class="form-group">
              <label for="parent-mother">お母さまのお名前</label>
              <input type="text" id="parent-mother" name="parent_mother" placeholder="例：山田 花子">
            </div>
          </div>

          <div class="form-group">
            <label>
              <input type="checkbox" name="gallery_permission" value="yes">
              制作実績ページへの掲載を許可する
            </label>
          </div>
        </fieldset>

        <div class="form-group">
          <label for="contact-message">メッセージ <span class="required">必須</span></label>
          <textarea id="contact-message" name="message" required rows="6" placeholder="ご質問やご要望をお書きください"></textarea>
        </div>

        <div class="form-group form-agree">
          <label>
            <input type="checkbox" required>
            <a href="/privacy" target="_blank">プライバシーポリシー</a>に同意する <span class="required">必須</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">送信する</button>
      </form>

      <div class="contact-alt">
        <h3>その他のお問い合わせ方法</h3>
        <div class="contact-methods">
          <div class="contact-method">
            ${instagramSvg(28)}
            <h4>Instagram DM</h4>
            <p>@nofy_okinawa<br>DMからもご注文・ご相談いただけます</p>
          </div>
          <div class="contact-method">
            <i data-lucide="mail"></i>
            <h4>メール</h4>
            <p>nofy.2986@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  `

  return c.html(wrapPage(
    headMeta('お問い合わせ・ご注文', '〜NOFY〜への命名刺繍のご注文・お問い合わせ。フォームまたはInstagram DMよりお気軽にどうぞ。', '/contact'),
    header('contact'),
    body,
    footer()
  ))
})

// ============================================================
// API: Contact Form
// ============================================================
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.parseBody()
    // In production, this would send email via SendGrid/Mailgun API
    // For now, return success response
    return c.json({ success: true, message: 'お問い合わせを受け付けました。' })
  } catch (e) {
    return c.json({ success: false, message: '送信に失敗しました。' }, 500)
  }
})

// ============================================================
// PAGE: Privacy Policy
// ============================================================
app.get('/privacy', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: 'プライバシーポリシー' }])}
  <section class="section legal-section">
    <div class="container container-narrow">
      <h1 class="legal-title">プライバシーポリシー</h1>
      <div class="legal-content">
        <h2>個人情報の取り扱いについて</h2>
        <p>〜NOFY〜（以下「当店」）は、お客様の個人情報を適切に管理し、以下の方針に従って取り扱います。</p>
        <h3>1. 収集する情報</h3>
        <p>ご注文・お問い合わせ時に、お名前、メールアドレス、電話番号、ご注文内容等をお預かりします。</p>
        <h3>2. 利用目的</h3>
        <p>お預かりした個人情報は、ご注文の処理、商品の製作・発送、お問い合わせへの回答にのみ使用いたします。</p>
        <h3>3. 第三者への提供</h3>
        <p>法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。</p>
        <h3>4. お問い合わせ</h3>
        <p>個人情報に関するお問い合わせは、nofy.2986@gmail.com までご連絡ください。</p>
      </div>
    </div>
  </section>
  `
  return c.html(wrapPage(
    headMeta('プライバシーポリシー', '〜NOFY〜のプライバシーポリシー', '/privacy'),
    header(),
    body,
    footer()
  ))
})

// ============================================================
// PAGE: 特定商取引法
// ============================================================
app.get('/legal', (c) => {
  const body = `
  ${breadcrumb([{ label: 'ホーム', href: '/' }, { label: '特定商取引法に基づく表記' }])}
  <section class="section legal-section">
    <div class="container container-narrow">
      <h1 class="legal-title">特定商取引法に基づく表記</h1>
      <div class="legal-content">
        <table class="legal-table">
          <tr><th>販売業者</th><td>〜NOFY〜</td></tr>
          <tr><th>所在地</th><td>沖縄市泡瀬2-45-12</td></tr>
          <tr><th>連絡先</th><td>nofy.2986@gmail.com</td></tr>
          <tr><th>販売価格</th><td>各商品ページに表示（税込）</td></tr>
          <tr><th>送料</th><td>全国一律（レターパックライト）</td></tr>
          <tr><th>支払方法</th><td>銀行振込（前払い）</td></tr>
          <tr><th>商品引き渡し時期</th><td>注文確定後 約1週間〜10日</td></tr>
          <tr><th>返品・交換</th><td>オーダーメイド商品のため、製作開始後のキャンセル・返品・交換は原則不可。当店ミス・商品不良の場合は到着後1週間以内にご連絡ください。</td></tr>
        </table>
      </div>
    </div>
  </section>
  `
  return c.html(wrapPage(
    headMeta('特定商取引法に基づく表記', '〜NOFY〜の特定商取引法に基づく表記', '/legal'),
    header(),
    body,
    footer()
  ))
})

export default app
