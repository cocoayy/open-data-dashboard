export type DashboardDataPoint = {
  yearMonth: string;
  gasSales: number;
  avgTemperature: number;
};

export type CsvRawRow = {
  [key: string]: string | number | null | undefined;
};

export type CsvColumnMapping = {
  yearMonthColumn: string;
  gasSalesColumn: string;
  avgTemperatureColumn: string;
};

export type ParsedCsvPreview = {
  headers: string[];
  rows: CsvRawRow[];
  errors: string[];
};