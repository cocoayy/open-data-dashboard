import { DashboardDataPoint } from "@/lib/types";

export function calculateCorrelation(data: DashboardDataPoint[]): number {
  const n = data.length;
  if (n === 0) return 0;

  const x = data.map((d) => d.avgTemperature);
  const y = data.map((d) => d.gasSales);

  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.reduce((sum, xi, i) => {
    return sum + (xi - avgX) * (y[i] - avgY);
  }, 0);

  const denominatorX = Math.sqrt(
    x.reduce((sum, xi) => sum + (xi - avgX) ** 2, 0)
  );

  const denominatorY = Math.sqrt(
    y.reduce((sum, yi) => sum + (yi - avgY) ** 2, 0)
  );

  const denominator = denominatorX * denominatorY;

  if (denominator === 0) return 0;

  return numerator / denominator;
}