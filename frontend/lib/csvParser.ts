import Papa from "papaparse";
import {
  CsvColumnMapping,
  CsvRawRow,
  DashboardDataPoint,
  ParsedCsvPreview,
} from "@/lib/types";

function normalizeValue(value: string | number | null | undefined): string {
  return String(value ?? "").trim();
}

export function parseCsvPreview(file: File): Promise<ParsedCsvPreview> {
  return new Promise((resolve) => {
    Papa.parse<CsvRawRow>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const headers = results.meta.fields ?? [];
        const errors = results.errors.map(
          (error) => `${error.code}: ${error.message}`
        );

        resolve({
          headers,
          rows: results.data,
          errors,
        });
      },
      error: (error) => {
        resolve({
          headers: [],
          rows: [],
          errors: [error.message],
        });
      },
    });
  });
}

export function convertRowsToDashboardData(
  rows: CsvRawRow[],
  mapping: CsvColumnMapping
): DashboardDataPoint[] {
  return rows
    .map((row) => {
      const yearMonth = normalizeValue(row[mapping.yearMonthColumn]);
      const gasSales = Number(row[mapping.gasSalesColumn]);
      const avgTemperature = Number(row[mapping.avgTemperatureColumn]);

      if (!yearMonth) return null;
      if (Number.isNaN(gasSales)) return null;
      if (Number.isNaN(avgTemperature)) return null;

      return {
        yearMonth,
        gasSales,
        avgTemperature,
      };
    })
    .filter((row): row is DashboardDataPoint => row !== null);
}