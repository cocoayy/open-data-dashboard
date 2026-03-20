"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  yearMonth: string;
  gasSales: number;
};

type BarComparisonChartProps = {
  data: DataPoint[];
};

export default function BarComparisonChart({ data }: BarComparisonChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        月別販売量比較
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearMonth" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="gasSales" name="ガス販売量" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}