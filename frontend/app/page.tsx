"use client";

import { useMemo, useState } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart";
import BarComparisonChart from "@/components/dashboard/BarComparisonChart";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import { dashboardData } from "@/data/dashboardData";
import CorrelationChart from "@/components/dashboard/CorrelationChart";
import CorrelationSummary from "@/components/dashboard/CorrelationSummary";
import { calculateCorrelation } from "@/lib/calcCorrelation";

function calcAverageSales(data: typeof dashboardData) {
  if (data.length === 0) return "0";
  const total = data.reduce((sum, item) => sum + item.gasSales, 0);
  return (total / data.length).toFixed(1);
}

function calcMaxSales(data: typeof dashboardData) {
  if (data.length === 0) return 0;
  return Math.max(...data.map((item) => item.gasSales));
}

function calcMinTemperature(data: typeof dashboardData) {
  if (data.length === 0) return 0;
  return Math.min(...data.map((item) => item.avgTemperature));
}

export default function Home() {
  const months = dashboardData.map((item) => item.yearMonth);

  const [startMonth, setStartMonth] = useState(months[0]);
  const [endMonth, setEndMonth] = useState(months[months.length - 1]);

  const filteredData = useMemo(() => {
    const startIndex = months.indexOf(startMonth);
    const endIndex = months.indexOf(endMonth);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return [];
    }

    return dashboardData.filter((item) => {
      const currentIndex = months.indexOf(item.yearMonth);
      return currentIndex >= startIndex && currentIndex <= endIndex;
    });
  }, [startMonth, endMonth, months]);

  const correlation = calculateCorrelation(filteredData);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {filteredData.length === 0 && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            開始年月と終了年月の指定を見直してください。
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Open Data Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            オープンデータを活用し、需要傾向の可視化・比較・分析を行うダッシュボード
          </p>
        </header>

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