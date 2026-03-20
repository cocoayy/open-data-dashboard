# Open Data Dashboard

オープンデータを活用し、需要傾向の可視化・比較・相関分析を行うデータ分析ダッシュボードです。

## 目的
データの前処理から可視化、分析までを一貫して行い、意思決定を支援することを目的としています。

## 想定ユーザー
- データ活用を推進したい企業の現場部門
- エネルギー需要や販売傾向を分析したい担当者
- オープンデータ分析を行いたい学生・初学者

## MVP
- データ読み込み
- フィルタ機能
- 時系列可視化
- 地域別比較
- 相関分析


## フロントエンド起動方法

```bash
cd frontend
npm install
npm run dev


---

# 12. このブランチでの理想状態

```text
open-data-dashboard/
├─ frontend/
│  ├─ package.json
│  └─ src/
│     ├─ app/
│     │  └─ page.tsx
│     ├─ components/
│     │  └─ dashboard/
│     │     ├─ KpiCard.tsx
│     │     ├─ TimeSeriesChart.tsx
│     │     └─ BarComparisonChart.tsx
│     └─ data/
│        └─ mockData.ts
├─ data/
├─ docs/
├─ notebooks/
└─ scripts/