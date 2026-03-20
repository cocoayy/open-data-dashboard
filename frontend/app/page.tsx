import KpiCard from "@/components/dashboard/KpiCard";
import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart";
import BarComparisonChart from "@/components/dashboard/BarComparisonChart";
import { mockData } from "@/data/mockData";

function calcAverageSales() {
  const total = mockData.reduce((sum, item) => sum + item.gasSales, 0);
  return (total / mockData.length).toFixed(1);
}

function calcMaxSales() {
  return Math.max(...mockData.map((item) => item.gasSales));
}

function calcMinTemperature() {
  return Math.min(...mockData.map((item) => item.avgTemperature));
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Open Data Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            オープンデータを活用し、需要傾向の可視化・比較・分析を行うダッシュボード
          </p>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <KpiCard
            title="平均販売量"
            value={calcAverageSales()}
            description="全期間の平均ガス販売量"
          />
          <KpiCard
            title="最大販売量"
            value={calcMaxSales()}
            description="期間内で最も高い月別販売量"
          />
          <KpiCard
            title="最低平均気温"
            value={calcMinTemperature()}
            description="期間内で最も低い平均気温"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TimeSeriesChart data={mockData} />
          <BarComparisonChart data={mockData} />
        </section>
      </div>
    </main>
  );
}