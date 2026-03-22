"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  gasSales: number;
  avgTemperature: number;
};

type Props = {
  data: DataPoint[];
};

export default function CorrelationChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        気温とガス販売量の関係（相関）
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="avgTemperature"
              name="平均気温"
            />
            <YAxis
              type="number"
              dataKey="gasSales"
              name="ガス販売量"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#2563eb" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}