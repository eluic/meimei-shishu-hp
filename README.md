# 〜NOFY〜 命名刺繍ブランド 公式ホームページ

## プロジェクト概要
- **ブランド名**: 〜NOFY〜（ノーフィ）
- **ブランド名の由来**: マダガスカル語で【夢】を意味する
- **所在地**: 沖縄市泡瀬2-45-12
- **コンセプト**: 沖縄の伝統紅型や着物帯を使用した、世界にひとつだけの命名刺繍
- **技術スタック**: Hono + TypeScript + Cloudflare Pages
- **参考サイト**: https://iitoki.base.shop/ （いいとき刺繍）
- **デザインコンセプト**: 詩的で余白を大切にした上品なレイアウト × NOFYブランドカラーの積極活用

## URLs
- **プレビュー**: https://3000-ioyd4qapw3z0zmziaxc75-2e77fc33.sandbox.novita.ai/

## デザイン方針（v2 リニューアル）

### 参考サイトから取り入れた要素
- 詩的なブランドメッセージセクション（中央寄せ + 装飾ディバイダー）
- 「\ おすすめ /」「\ NEW /」吹き出し風ラベル付きピックアップ
- 4枚コンセプトギャラリー + 詩的キャプション
- Instagram フィード埋め込みセクション
- 装飾的な区切り線（◇ディバイダー、細い罫線）
- 呼吸感のあるレイアウト（セクション間120px+余白）

### ブランドカラー活用
| 適用箇所 | カラー |
|---------|--------|
| ヘッダー上部ライン | 赤→金→青 グラデーション |
| 見出し（H1-H3） | プライマリダーク #8c1e16 |
| ボタン（プライマリ） | 赤 #b82e24 背景 |
| ボタン（セカンダリ） | 赤 アウトライン |
| 価格表示 | アクセント青 #2d5aa0 |
| リンク・引用 | 赤 #b82e24 |
| フッター背景 | プライマリダーク #8c1e16 |
| フォーカス枠 | アクセント青 #2d5aa0 |
| パンくず現在地 | 赤 #b82e24 |
| アイコン・装飾線 | 赤 #b82e24 |

## 実装済みページ

| ページ | パス | 説明 |
|--------|------|------|
| トップページ | `/` | Hero → ブランドメッセージ → おすすめPickup → NEW Pickup → コンセプトギャラリー → 商品 → Instagram → 料金 → お客様の声 → CTA |
| ブランドストーリー | `/about` | ブランド誕生の経緯、こだわり、制作の様子 |
| 商品一覧 | `/products` | 全10商品のグリッド表示、フィルター（紅型/桜） |
| 商品詳細 | `/products/:id` | 写真ギャラリー、プラン選択、帯・生地選択UI、料金計算 |
| オーダーの流れ | `/order-flow` | 5ステップ形式、注意事項 |
| 制作実績 | `/gallery` | Masonryレイアウト、ライトボックス、フィルター |
| よくある質問 | `/faq` | アコーディオン形式、8項目 |
| お問い合わせ | `/contact` | 注文フォーム（プラン・赤ちゃん情報対応）、Instagram DM案内 |
| プライバシーポリシー | `/privacy` | 個人情報の取り扱い |
| 特定商取引法 | `/legal` | 特定商取引法に基づく表記 |

## カラーパレット（ロゴから抽出）

```css
:root {
  --color-primary: #b82e24;      /* 赤（メイン）— 見出し・ボタン・フッター背景に多用 */
  --color-primary-dark: #8c1e16; /* 赤ダーク — フッター背景、見出しテキスト */
  --color-accent: #2d5aa0;       /* 青（アクセント）— 価格・リンク・フォーカス */
  --color-gold: #c9a040;         /* 金色 — 英字ラベル・装飾 */
  --color-teal: #4a9688;         /* ティール */
  --color-base: #faf7f2;         /* オフホワイト背景 */
  --color-text: #2a2a2a;         /* テキストカラー */
}
```

## 支給素材の配置

### ロゴ
| ファイル | パス | 用途 |
|---------|------|------|
| NOFYロゴ | `/public/static/images/logo/logo.png` | ヘッダー、フッター、ファビコン、OGP |

