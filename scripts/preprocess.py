# データの前処理スクリプト
# 列名を統一する
# 年月を統一する
# 必要な列だけ残す
# 数値型に変換する
# 2つのデータを年月で結合する
# 欠損行を確認する
# processed_dashboard.csv として保存する


from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = BASE_DIR / "data" / "raw"
PROCESSED_DIR = BASE_DIR / "data" / "processed"

PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


def load_gas_data() -> pd.DataFrame:
    file_path = RAW_DIR / "gas_sales.csv"
    df = pd.read_csv(file_path)

    # 例: 列名を統一
    df = df.rename(columns={
        "year_month": "year_month",
        "sales": "gas_sales"
    })

    return df


def load_temperature_data() -> pd.DataFrame:
    file_path = RAW_DIR / "temperature.csv"
    df = pd.read_csv(file_path)

    df = df.rename(columns={
        "year_month": "year_month",
        "temperature": "avg_temperature"
    })

    return df


def preprocess() -> pd.DataFrame:
    gas_df = load_gas_data()
    temp_df = load_temperature_data()

    # 必要列だけに絞る
    gas_df = gas_df[["year_month", "gas_sales"]].copy()
    temp_df = temp_df[["year_month", "avg_temperature"]].copy()

    # 型変換
    gas_df["gas_sales"] = pd.to_numeric(gas_df["gas_sales"], errors="coerce")
    temp_df["avg_temperature"] = pd.to_numeric(temp_df["avg_temperature"], errors="coerce")

    # 結合
    merged_df = pd.merge(gas_df, temp_df, on="year_month", how="inner")

    # 欠損値削除
    merged_df = merged_df.dropna().reset_index(drop=True)

    return merged_df


def save_data(df: pd.DataFrame) -> None:
    output_path = PROCESSED_DIR / "processed_dashboard.csv"
    df.to_csv(output_path, index=False)
    print(f"Saved: {output_path}")


if __name__ == "__main__":
    df = preprocess()
    print(df.head())
    print(df.info())
    save_data(df)