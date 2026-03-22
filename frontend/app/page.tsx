"use client";

import { useMemo, useState } from "react";
import CsvUpload from "@/components/dashboard/CsvUpload";
import ColumnMappingForm from "@/components/dashboard/ColumnMappingForm";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import KpiCard from "@/components/dashboard/KpiCard";
import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart";
import BarComparisonChart from "@/components/dashboard/BarComparisonChart";
import CorrelationChart from "@/components/dashboard/CorrelationChart";
import CorrelationSummary from "@/components/dashboard/CorrelationSummary";
import { dashboardData as initialData } from "@/data/dashboardData";
import { calculateCorrelation } from "@/lib/calcCorrelation";
import {
  convertRowsToDashboardData,
  parseCsvPreview,
} from "@/lib/csvParser";
import {
  CsvColumnMapping,
  CsvRawRow,
  DashboardDataPoint,
} from "@/lib/types";
import CsvPreviewTable from "@/components/dashboard/CsvPreviewTable";

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

function guessColumn(headers: string[], candidates: string[]) {
  const normalizedHeaders = headers.map((header) => header.trim().toLowerCase());

  for (const candidate of candidates) {
    const index = normalizedHeaders.findIndex((header) =>
      header.includes(candidate.toLowerCase())
    );
    if (index !== -1) {
      return headers[index];
    }
  }

  return "";
}

export default function Home() {
  const [data, setData] = useState<DashboardDataPoint[]>(initialData);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<CsvRawRow[]>([]);
  const [mapping, setMapping] = useState<CsvColumnMapping>({
    yearMonthColumn: "",
    gasSalesColumn: "",
    avgTemperatureColumn: "",
  });

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
    const result = await parseCsvPreview(file);

    if (result.errors.length > 0) {
      setErrorMessage(result.errors[0]);
    } else {
      setErrorMessage("");
    }

    setPreviewHeaders(result.headers);
    setPreviewRows(result.rows);

    setMapping({
      yearMonthColumn: guessColumn(result.headers, ["yearmonth", "年月", "month", "date"]),
      gasSalesColumn: guessColumn(result.headers, ["gassales", "販売量", "sales", "volume"]),
      avgTemperatureColumn: guessColumn(result.headers, ["avgtemperature", "平均気温", "temperature", "temp"]),
    });
  };

  const handleApplyMapping = () => {
    if (
      !mapping.yearMonthColumn ||
      !mapping.gasSalesColumn ||
      !mapping.avgTemperatureColumn
    ) {
      setErrorMessage("年月列・販売量列・平均気温列をすべて選択してください。");
      return;
    }

    const converted = convertRowsToDashboardData(previewRows, mapping);

    if (converted.length === 0) {
      setErrorMessage("有効なデータを作成できませんでした。列の選択や値を確認してください。");
      return;
    }

    const sorted = [...converted].sort((a, b) =>
      a.yearMonth.localeCompare(b.yearMonth)
    );

    setData(sorted);
    setStartMonth(sorted[0]?.yearMonth ?? "");
    setEndMonth(sorted[sorted.length - 1]?.yearMonth ?? "");
    setErrorMessage("");
  };

  const canApplyMapping =
    !!mapping.yearMonthColumn &&
    !!mapping.gasSalesColumn &&
    !!mapping.avgTemperatureColumn;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Open Data Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            CSVをアップロードし、列を指定して需要傾向の可視化・比較・相関分析を行うダッシュボード
          </p>
        </header>

        <section className="mb-8">
          <CsvUpload
            onFileSelect={handleFileSelect}
            errorMessage={errorMessage}
          />
        </section>

        {previewHeaders.length > 0 && previewRows.length > 0 && (
          <section className="mb-8">
            <CsvPreviewTable headers={previewHeaders} rows={previewRows} />
          </section>
        )}

        {previewHeaders.length > 0 && (
          <section className="mb-8">
            <ColumnMappingForm
              headers={previewHeaders}
              mapping={mapping}
              onChange={setMapping}
              onApply={handleApplyMapping}
              disabled={!canApplyMapping}
            />
          </section>
        )}

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