### 商品写真（支給済み・配置済み）
| ファイル名 | 元ファイル名 | パス |
|-----------|-------------|------|
| bingata-red.jpg | 紅型_赤.jpg | `/public/static/images/products/` |
| bingata-blue1.jpg | 紅型_水色①.jpg | `/public/static/images/products/` |
| bingata-blue2.jpg | 紅型_水色②.jpg | `/public/static/images/products/` |
| bingata-pink.jpg | 紅型_ピンク.jpg | `/public/static/images/products/` |
| bingata-black.jpg | 紅型_黒.jpg | `/public/static/images/products/` |
| bingata-style-white.jpg | 紅型風_白.jpg | `/public/static/images/products/` |
| sakura-navy.jpg | 桜_ネイビー.jpg | `/public/static/images/products/` |
| sakura-pink.jpg | 桜_ピンク.jpg | `/public/static/images/products/` |
| sakura-red.jpg | 桜_赤.jpg | `/public/static/images/products/` |
| sakura-white.jpg | 桜_白.jpg | `/public/static/images/products/` |

## プレースホルダー画像の差し替え手順

以下の画像はプレースホルダーで実装されています。実際の写真に差し替えてください。

| 差し替え対象 | 現在の表示 | 推奨サイズ | 差し替え方法 |
|------------|-----------|----------|-------------|
| 帯 01〜15 | `Obi 01〜15` テキスト | 600x600px (JPG/WebP) | `src/index.tsx` の商品詳細ページ内 fabric-selector の画像URLを差し替え |
| 背景生地（バラ） | `Bara` テキスト | 600x600px (JPG/WebP) | 同上 |
| 背景生地（龍） | `Ryu` テキスト | 600x600px (JPG/WebP) | 同上 |
| 制作風景 1〜4 | `Making Process` テキスト | 1200x800px (JPG/WebP) | `/about` ページの process-gallery セクション |
| お客様の声 写真 | `Customer Photo` テキスト | 400x400px (JPG/WebP) | トップページの voice-section |
| 商品サブ写真 | `Sub 1〜3` テキスト | 800x800px (JPG/WebP) | 商品詳細ページの product-thumbs |

### 差し替え手順
1. `src/index.tsx` を開く
2. `placehold.jp` のURLを検索
3. 実際の画像パスに置き換え（`/static/images/xxx/yyy.jpg`）
4. 画像ファイルを `public/static/images/` 配下に配置
5. `npm run build` でビルド

## 機能一覧

### 実装済み機能
- [x] レスポンシブデザイン（モバイルファースト）
- [x] ヒーロースライダー（自動/手動切替）
- [x] ハンバーガーメニュー（モバイル）
- [x] ブランドメッセージセクション（詩的テキスト + 装飾ディバイダー）
- [x] おすすめ/NEWピックアップセクション（大判写真 + ラベル）
- [x] コンセプトギャラリー（4枚写真 + 詩的キャプション）
- [x] Instagramフィードセクション
- [x] 商品フィルター（紅型/桜カテゴリ）
- [x] 商品詳細の写真ギャラリー
- [x] プラン選択UI（料金自動計算）
- [x] 帯・生地の画像選択UI
- [x] Masonryギャラリー + ライトボックス
- [x] FAQアコーディオン
- [x] お問い合わせフォーム（注文対応）
- [x] SEOメタタグ・OGP・構造化データ（JSON-LD）
- [x] パンくずリスト（schema.org準拠）
- [x] スクロールアニメーション
- [x] 料金プラン表示
- [x] プライバシーポリシー・特定商取引法ページ

### WordPress移行時の対応事項
本サイトはCloudflare Pages上の静的サイトとして構築されています。
WordPress + WooCommerceへの移行時には以下の対応が必要です：

- テーマファイル（PHP）への変換
- WooCommerce商品登録
- カスタム投稿タイプ（works, voice, news）の登録
- Contact Form 7 等プラグインの設定
- Instagram Feed プラグインの設定

## 開発コマンド

```bash
# ビルド
npm run build

# ローカルプレビュー
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# デプロイ
npm run build && npx wrangler pages deploy dist
```

## ディレクトリ構造

```
webapp/
├── src/
│   └── index.tsx           # メインアプリケーション（全ページルーティング）
├── public/
│   └── static/
│       ├── css/
│       │   └── style.css   # メインスタイルシート
│       ├── js/
│       │   └── main.js     # クライアントサイドJavaScript
│       └── images/
│           ├── logo/       # NOFYロゴ（支給）
│           ├── products/   # 商品写真（支給）
│           ├── hero/       # ヒーロー画像（商品写真から選定）
│           ├── gallery/    # ギャラリー写真（商品写真から選定）
│           ├── fabrics/    # 帯・背景生地（差し替え予定）
│           └── placeholders/ # プレースホルダー画像格納
├── ecosystem.config.cjs    # PM2設定
├── wrangler.jsonc          # Cloudflare Pages設定
├── vite.config.ts          # ビルド設定
├── package.json
└── README.md
```
