"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataPoint = {
  yearMonth: string;
  gasSales: number;
  avgTemperature: number;
};

type TimeSeriesChartProps = {
  data: DataPoint[];
};

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        月別推移
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearMonth" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="gasSales" name="ガス販売量" stroke="#2563eb" />
            <Line yAxisId="right" type="monotone" dataKey="avgTemperature" name="平均気温" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}