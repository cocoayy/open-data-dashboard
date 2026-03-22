import Papa from "papaparse";
import { CsvRawRow, DashboardDataPoint } from "@/lib/types";

type ParseCsvResult = {
  data: DashboardDataPoint[];
  errors: string[];
};

function normalizeRow(row: CsvRawRow): DashboardDataPoint | null {
  const yearMonth = String(row.yearMonth ?? "").trim();
  const gasSales = Number(row.gasSales);
  const avgTemperature = Number(row.avgTemperature);

  if (!yearMonth) return null;
  if (Number.isNaN(gasSales)) return null;
  if (Number.isNaN(avgTemperature)) return null;

  return {
    yearMonth,
    gasSales,
    avgTemperature,
  };
}

export function parseCsvFile(file: File): Promise<ParseCsvResult> {
  return new Promise((resolve) => {
    Papa.parse<CsvRawRow>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const normalized = results.data
          .map(normalizeRow)
          .filter((row): row is DashboardDataPoint => row !== null);

        const errors = results.errors.map(
          (error) => `${error.code}: ${error.message}`
        );

        resolve({
          data: normalized,
          errors,
        });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [error.message],
        });
      },
    });
  });
}