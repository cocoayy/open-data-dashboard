export type DashboardDataPoint = {
  yearMonth: string;
  gasSales: number;
  avgTemperature: number;
};

export type DashboardFilterValue = {
  startMonth: string;
  endMonth: string;
};