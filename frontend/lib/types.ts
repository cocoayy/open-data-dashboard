export type DashboardDataPoint = {
  yearMonth: string;
  gasSales: number;
  avgTemperature: number;
};

export type CsvRawRow = {
  [key: string]: string | number | null | undefined;
};