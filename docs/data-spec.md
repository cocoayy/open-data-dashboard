# データ仕様

## 入力データ
### gas_sales.csv
- year_month: 年月
- sales: ガス販売量

### temperature.csv
- year_month: 年月
- temperature: 平均気温

## 出力データ
### processed_dashboard.csv
- year_month
- gas_sales
- avg_temperature

## 前処理内容
- 列名の統一
- 型変換
- 年月での結合
- 欠損値除去