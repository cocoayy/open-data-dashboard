"use client";

import { useMemo, useState } from "react";
import CsvUpload from "@/components/dashboard/CsvUpload";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import KpiCard from "@/components/dashboard/KpiCard";
import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart";
import BarComparisonChart from "@/components/dashboard/BarComparisonChart";
import CorrelationChart from "@/components/dashboard/CorrelationChart";
import CorrelationSummary from "@/components/dashboard/CorrelationSummary";
import { dashboardData as initialData } from "@/data/dashboardData";
import { calculateCorrelation } from "@/lib/calcCorrelation";
import { parseCsvFile } from "@/lib/csvParser";
import { DashboardDataPoint } from "@/lib/types";

function calcAverageSales(data: DashboardDataPoint[]) {
  if (data.length === 0) return "0";
  const total = data.reduce((sum, item) => sum + item.gasSales, 0);
  return (total / data.length).toFixed(1);
}

function calcMaxSales(data: DashboardDataPoint[]) {
  if (data.length === 0) return 0;
  return Math.max(...data.map((item) => item.gasSales));
}

function calcMinTemperature(data: DashboardDataPoint[]) {
  if (data.length === 0) return 0;
  return Math.min(...data.map((item) => item.avgTemperature));
}

export default function Home() {
  const [data, setData] = useState<DashboardDataPoint[]>(initialData);
  const [errorMessage, setErrorMessage] = useState("");

  const months = data.map((item) => item.yearMonth);
  const [startMonth, setStartMonth] = useState(months[0] ?? "");
  const [endMonth, setEndMonth] = useState(months[months.length - 1] ?? "");

  const filteredData = useMemo(() => {
    const startIndex = months.indexOf(startMonth);
    const endIndex = months.indexOf(endMonth);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return [];
    }

    return data.filter((item) => {
      const currentIndex = months.indexOf(item.yearMonth);
      return currentIndex >= startIndex && currentIndex <= endIndex;
    });
  }, [data, startMonth, endMonth, months]);

  const correlation = calculateCorrelation(filteredData);

  const handleFileSelect = async (file: File) => {
    const result = await parseCsvFile(file);

    if (result.errors.length > 0) {
      setErrorMessage(result.errors[0]);
    } else {
      setErrorMessage("");
    }

    if (result.data.length === 0) {
      setErrorMessage("有効なデータを読み込めませんでした。列名を確認してください。");
      return;
    }

    const sorted = [...result.data].sort((a, b) =>
      a.yearMonth.localeCompare(b.yearMonth)
    );

    setData(sorted);
    setStartMonth(sorted[0]?.yearMonth ?? "");
    setEndMonth(sorted[sorted.length - 1]?.yearMonth ?? "");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Open Data Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            CSVをアップロードして需要傾向の可視化・比較・相関分析を行うダッシュボード
          </p>
        </header>

        <section className="mb-8">
          <CsvUpload
            onFileSelect={handleFileSelect}
            errorMessage={errorMessage}
          />
        </section>

        <section className="mb-8">
          <DashboardFilter
            months={months}
            startMonth={startMonth}
            endMonth={endMonth}
            onChangeStartMonth={setStartMonth}
            onChangeEndMonth={setEndMonth}
          />
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <KpiCard
            title="平均販売量"
            value={calcAverageSales(filteredData)}
            description="選択期間における平均ガス販売量"
          />
          <KpiCard
            title="最大販売量"
            value={calcMaxSales(filteredData)}
            description="選択期間における最大月別販売量"
          />
          <KpiCard
            title="最低平均気温"
            value={calcMinTemperature(filteredData)}
            description="選択期間における最低平均気温"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TimeSeriesChart data={filteredData} />
          <BarComparisonChart data={filteredData} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <CorrelationChart data={filteredData} />
          <CorrelationSummary correlation={correlation} />
        </section>
      </div>
    </main>
  );
}